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
import * as logger from "firebase-functions/logger";
import {initializeApp, getApps} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

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

    // Active Leads: Count leads with status "New" or "Contacted".
    const activeLeadsQuery = leadsRef
        .where("ownerId", "==", uid)
        .where("status", "in", ["New", "Contacted"]);
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
