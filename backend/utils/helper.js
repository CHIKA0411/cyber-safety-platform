const phoneRegex = /(?:\+91|91|0)?[6-9]\d{9}/g;
const upiRegex = /\b[\w.\-]{2,256}@[a-z]{2,64}\b/gi;
const cardRegex = /\b(?:\d[ -]*?){13,16}\b/g;
const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

export function luhnCheck(num) {
  const digits = (num || "").replace(/[^0-9]/g, "");
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits.charAt(i), 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return digits.length >= 13 && sum % 10 === 0;
}

export function maskPhone(m) {
  const s = m.replace(/\D/g, "");
  if (s.length < 10) return "**********";
  return s.slice(0, 2) + "*****" + s.slice(-2);
}

export function maskUPI(m) {
  const [id, handle] = m.split("@");
  const head = id?.slice(0, 2) || "**";
  return `${head}****@${handle}`;
}

export function maskCard(m) {
  if (!luhnCheck(m)) return m;
  const last4 = m.replace(/\D/g, "").slice(-4);
  return `**** **** **** ${last4}`;
}

export function maskEmail(m) {
  const [user, domain] = m.split("@");
  const head = user?.slice(0, 1) || "*";
  return `${head}*****@${domain}`;
}

export function redactPII(text = "") {
  return text
    .replace(phoneRegex, (m) => maskPhone(m))
    .replace(upiRegex, (m) => maskUPI(m))
    .replace(cardRegex, (m) => maskCard(m))
    .replace(emailRegex, (m) => maskEmail(m));
}

export const rateBuckets = new Map();

export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const bucket = rateBuckets.get(key) || [];
  const fresh = bucket.filter((t) => now - t < windowMs);
  if (fresh.length >= limit) return false;
  fresh.push(now);
  rateBuckets.set(key, fresh);
  return true;
}

export const VALID_TAGS = new Set([
  "UPI",
  "KYC",
  "Job",
  "Loan",
  "Crypto",
  "Romance",
  "Govt",
  "OTP",
]);

export function sanitizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  return [...new Set(tags.filter((t) => VALID_TAGS.has(t)).slice(0, 3))];
}

export function ensureTextQuality(text) {
  const plain = text?.trim() || "";
  if (plain.length < 30)
    return { ok: false, reason: "Story must be at least 30 characters" };
  return { ok: true };
}
