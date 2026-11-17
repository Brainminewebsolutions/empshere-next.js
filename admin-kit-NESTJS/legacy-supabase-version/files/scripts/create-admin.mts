// Creates the FIRST admin login (after that, add users from /admin/users).
//
//   node --env-file=.env.local scripts/create-admin.mts you@secure-house.co.uk "Your Name"
//
// Generates a strong random password and prints it once. If the email
// already exists in Supabase Auth, it's simply promoted to admin.
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const [email, fullName = ""] = process.argv.slice(2);
if (!email || !email.includes("@")) {
  console.error('Usage: node --env-file=.env.local scripts/create-admin.mts <email> "<full name>"');
  process.exit(1);
}

const url = process.env.SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
if (!url || !secretKey) {
  console.error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env.local");
  process.exit(1);
}

const supabase = createClient(url, secretKey, { auth: { persistSession: false } });
const normalizedEmail = email.trim().toLowerCase();

// 20 random bytes -> ~27 chars; prefix guarantees every character class.
const password = `Sh!9${randomBytes(20).toString("base64url")}`;

let userId: string | undefined;
let createdNew = false;

const { data: created, error: createError } = await supabase.auth.admin.createUser({
  email: normalizedEmail,
  password,
  email_confirm: true,
  user_metadata: { full_name: fullName },
});

if (created?.user) {
  userId = created.user.id;
  createdNew = true;
} else {
  // Probably already exists - find it.
  const { data: list, error: listError } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (listError) throw listError;
  userId = list.users.find((u) => u.email?.toLowerCase() === normalizedEmail)?.id;
  if (!userId) {
    console.error("Could not create or find the user:", createError?.message);
    process.exit(1);
  }
}

const { error: profileError } = await supabase
  .from("profiles")
  .upsert({ id: userId, email: normalizedEmail, full_name: fullName, role: "admin" });
if (profileError) {
  console.error("Failed to write profile (did you run supabase/schema.sql?):", profileError.message);
  process.exit(1);
}

console.log(`\n✔ ${normalizedEmail} is an admin.`);
if (createdNew) {
  console.log(`\n  Password: ${password}\n`);
  console.log("  Save it in a password manager now - it is not stored anywhere else.");
  console.log("  You can change it after logging in, under My account.\n");
} else {
  console.log("  (Existing user - password unchanged.)\n");
}
