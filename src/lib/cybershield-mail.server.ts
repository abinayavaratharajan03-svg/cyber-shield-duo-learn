// Server-only Gmail helper for CyberShield.
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
const TO_EMAIL = "cybershield0323@gmail.com";

function b64url(str: string) {
  return Buffer.from(str, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function sendGmail(subject: string, plainBody: string, replyTo?: string) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
  if (!lovableKey) throw new Error("Missing LOVABLE_API_KEY");
  if (!gmailKey) throw new Error("Missing GOOGLE_MAIL_API_KEY");

  const headers = [
    `To: ${TO_EMAIL}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "",
    plainBody,
  ].filter(Boolean).join("\r\n");

  const raw = b64url(headers);

  const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gmailKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gmail send failed (${res.status}): ${text}`);
  }
  return res.json();
}
