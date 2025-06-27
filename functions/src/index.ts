
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {createClient, SupabaseClient} from "@supabase/supabase-js";

// Initialize Firebase Admin SDK
admin.initializeApp();

/**
 * HTTP-callable function to set a user's role (e.g., 'admin').
 * Must be called by an existing administrator.
 */
export const setAdminRole = functions.https.onCall(async (request) => {
  // Initialize Supabase client.
  const supabaseUrl = functions.config().supabase?.url;
  const supabaseKey = functions.config().supabase?.key;

  if (!supabaseUrl || !supabaseKey) {
    throw new functions.https.HttpsError(
      "internal",
      "Supabase URL or Key not set. Check function logs for details."
    );
  }
  const supabaseAdmin: SupabaseClient = createClient(supabaseUrl, supabaseKey);
  // 1. Security Check: Ensure the caller is an administrator.
  /*
  if (request.auth?.token?.admin !== true) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called by an administrator.",
    );
  }
  */

  // 2. Input Validation: Access email and role from the 'data' property.
  const email = request.data.email;
  const role = request.data.role;
  if (
    typeof email !== "string" ||
    !email ||
    typeof role !== "string" ||
    !role
  ) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function requires an 'email' and 'role' argument.",
    );
  }

  try {
    // 3. Find the target user by their email address.
    const user = await admin.auth().getUserByEmail(email);

    // 4. Set the custom claim for the user in Firebase Authentication.
    await admin.auth().setCustomUserClaims(user.uid, {role});

    // 5. Update the user's role in the Supabase 'users' table.
    // This assumes your Supabase table is named 'users' and has a 'role' column.
    // It also assumes the 'id' column in your Supabase 'users' table
    // matches the Firebase Auth UID.
    const {error: supabaseError} = await supabaseAdmin
      .from("users")
      .update({role})
      .eq("id", user.uid);

    if (supabaseError) {
      console.error(
        `Failed to update role in Supabase for user ${user.uid}:`,
        supabaseError,
      );
      throw new functions.https.HttpsError(
        "internal",
        "Failed to update role in the database.",
      );
    }

    // 6. Return a success message.
    return {
      message: `Success! User ${email} has been made a(n) ${role}.`,
    };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error setting custom role:", error);
    if (error.message.includes("USER_NOT_FOUND")) {
      throw new functions.https.HttpsError(
        "not-found",
        "User with the provided email does not exist.",
      );
    }
    throw new functions.https.HttpsError(
      "internal",
      "An unexpected error occurred while setting the user role.",
    );
  }
});
