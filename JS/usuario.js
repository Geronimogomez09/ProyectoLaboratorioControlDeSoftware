/* ============================================================
   USUARIO.JS
   Conceptos usados: JSON.parse, querySelector, addEventListener
   ("click"), setAttribute (para contentEditable), classList,
   template strings.
   ============================================================ */

const sinSesion = document.getElementById("sin-sesion");
const tarjetaUsuario = document.getElementById("tarjeta-usuario");
const campoNombre = document.getElementById("campo-nombre");
const campoEmail = document.getElementById("campo-email");
const btnEditar = document.getElementById("btn-editar");
const btnGuardar = document.getElementById("btn-guardar");
const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

function obtenerUsuario() {
    const datos = localStorage.getItem("usuarioKaisen");
    return datos ? JSON.parse(datos) : null;
}

function mostrarUsuario() {
    const usuario = obtenerUsuario();

    if (!usuario) {
        sinSesion.classList.remove("oculto");
        tarjetaUsuario.classList.add("oculto");
        return;
    }

    sinSesion.classList.add("oculto");
    tarjetaUsuario.classList.remove("oculto");
    campoNombre.textContent = usuario.nombre;
    campoEmail.textContent = usuario.email;
}

// Evento: "Editar" activa el contentEditable en los campos, igual
// que el ejercicio del apunte de DOM (titulo.setAttribute
// ("contentEditable", "true")). Así el usuario puede escribir
// directamente arriba del texto, sin un <input>.
btnEditar.addEventListener("click", () => {
    campoNombre.setAttribute("contentEditable", "true");
    campoEmail.setAttribute("contentEditable", "true");
    campoNombre.classList.add("editable");
    campoEmail.classList.add("editable");
    campoNombre.focus();

    btnEditar.classList.add("oculto");
    btnGuardar.classList.remove("oculto");
});

// Evento: "Guardar" apaga el contentEditable y persiste los
// cambios en localStorage.
btnGuardar.addEventListener("click", () => {
    campoNombre.setAttribute("contentEditable", "false");
    campoEmail.setAttribute("contentEditable", "false");
    campoNombre.classList.remove("editable");
    campoEmail.classList.remove("editable");

    const usuario = {
        nombre: campoNombre.textContent.trim(),
        email: campoEmail.textContent.trim()
    };
    localStorage.setItem("usuarioKaisen", JSON.stringify(usuario));

    btnGuardar.classList.add("oculto");
    btnEditar.classList.remove("oculto");
});

// Evento: cerrar sesión borra el usuario guardado y vuelve al
// estado "sin sesión".
btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("usuarioKaisen");
    mostrarUsuario();
});

mostrarUsuario();
