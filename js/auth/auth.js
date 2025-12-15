import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../db/config.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

$('#login-form').on('submit', async function (e) {
  e.preventDefault();

  const result = await login(this.password.value);

  if (!result) {
    $('#password').addClass('is-invalid');
    return;
  }

  location.replace('/homepage');
});

async function login(password) {
  const { data, error } = await supabase.functions.invoke('login', {
    body: { pwd: password }
  });

  if (error || !data?.token) {
    return false;
  }

  sessionStorage.setItem('auth', data.token);
  return true;
}
