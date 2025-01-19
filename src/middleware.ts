import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async(context, next) => {

    return new Response(
        JSON.stringify({
            message: "Hello World",
        }),
    )

    //return next();
});