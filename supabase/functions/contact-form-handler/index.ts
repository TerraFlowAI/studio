/// <reference types="https://esm.sh/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />

// /supabase/functions/contact-form-handler/index.ts

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// --- Define CORS Headers ---
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { firstName, lastName, email, companyName, companySize, message } = await req.json();

    if (!email || !firstName || !lastName) {
      throw new Error("Missing required fields: firstName, lastName, and email.");
    }

    const { data, error } = await supabaseAdmin
      .from("WebsiteLeads")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        company_name: companyName,
        company_size: companySize,
        message: message,
        status: "New",
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify({ success: true, leadId: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (e: unknown) {
    const error = e instanceof Error ? e : new Error("An unknown error occurred");
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
