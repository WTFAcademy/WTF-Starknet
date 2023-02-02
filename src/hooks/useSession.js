import { useEffect, useState } from "react"
import { supabase } from "../api/auth";

export const useSession = () => {
	const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });
  }, []);
	return session;
}