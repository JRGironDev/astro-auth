import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { createUserWithEmailAndPassword, type AuthError } from "firebase/auth";
import { firebase } from "@/firebase/config";

export const registerUser = defineAction({
    accept: 'form',
    input: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.string().optional()
    }),
    handler: async ({ name, password, email, remember_me }, { cookies}) => {
        // Cookies
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
            });
        }
        
        // Create user
        try {
            const user = await createUserWithEmailAndPassword(
                firebase.auth,
                email,
                password
            );

            // Actualizar usuario

            // Verificar el correo electrónico
            console.log(user);

            return user;
        } catch (error) {
            const firebaseError = error as AuthError;
            
            if (firebaseError.code === "auth/email-already-in-use") {
                throw new Error("El correo electrónico ya está en uso");
            }
            
            throw new Error("Error al registrar el usuario");
        }
    },
});