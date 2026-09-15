/* ============================================================
   CATALOGO.JS
   Conceptos usados: querySelectorAll, addEventListener("click"),
   getAttribute, arrays (find/push), JSON.stringify/JSON.parse
   (vistos en el apunte de JSON), template strings.

   Nota sobre localStorage: no aparece en los apuntes de la
   materia, pero es la forma estándar de guardar datos en el
   navegador entre una página y otra (acá, entre catalogo.html y
   carrito.html). Se explica aparte en la documentación como
   "concepto adicional necesario para que el sitio funcione".
   ============================================================ */

const botonesCarrito = document.querySelectorAll(".btn-carrito");
const badgeCarrito = document.getElementById("badge-carrito");

// Traemos el carrito guardado (si no hay nada todavía, arrancamos
// con un array vacío). JSON.parse convierte el string guardado
// de vuelta en un array/objeto de JS.
function obtenerCarrito() {
    const datos = localStorage.getItem("carritoKaisen");
    return datos ? JSON.parse(datos) : [];
}

// JSON.stringify hace lo contrario: convierte el array de JS en
// un string para poder guardarlo en localStorage.
function guardarCarrito(carrito) {
    localStorage.setItem("carritoKaisen", JSON.stringify(carrito));
}

// Actualiza el numerito rojo del ícono del carrito según la
// cantidad total de productos guardados.
function actualizarBadge() {
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);

    if (totalItems > 0) {
        badgeCarrito.textContent = totalItems;
        badgeCarrito.classList.remove("oculto");
    } else {
        badgeCarrito.classList.add("oculto");
    }
}

// Evento: un click en CUALQUIER botón "Agregar al Carrito".
// Como hay varios botones (uno por producto), recorremos el
// NodeList con forEach y le agregamos el mismo evento a todos.
botonesCarrito.forEach((boton) => {
    boton.addEventListener("click", () => {
        // getAttribute lee los data-* que pusimos en el HTML.
        const nombre = boton.getAttribute("data-nombre");
        const precio = Number(boton.getAttribute("data-precio"));

        const carrito = obtenerCarrito();

        // Buscamos si el producto ya estaba en el carrito para
        // sumarle cantidad en vez de duplicarlo.
        const existente = carrito.find((item) => item.nombre === nombre);

        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({ nombre, precio, cantidad: 1 });
        }

        guardarCarrito(carrito);
        actualizarBadge();

        // Pequeño feedback visual para el usuario.
        boton.textContent = "¡Agregado!";
        setTimeout(() => {
            boton.textContent = "Agregar al Carrito";
        }, 800);
    });
});

// Al cargar la página, mostramos el badge con lo que ya haya
// guardado de una visita anterior.
actualizarBadge();
