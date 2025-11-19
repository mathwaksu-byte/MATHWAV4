import { createClient } from "@supabase/supabase-js";

type Env = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

declare global {
  interface Window {
    ENV: Env;
  }
}

export const supabase = createClient(window.ENV.SUPABASE_URL, window.ENV.SUPABASE_ANON_KEY);

