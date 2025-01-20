import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

export const prerender = false;

const privateRoutes = ['/protected'];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async({url, request}, next) => {

    return next();
});