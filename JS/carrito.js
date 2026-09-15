/* ============================================================
   CARRITO.JS
   Conceptos usados: JSON.parse/stringify, template strings,
   for...of, array.reduce/filter, querySelector, addEventListener
   ("click"), innerHTML, classList.add/remove, dataset vía
   getAttribute.
   ============================================================ */

const listaCarrito = document.getElementById("lista-carrito");
const totalCarritoSpan = document.getElementById("total-carrito");
const resumen = document.getElementById("resumen");
const carritoVacioMsg = document.getElementById("carrito-vacio");
const badgeCarrito = document.getElementById("badge-carrito");
const btnVaciar = document.getElementById("btn-vaciar");

function obtenerCarrito() {
    const datos = localStorage.getItem("carritoKaisen");
    return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carritoKaisen", JSON.stringify(carrito));
}

// Dibuja todo el carrito de nuevo cada vez que algo cambia
// (agregar, quitar, sumar, restar o vaciar).
function renderizarCarrito() {
    const carrito = obtenerCarrito();
    listaCarrito.innerHTML = ""; // limpiamos antes de volver a pintar

    if (carrito.length === 0) {
        carritoVacioMsg.classList.remove("oculto");
        resumen.classList.add("oculto");
        badgeCarrito.classList.add("oculto");
        return;
    }

    carritoVacioMsg.classList.add("oculto");
    resumen.classList.remove("oculto");

    let total = 0;
    let totalItems = 0;

    // for...of para recorrer el array de productos guardados
    for (const item of carrito) {
        total += item.precio * item.cantidad;
        totalItems += item.cantidad;

        // Armamos el HTML de cada fila con template strings y lo
        // vamos concatenando al contenedor.
        const fila = `
            <div class="item-carrito" data-nombre="${item.nombre}">
                <div class="item-info">
                    <h3>${item.nombre}</h3>
                    <p>$${item.precio} c/u</p>
                </div>
                <div class="item-cantidad">
                    <button class="btn-restar">-</button>
                    <span>${item.cantidad}</span>
                    <button class="btn-sumar">+</button>
                </div>
                <button class="btn-quitar">Quitar</button>
            </div>
        `;
        listaCarrito.innerHTML += fila;
    }

    totalCarritoSpan.textContent = total;
    badgeCarrito.textContent = totalItems;
    badgeCarrito.classList.remove("oculto");

    asignarEventosFilas();
}

// Como las filas se generan dinámicamente, hay que "engancharles"
// los eventos cada vez que se vuelven a dibujar.
function asignarEventosFilas() {
    const filas = document.querySelectorAll(".item-carrito");

    filas.forEach((fila) => {
        const nombre = fila.getAttribute("data-nombre");

        fila.querySelector(".btn-sumar").addEventListener("click", () => {
            cambiarCantidad(nombre, 1);
        });

        fila.querySelector(".btn-restar").addEventListener("click", () => {
            cambiarCantidad(nombre, -1);
        });

        fila.querySelector(".btn-quitar").addEventListener("click", () => {
            quitarProducto(nombre);
        });
    });
}

function cambiarCantidad(nombre, delta) {
    let carrito = obtenerCarrito();
    const item = carrito.find((p) => p.nombre === nombre);

    if (!item) return;

    item.cantidad += delta;

    // Si llega a 0, directamente lo sacamos del array con filter().
    if (item.cantidad <= 0) {
        carrito = carrito.filter((p) => p.nombre !== nombre);
    }

    guardarCarrito(carrito);
    renderizarCarrito();
}

function quitarProducto(nombre) {
    const carrito = obtenerCarrito().filter((p) => p.nombre !== nombre);
    guardarCarrito(carrito);
    renderizarCarrito();
}

// Evento: vaciar todo el carrito de una.
btnVaciar.addEventListener("click", () => {
    guardarCarrito([]);
    renderizarCarrito();
});

renderizarCarrito();
