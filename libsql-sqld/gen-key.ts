#!/usr/bin/env -S deno run -A

import * as jose from "npm:jose";

const access = "rw"; // Change to "ro" for read-only access

console.log("🔑 Generating Ed25519 keypair for libSQL authentication...\n");

try {
  // Generate Ed25519 keypair
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "Ed25519",
      namedCurve: "Ed25519",
    },
    true,
    ["sign", "verify"],
  );

  // Export public key as raw bytes
  const rawPublicKey = await crypto.subtle.exportKey("raw", keyPair.publicKey);

  // Convert to URL-safe base64 format
  const urlSafeBase64PublicKey = btoa(
    String.fromCharCode(...new Uint8Array(rawPublicKey)),
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Generate JWT with access permissions
  const jwt = await (new jose.SignJWT({ "a": access }))
    .setProtectedHeader({ alg: "EdDSA", "typ": "JWT" })
    .setIssuedAt()
    .sign(keyPair.privateKey);

  console.log("✅ Keys generated successfully!\n");
  console.log("📋 COPY THESE VALUES:\n");
  console.log("Public Key (for SQLD_AUTH_JWT_KEY_FILE):");
  console.log(urlSafeBase64PublicKey);
  console.log("\nJWT Auth Token (for client connections):");
  console.log(jwt);
  console.log("\n" + "=".repeat(80));
  console.log("🐳 DOCKER COMMAND:");
  console.log("Save the public key to a file and run:");
  console.log(`echo "${urlSafeBase64PublicKey}" > sqld_public_key.txt`);
  console.log("docker run -p 8080:8080 -d \\");
  console.log("  -v $(pwd)/sqld_public_key.txt:/etc/sqld_public_key.txt \\");
  console.log("  -e SQLD_AUTH_JWT_KEY_FILE=/etc/sqld_public_key.txt \\");
  console.log("  ghcr.io/tursodatabase/libsql-server:latest");
  console.log("\n" + "=".repeat(80));
  console.log("🧪 TEST CONNECTION:");
  console.log("Use this code to test your connection:");
  console.log(`
import { createClient } from "npm:@libsql/client";

const client = createClient({
  url: "http://YOUR_SERVER_IP:8080",
  authToken: "${jwt}"
});

const result = await client.execute("SELECT 1 as test;");
console.log(result);
  `);

} catch (error) {
  console.error("❌ Error generating keys:", error);
  Deno.exit(1);
}



