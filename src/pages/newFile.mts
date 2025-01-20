import { actions } from "astro:actions";
import { form, btnSubmit } from "./register.astro.0.mts";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    btnSubmit.setAttribute("disabled", "disabled");

    const formData = new FormData(form);

    const { data, error } = await actions.registerUser(formData);

    btnSubmit.removeAttribute("disabled");
});
