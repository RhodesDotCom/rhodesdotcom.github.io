import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { supabase, EMAIL } from "../db/config.js";

supabase.auth.signOut();

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
  const { error } = await supabase.auth.signInWithPassword({
    email: EMAIL,
    password
  });

  if (error) {
    return false;
  }

  return true;
}
