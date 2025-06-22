// functions/src/index.ts

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
// FIX: Import AggregateField for type safety and clarity
import {getFirestore, Timestamp, AggregateField} from "firebase-admin/firestore";

// Initialize Firebase Admin SDK if not already done.
if (getApps().length === 0) {
  initializeApp();
}
const db = getFirestore();

// Set global options for function instances.
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

    const activeLeadsQuery = leadsRef
        .where("ownerId", "==", uid)
        .where("status", "in", ["New", "Contacted", "Qualified"]);
    const activeLeadsPromise = activeLeadsQuery.count().get();

    // This query will be used for both counting sold properties and aggregating revenue.
    const soldPropertiesQuery = propertiesRef
        .where("ownerId", "==", uid)
        .where("status", "==", "Sold");

    // FIX: Perform the aggregation directly on the filtered query object.
    const revenueAggregationPromise = soldPropertiesQuery.aggregate({
      totalRevenue: AggregateField.sum("expectedPrice"),
      // FIX: We can also get the count from the same aggregation for efficiency.
      propertiesSold: AggregateField.count(),
    }).get();


    // Execute all queries in parallel for efficiency.
    const [
      activeLeadsSnapshot,
      revenueSnapshot,
      // FIX: We no longer need a separate promise for counting sold properties.
    ] = await Promise.all([
      activeLeadsPromise,
      revenueAggregationPromise,
    ]);

    const activeLeads = activeLeadsSnapshot.data().count;
    // FIX: Get both revenue and count from the single aggregation snapshot.
    const propertiesSold = revenueSnapshot.data().propertiesSold || 0;
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
    
    // FIX: Also filter by date to fetch only relevant documents, improving performance.
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const soldPropertiesQuery = propertiesRef
        .where("ownerId", "==", uid)
        .where("status", "==", "Sold")
        .where("soldAt", ">=", Timestamp.fromDate(sixMonthsAgo)); // FIX: Query optimization

    const snapshot = await soldPropertiesQuery.get();

    // 3. Data Processing
    const salesByMonth: {[key: string]: number} = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      // FIX: Add a check to ensure price is a number before adding.
      if (data.soldAt && data.soldAt instanceof Timestamp && typeof data.expectedPrice === 'number') {
        const soldDate = data.soldAt.toDate();
        const monthKey = `${soldDate.getFullYear()}-${(soldDate.getMonth() + 1).toString().padStart(2, "0")}`;
        salesByMonth[monthKey] = (salesByMonth[monthKey] || 0) + data.expectedPrice;
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
  logger.info(`Document update triggered for: ${event.params.docId}`, {params: event.params});

  const beforeData = event.data?.before.data();
  const afterData = event.data?.after.data();

  if (!beforeData || !afterData) {
      logger.warn("Document data is missing before or after update.", {docId: event.params.docId});
      return;
  }

  const oldStatus = beforeData.verificationStatus;
  const newStatus = afterData.verificationStatus;
  
  if (oldStatus !== newStatus && (newStatus === "Verified" || newStatus === "Issues Found")) {
      logger.info(`Verification status changed for docId: ${event.params.docId}. New status: ${newStatus}`);

      const ownerId = afterData.ownerId;
      // FIX: Use a safer fallback for the document name.
      const docName = afterData.fileName || "an unnamed document";
      const docId = event.params.docId;

      if (!ownerId) {
          logger.error(`Document ${docId} is missing ownerId. Cannot create notification.`);
          return;
      }

      const notification = {
          userId: ownerId,
          message: `Verification for '${docName}' is complete. Status: ${newStatus}.`,
          createdAt: Timestamp.now(),
          isRead: false,
          actionLink: `/documents/${docId}`,
      };
      
      try {
          const notificationRef = await db.collection("notifications").add(notification);
          logger.info(`Successfully created notification ${notificationRef.id} for user ${ownerId}.`);
      } catch (error) {
          logger.error(`Failed to create notification for user ${ownerId}.`, {error, notificationData: notification});
      }
  } else {
      logger.info(`No relevant status change for docId: ${event.params.docId}. Old: ${oldStatus}, New: ${newStatus}. No notification created.`);
  }
});