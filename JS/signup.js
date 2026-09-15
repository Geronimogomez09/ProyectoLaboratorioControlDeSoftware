/* ============================================================
   SIGNUP.JS
   Conceptos usados: addEventListener, Promise (resolve/reject),
   .then()/.catch(), trim(), JSON.stringify.
   ============================================================ */

const formRegistro = document.getElementById("form-registro");
const inputNombre = document.getElementById("reg-nombre");
const inputApellido = document.getElementById("reg-apellido");
const inputEmail = document.getElementById("reg-email");
const inputPassword = document.getElementById("reg-password");
const inputPassword2 = document.getElementById("reg-password2");
const mensajeRegistro = document.getElementById("mensaje-registro");

function validarRegistro(nombre, apellido, email, password, password2) {
    return new Promise((resolve, reject) => {
        if (nombre.trim() === "" || apellido.trim() === "" || email.trim() === "") {
            reject("Completá todos los campos.");
        } else if (password.length < 4) {
            reject("La contraseña debe tener al menos 4 caracteres.");
        } else if (password !== password2) {
            reject("Las contraseñas no coinciden.");
        } else {
            resolve("Cuenta creada con éxito.");
        }
    });
}

formRegistro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = inputNombre.value;
    const apellido = inputApellido.value;
    const email = inputEmail.value;
    const password = inputPassword.value;
    const password2 = inputPassword2.value;

    validarRegistro(nombre, apellido, email, password, password2)
        .then((mensajeExito) => {
            mensajeRegistro.textContent = mensajeExito;
            mensajeRegistro.className = "ok";

            localStorage.setItem(
                "usuarioKaisen",
                JSON.stringify({ nombre: `${nombre} ${apellido}`, email })
            );

            setTimeout(() => {
                window.location.href = "usuario.html";
            }, 800);
        })
        .catch((mensajeError) => {
            mensajeRegistro.textContent = mensajeError;
            mensajeRegistro.className = "error";
        });
});
