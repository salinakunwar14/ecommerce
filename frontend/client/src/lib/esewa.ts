/**
 * esewa.ts — eSewa Payment Integration
 * 
 * This file handles the complete eSewa (Nepali digital wallet) payment flow.
 * 
 * eSewa is Nepal's most popular mobile wallet, used for:
 * - Online payments
 * - Mobile top-ups
 * - Bill payments
 * - Money transfers
 * 
 * How the integration works:
 * 1. User clicks "Pay with eSewa" on checkout page
 * 2. We generate a unique transaction ID and HMAC signature
 * 3. We create a hidden HTML form with payment details
 * 4. The form auto-submits, redirecting user to eSewa's payment page
 * 5. User enters their eSewa credentials
 * 6. eSewa processes payment and redirects back to our site
 * 7. We decode the response and show success/failure
 * 
 * Security Note:
 * - This uses SANDBOX (test) credentials - no real money is charged
 * - The HMAC signature prevents tampering with payment amounts
 * - All payment processing happens on eSewa's secure servers
 */

/**
 * ESEWA Configuration — Sandbox/Test Credentials
 * 
 * These are PUBLIC test credentials from eSewa's documentation.
 * For production, you would:
 * 1. Register as a merchant on eSewa
 * 2. Get your production credentials
 * 3. Replace these values (and update URLs)
 */
const ESEWA = {
  productCode: "EPAYTEST",  // Test product code (public, from eSewa docs)
  secretKey: "8gBm/:&EnhH.1/q",  // Secret key for signing (public test key)
  payUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",  // Sandbox payment URL
  statusUrl: "https://rc.esewa.com.np/api/epay/transaction/status/",  // Status check URL
};

/**
 * generateSignature — Create HMAC-SHA256 signature for payment verification
 * 
 * What is HMAC?
 * - Hash-based Message Authentication Code
 * - A way to verify that data hasn't been tampered with
 * - Uses a secret key to sign the message
 * 
 * What is SHA-256?
 * - A cryptographic hash function
 * - Produces a fixed 256-bit (32-byte) output
 * - One-way: you can't reverse the hash to get the original message
 * 
 * Why do we need this?
 * - eSewa uses the signature to verify the payment request is legitimate
 * - Prevents users from modifying the payment amount
 * - The signature is generated using our secret key
 * 
 * @param totalAmount - The total amount to pay (including tax)
 * @param transactionUuid - Unique transaction identifier
 * @param productCode - eSewa product code
 * @returns Base64-encoded signature string
 */
async function generateSignature(
  totalAmount: string,
  transactionUuid: string,
  productCode: string
): Promise<string> {
  // The message to sign (must match eSewa's expected format)
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;

  // TextEncoder converts strings to Uint8Array (binary data)
  const encoder = new TextEncoder();
  const keyData = encoder.encode(ESEWA.secretKey);  // Secret key as bytes
  const msgData = encoder.encode(message);            // Message as bytes

  // Web Crypto API - generate HMAC-SHA256 signature
  // This runs entirely in the browser (no server needed)
  const cryptoKey = await crypto.subtle.importKey(
    "raw",           // Key format (raw bytes)
    keyData,         // The secret key
    { name: "HMAC", hash: "SHA-256" },  // Algorithm
    false,           // Not extractable
    ["sign"]         // Key usage (can only be used for signing)
  );

  // Generate the signature
  const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, msgData);

  // Convert binary signature to base64 string
  const bytes = new Uint8Array(signatureBuffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);  // btoa = binary to ASCII (base64)
}

/**
 * generateTransactionUuid — Create a unique transaction identifier
 * 
 * Format: YYYYMMDD-RANDOMSTRING
 * Example: 20240115-A3K9B2M7
 * 
 * This ensures each transaction is unique, even if the same
 * amount is paid multiple times.
 */
function generateTransactionUuid(): string {
  const now = new Date();
  
  // Date part: YYYYMMDD
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  
  // Random part: 8 random alphanumeric characters
  const randPart = Math.random().toString(36).substring(2, 10).toUpperCase();
  
  return `${datePart}-${randPart}`;
}

/**
 * initiateEsewaPayment — Start the eSewa payment flow
 * 
 * This function:
 * 1. Calculates tax (13% VAT)
 * 2. Generates a unique transaction UUID
 * 3. Creates an HMAC signature
 * 4. Builds a hidden HTML form
 * 5. Auto-submits the form to eSewa
 * 
 * @param subtotal - Amount before tax (in NPR)
 * @param onSuccessUrl - Where to redirect after successful payment
 * @param onFailureUrl - Where to redirect if payment fails
 */
export async function initiateEsewaPayment(
  subtotal: number,
  onSuccessUrl: string,
  onFailureUrl: string
): Promise<void> {
  // Calculate 13% VAT (Nepal tax)
  const taxAmount = Math.round(subtotal * 0.13 * 100) / 100;
  
  // Calculate total (subtotal + tax)
  const totalAmount = Math.round((subtotal + taxAmount) * 100) / 100;
  
  // Generate unique transaction ID
  const transactionUuid = generateTransactionUuid();

  // Generate HMAC signature to verify payment authenticity
  const signature = await generateSignature(
    totalAmount.toFixed(2),
    transactionUuid,
    ESEWA.productCode
  );

  // Create a hidden HTML form that will auto-submit to eSewa
  const form = document.createElement("form");
  form.method = "POST";  // Must be POST for eSewa
  form.action = ESEWA.payUrl;  // eSewa's payment endpoint

  // All fields that eSewa requires
  const fields: Record<string, string> = {
    amount: subtotal.toFixed(2),           // Amount before tax
    tax_amount: taxAmount.toFixed(2),      // Tax amount (13%)
    total_amount: totalAmount.toFixed(2),  // Total including tax
    transaction_uuid: transactionUuid,     // Unique transaction ID
    product_code: ESEWA.productCode,       // Product code (EPAYTEST)
    product_service_charge: "0",           // No service charge
    product_delivery_charge: "0",          // No delivery charge
    success_url: onSuccessUrl,             // Redirect on success
    failure_url: onFailureUrl,             // Redirect on failure
    signed_field_names: "total_amount,transaction_uuid,product_code",  // Fields to verify
    signature: signature,                  // HMAC signature
  };

  // Create hidden input fields for each payment parameter
  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";  // Hidden field (not visible to user)
    input.name = key;       // Field name (eSewa expects these names)
    input.value = value;    // Field value
    form.appendChild(input);
  });

  // Add form to page and submit it
  // This redirects the browser to eSewa's payment page
  document.body.appendChild(form);
  form.submit();
  
  // After this, the browser navigates to eSewa
  // User enters credentials, eSewa processes payment
  // eSewa redirects back to success_url or failure_url
}

/**
 * decodeEsewaResponse — Parse the base64 response from eSewa
 * 
 * After payment, eSewa redirects back to our site with a base64-encoded
 * JSON response in the "data" query parameter.
 * 
 * Example response data:
 * {
 *   "status": "COMPLETE",
 *   "ref_id": "000000000000000001",
 *   "transaction_uuid": "20240115-A3K9B2M7",
 *   "total_amount": "57.00"
 * }
 * 
 * @param encodedData - Base64-encoded response string
 * @returns Decoded data object, or null if decoding fails
 */
export function decodeEsewaResponse(encodedData: string): Record<string, any> | null {
  try {
    // atob = ASCII to binary (decode base64)
    // JSON.parse converts the decoded string to a JavaScript object
    return JSON.parse(atob(encodedData));
  } catch {
    // If decoding fails (invalid base64 or malformed JSON)
    return null;
  }
}
