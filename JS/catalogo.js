const botonMenu = document.getElementById("menu");
const cerrarMenu = document.getElementById("close-menu")
const menuLateral = document.getElementById("menu-lateral");

botonMenu.addEventListener("click", () => {
    menuLateral.classList.toggle("activo");
});

cerrarMenu.addEventListener("click", () => {
    menuLateral.classList.remove("activo");
});