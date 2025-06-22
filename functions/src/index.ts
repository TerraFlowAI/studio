/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {setGlobalOptions} from "firebase-functions/v2";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import {onDocumentUpdated} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import {initializeApp, getApps} from "firebase-admin/app";
import {getFirestore, Timestamp} from "firebase-admin/firestore";

// Initialize Firebase Admin SDK if not already done.
if (getApps().length === 0) {
  initializeApp();
}
const db = getFirestore();


// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

/**
 * Calculates and returns key performance indicators (KPIs) for the user's dashboard.
 * This function is callable by authenticated users only.
 */
export const getDashboardKPIs = onCall(async (request) => {
  // 1. Authentication Check: Ensure the user is logged in.
  if (!request.auth) {
    logger.warn("Unauthenticated user tried to call getDashboardKPIs.");
    throw new HttpsError(
        "unauthenticated",
        "The function must be called while authenticated.",
    );
  }
  const {uid} = request.auth;
  logger.info(`Fetching KPIs for user: ${uid}`);

  try {
    // 2. Data Fetching and Computations
    const leadsRef = db.collection("leads");
    const propertiesRef = db.collection("properties");

    // Active Leads: Count leads with status "New", "Contacted", or "Qualified".
    const activeLeadsQuery = leadsRef
        .where("ownerId", "==", uid)
        .where("status", "in", ["New", "Contacted", "Qualified"]);
    const activeLeadsPromise = activeLeadsQuery.count().get();

    // Properties Sold: Count properties with status "Sold".
    const soldPropertiesQuery = propertiesRef
        .where("ownerId", "==", uid)
        .where("status", "==", "Sold");
    const propertiesSoldPromise = soldPropertiesQuery.count().get();

    // Total Revenue: Sum the 'expectedPrice' of sold properties.
    const revenueAggregationQuery = soldPropertiesQuery.aggregate({
      totalRevenue: getFirestore().collection("properties").aggregate.sum("expectedPrice"),
    });
    const revenuePromise = revenueAggregationQuery.get();

    // Execute all queries in parallel for efficiency.
    const [
      activeLeadsSnapshot,
      propertiesSoldSnapshot,
      revenueSnapshot,
    ] = await Promise.all([
      activeLeadsPromise,
      propertiesSoldPromise,
      revenuePromise,
    ]);

    const activeLeads = activeLeadsSnapshot.data().count;
    const propertiesSold = propertiesSoldSnapshot.data().count;
    const totalRevenue = revenueSnapshot.data().totalRevenue || 0;
    const avgDealTime = 32; // Static placeholder value.

    // 3. Return Value: Construct the final JSON object.
    const kpiData = {
      activeLeads,
      propertiesSold,
      totalRevenue,
      avgDealTime,
    };

    logger.info("Successfully fetched KPIs for user.", {uid, kpiData});
    return kpiData;
  } catch (error) {
    logger.error("Error fetching dashboard KPIs for user:", {uid, error});
    // Throw a generic error to the client.
    throw new HttpsError(
        "internal",
        "An error occurred while fetching dashboard data.",
        error,
    );
  }
});


/**
 * Calculates and returns sales statistics for the last 6 months for a chart.
 * This function is callable by authenticated users only.
 */
export const getSalesStatsChart = onCall(async (request) => {
  // 1. Authentication Check
  if (!request.auth) {
    logger.warn("Unauthenticated user tried to call getSalesStatsChart.");
    throw new HttpsError(
        "unauthenticated",
        "The function must be called while authenticated.",
    );
  }
  const {uid} = request.auth;
  logger.info(`Fetching sales stats for user: ${uid}`);

  try {
    // 2. Data Fetching
    const propertiesRef = db.collection("properties");
    const soldPropertiesQuery = propertiesRef
        .where("ownerId", "==", uid)
        .where("status", "==", "Sold");

    const snapshot = await soldPropertiesQuery.get();

    // 3. Data Processing
    const salesByMonth: {[key: string]: number} = {};

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    snapshot.forEach((doc) => {
      const data = doc.data();
      // Assume soldAt field exists and is a Firestore Timestamp
      if (data.soldAt && data.soldAt instanceof Timestamp) {
        const soldDate = data.soldAt.toDate();

        if (soldDate >= sixMonthsAgo) {
          const monthKey = `${soldDate.getFullYear()}-${(soldDate.getMonth() + 1).toString().padStart(2, "0")}`;
          const price = data.expectedPrice || 0;
          salesByMonth[monthKey] = (salesByMonth[monthKey] || 0) + price;
        }
      }
    });

    // 4. Formatting for Chart
    const labels: string[] = [];
    const data: number[] = [];
    const today = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      const monthLabel = date.toLocaleString("default", {month: "short"});

      labels.push(monthLabel);
      data.push(salesByMonth[monthKey] || 0);
    }

    const chartData = {labels, data};
    logger.info("Successfully fetched sales stats for user.", {uid, chartData});
    return chartData;
  } catch (error) {
    logger.error("Error fetching sales stats for user:", {uid, error});
    throw new HttpsError(
        "internal",
        "An error occurred while fetching sales chart data.",
        error,
    );
  }
});


/**
 * Creates a notification when a document's verification status is updated.
 */
export const onDocumentVerificationComplete = onDocumentUpdated("documents/{docId}", async (event) => {
  // 1. Log the function execution.
  logger.info(`Document update triggered for: ${event.params.docId}`, {params: event.params});

  const before = event.data?.before.data();
  const after = event.data?.after.data();

  // 2. Ensure data exists before and after the update.
  if (!before || !after) {
      logger.warn("Document data is missing before or after update.", {docId: event.params.docId});
      return;
  }

  const oldStatus = before.verificationStatus;
  const newStatus = after.verificationStatus;
  
  // 3. Check if the verificationStatus has changed to a "complete" state.
  if (oldStatus !== newStatus && (newStatus === "Verified" || newStatus === "Issues Found")) {
      logger.info(`Verification status changed for docId: ${event.params.docId}. New status: ${newStatus}`);

      const ownerId = after.ownerId;
      const docName = after.name || "Untitled Document";
      const docId = event.params.docId;

      if (!ownerId) {
          logger.error(`Document ${docId} is missing ownerId. Cannot create notification.`);
          return;
      }

      // 4. Construct the notification object.
      const notification = {
          userId: ownerId,
          message: `Verification for document '${docName}' is complete. Status: ${newStatus}.`,
          createdAt: Timestamp.now(),
          isRead: false,
          actionLink: `/documents/${docId}`,
      };
      
      try {
          // 5. Create a new document in the "notifications" collection.
          const notificationRef = await db.collection("notifications").add(notification);
          logger.info(`Successfully created notification ${notificationRef.id} for user ${ownerId}.`);
      } catch (error) {
          logger.error(`Failed to create notification for user ${ownerId}.`, {error, notificationData: notification});
      }
  } else {
      // Log that no action was taken if the status didn't meet the criteria.
      logger.info(`No relevant status change for docId: ${event.params.docId}. Old: ${oldStatus}, New: ${newStatus}. No notification created.`);
  }
});
