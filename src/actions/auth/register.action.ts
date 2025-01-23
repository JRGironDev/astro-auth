import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.string().optional()
    }),
    handler: async ({ name, password, email, remember_me }, { cookies}) => {
        if ( remember_me ) 
        {
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
                path: '/'
            })
        } else 
        {
            cookies.delete('email', {
                path: '/'
            })
        }

        return { ok: true, msj: "Registro exitoso" };
    }
})