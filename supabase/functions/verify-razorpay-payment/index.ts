import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      booking_id 
    } = await req.json();

    // Verify signature
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');
    if (!razorpayKeySecret) {
      throw new Error('Razorpay secret not configured');
    }

    const crypto = await import('https://deno.land/std@0.177.0/crypto/mod.ts');
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    
    const encoder = new TextEncoder();
    const keyData = encoder.encode(razorpayKeySecret);
    const messageData = encoder.encode(text);
    
    const key = await crypto.crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.crypto.subtle.sign(
      'HMAC',
      key,
      messageData
    );
    
    const generatedSignature = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const isValid = generatedSignature === razorpay_signature;

    if (isValid && booking_id) {
      // Update booking payment status
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      await supabase
        .from('bookings')
        .update({
          payment_status: 'paid',
          razorpay_payment_id,
          razorpay_order_id,
          status: 'confirmed'
        })
        .eq('id', booking_id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        verified: isValid 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error verifying payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
