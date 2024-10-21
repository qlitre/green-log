import { getCookie } from "hono/cookie"
import { useRequestContext } from 'hono/jsx-renderer'
import { createClient } from "@supabase/supabase-js/dist/main/index.js";
import { Context } from "hono";


export const checksupabaseAuth = async (c: Context)=> {
    const supabase = createClient(
        c.env.PROJECT_URL,
        c.env.API_KEY
    );
    const token = getCookie(c, 'supabase_token');
    if (!token) return false;

    const { data, error } = await supabase.auth.getUser(token);
    if (error) return false;

    return !!data.user;
}