// JSON encryption/decryption utility

/**
 * Encrypts a JSON object using a simple insertion method
 * 1. btoa (base64 encode) the stringified JSON
 * 2. Generate a random n-digit key
 * 3. Insert the key at a random position in the encoded string
 * 4. Append the key length and insertion position at the end
 * @module
 */
export function encryptJSON<T>(json: T): string {
  // Convert JSON to string and encode with base64
  const jsonStr = JSON.stringify(json);
  const base64 = btoa(jsonStr);

  // Generate random key length between 8-12 characters
  const keyLength = Math.floor(Math.random() * 5) + 8;
  const key = Math.random()
    .toString(36)
    .substring(2, 2 + keyLength);

  // Find a random position to insert the key
  const insertPosition = Math.floor(Math.random() * base64.length);

  // Insert the key at the chosen position
  const encodedWithKey = base64.substring(0, insertPosition) + key + base64.substring(insertPosition);

  // Append key length and insert position as two digits
  // Pad with zeros if needed
  const keyLengthStr = keyLength.toString().padStart(2, "0");
  const insertPositionStr = insertPosition.toString().padStart(5, "0");

  return encodedWithKey + keyLengthStr + insertPositionStr;
}

/**
 * Decrypts an encrypted JSON string
 * 1. Extract key length and insert position from the end
 * 2. Remove the key from the encoded string
 * 3. Convert back from base64 to original JSON
 */
export function decryptJSON<T>(encrypted: string): T {
  try {
    // Extract key length and position from the end
    const insertPositionStr = encrypted.slice(-5);
    const keyLengthStr = encrypted.slice(-7, -5);
    const insertPosition = parseInt(insertPositionStr, 10);
    const keyLength = parseInt(keyLengthStr, 10);

    // Remove metadata digits
    const encodedWithKey = encrypted.slice(0, -7);

    // Remove the inserted key
    const base64 = encodedWithKey.substring(0, insertPosition) + encodedWithKey.substring(insertPosition + keyLength);

    // Decode base64 and parse JSON
    const jsonStr = atob(base64);
    return JSON.parse(jsonStr) as T;
  } catch (error) {
    throw new Error(`Decryption failed: Invalid character`);
  }
}
