const botonMenu = document.getElementById("menu");
const menuLateral = document.getElementById("menu-lateral");

botonMenu.addEventListener("click", () => {
    menuLateral.classList.toggle("activo");
});