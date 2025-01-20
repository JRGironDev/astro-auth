import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

export const prerender = false;

const privateRoutes = ['/protected'];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async({url, request}, next) => {

    const authHeaders = request.headers.get("Authorization") ?? "";
    console.log(authHeaders);

    if (privateRoutes.includes(url.pathname)) {

        if (authHeaders) {
            return checkAuth(authHeaders, next);
        }

    return new Response("Autenticación necesaria", {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
    });
    }

    return next();
});

const checkAuth = ( authHeaders: string, next: MiddlewareNext ) => {

    if (authHeaders) {
        const authValue = authHeaders.split(" ").at(-1) ?? 'user:pass';
        const decodedValue = atob(authValue).split(":");
        const [user, password] = decodedValue;

        console.log(decodedValue)
    
        if (user === 'admin' && password === 'admin2') {
            return next();
        }
    }

    return new Response("Autenticación necesaria", {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
        },
    });
};