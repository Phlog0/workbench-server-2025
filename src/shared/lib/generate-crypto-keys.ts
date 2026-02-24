import * as crypto from "crypto";
export function generateCryptoKeys() {
  const key = crypto.randomBytes(32).toString("base64url");
  console.log(key);
  return key;
}

generateCryptoKeys();
