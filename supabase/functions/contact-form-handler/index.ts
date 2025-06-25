// /supabase/functions/contact-form-handler/index.ts

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
// FIX: Using the correct URL-based import for Deno
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// This function will be triggered by a POST request from the landing page form.
serve(async (req) => {
  // 1. Handle CORS Preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 
      'Access-Control-Allow-Origin': '*', // Or your specific website domain
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    } })
  }

  try {
    // 2. Create a Supabase admin client to securely insert data
    const supabaseAdmin = createClient(
      // These are Environment Variables that must be set in your Supabase project's Function settings
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 3. Get the data from the request body
    const { firstName, lastName, email, companyName, companySize, message } = await req.json()

    // 4. Validate the incoming data (basic validation)
    if (!email || !firstName || !lastName) {
      return new Response(JSON.stringify({ error: 'Missing required fields: firstName, lastName, and email.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 5. Insert the data into the 'WebsiteLeads' table
    const { data, error } = await supabaseAdmin
      .from('WebsiteLeads')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        company_name: companyName,
        company_size: companySize,
        message: message,
        status: 'New' // Set the initial status
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    // 6. Return a success response
    return new Response(JSON.stringify({ success: true, leadId: data.id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    // 7. Return an error response
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})