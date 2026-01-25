import { supabase } from "../db/config.js";

(async function () {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    window.location.replace("/login");
    return;
  }

  document.body.style.display = 'block';
})();
