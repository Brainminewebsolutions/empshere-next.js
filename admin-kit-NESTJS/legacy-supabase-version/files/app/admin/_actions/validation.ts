// Shared input checks for admin server actions. Not a "use server" file -
// plain helpers imported by the action modules.

export const MIN_PASSWORD_LENGTH = 12;

export function validatePassword(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (password.length > 128) return "Password is too long (max 128 characters).";
  const classes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter((r) => r.test(password)).length;
  if (classes < 3) {
    return "Use at least three of: lowercase, uppercase, numbers, symbols.";
  }
  return null;
}

// Supabase Auth logins are email addresses. A plain username like
// "securehouseadmin07" is stored as "securehouseadmin07@secure-house.co.uk"
// so staff can sign in with either form. No mail is ever sent to it.
export const USERNAME_DOMAIN = "secure-house.co.uk";

export function toLoginEmail(identifier: string) {
  const value = identifier.trim().toLowerCase();
  if (value.includes("@")) return value;
  return /^[a-z0-9._-]{3,64}$/.test(value) ? `${value}@${USERNAME_DOMAIN}` : "";
}

export function isEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
