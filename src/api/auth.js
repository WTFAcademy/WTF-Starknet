import { createClient } from "@supabase/supabase-js";
import { ANON_KEY, CLIENT_URL } from "../constants/global";

export const supabase = createClient(CLIENT_URL, ANON_KEY, {
  autoRefreshToken: true,
});

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  console.log(error);
}

export async function signInWithGithub(redirectTo) {
  await supabase.auth.signIn(
    { provider: "github" },
    { redirectTo: redirectTo }
  );
}

export async function refreshSession() {
  const {
    data: { user, session },
    error,
  } = await supabase.auth.refreshSession();
  console.log("refresh error: ", error);
  return session;
}
