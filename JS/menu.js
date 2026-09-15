/* ============================================================
   MENU.JS
   Maneja la apertura y cierre del menú lateral (hamburguesa).
   Se usa en TODAS las páginas del sitio.
   Conceptos: getElementById, addEventListener("click"), classList.toggle/remove
   ============================================================ */

const botonMenu = document.getElementById("menu");
const cerrarMenu = document.getElementById("close-menu");
const menuLateral = document.getElementById("menu-lateral");

// Evento 1: al hacer click en el botón hamburguesa, se agrega/quita la clase
// "activo" del menú lateral. classList.toggle() decide solo si hay que
// agregarla o quitarla según si ya está presente.
botonMenu.addEventListener("click", () => {
    menuLateral.classList.toggle("activo");
});

// Evento 2: al hacer click en "Cerrar menu", se fuerza a que la clase
// "activo" se elimine (classList.remove), sin importar el estado previo.
cerrarMenu.addEventListener("click", () => {
    menuLateral.classList.remove("activo");
});
