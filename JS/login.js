/* ============================================================
   LOGIN.JS
   Conceptos usados: addEventListener, Promise (resolve/reject),
   .then()/.catch(), trim(), JSON.parse.

   Nota: preventDefault() y el evento "submit" no aparecen en los
   apuntes, pero son necesarios para que el formulario no recargue
   la página al enviarse (comportamiento por defecto del HTML).
   Se explica aparte en la documentación como concepto adicional.
   ============================================================ */

const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const mensajeLogin = document.getElementById("mensaje-login");

function validarLogin(email, password) {
    return new Promise((resolve, reject) => {
        if (email.trim() === "" || password.trim() === "") {
            reject("Completá correo y contraseña.");
        } else if (password.length < 4) {
            reject("La contraseña es demasiado corta.");
        } else {
            resolve("¡Bienvenido de nuevo!");
        }
    });
}

formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault(); // evita que la página se recargue

    const email = inputEmail.value;
    const password = inputPassword.value;

    validarLogin(email, password)
        .then((mensajeExito) => {
            mensajeLogin.textContent = mensajeExito;
            mensajeLogin.className = "ok";

            // Guardamos un "usuario logueado" simple para que
            // usuario.html tenga qué mostrar.
            const nombre = email.split("@")[0];
            localStorage.setItem("usuarioKaisen", JSON.stringify({ nombre, email }));

            setTimeout(() => {
                window.location.href = "usuario.html";
            }, 800);
        })
        .catch((mensajeError) => {
            mensajeLogin.textContent = mensajeError;
            mensajeLogin.className = "error";
        });
});
