// supabase/functions/contact-form-handler/index.ts

import { createClient } from '@supabase/supabase-js'

// CORS headers to allow requests from your website.
// It's recommended to replace '*' with your actual website domain for production.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Define the expected shape of the incoming data from the contact form
interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  companySize?: string;
  message?: string;
}

console.log(`Function "contact-form-handler" is ready to receive requests.`);

Deno.serve(async (req) => {
  // This is needed to handle CORS preflight requests.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the service_role key to bypass RLS
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse the request body as JSON
    const leadData: Lead = await req.json();

    // Basic validation: ensure the email field is present.
    if (!leadData.email) {
        return new Response(JSON.stringify({ error: 'Email is a required field.' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400, // Bad Request
        });
    }

    // Insert the validated data into the 'WebsiteLeads' table.
    // Note: Supabase column names are snake_case.
    const { data, error } = await supabaseClient
      .from('WebsiteLeads')
      .insert({
        first_name: leadData.firstName,
        last_name: leadData.lastName,
        email: leadData.email,
        company_name: leadData.companyName,
        company_size: leadData.companySize,
        message: leadData.message,
      })
      .select()
      .single(); // Use .single() to get the inserted row back.

    // Handle any potential database errors during insertion.
    if (error) {
      console.error('Supabase Database Error:', error.message);
      throw new Error(error.message); // This will be caught by the outer catch block.
    }
    
    // Return a success response with the inserted data.
    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200, // OK
    })
  } catch (err) {
    // Return a generic error response if anything goes wrong.
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500, // Internal Server Error
    })
  }
})
