/* ============================================================
   BUSCADOR.JS  (solo corre en catalogo.html, donde existen estos IDs)
   Conceptos usados: querySelector/querySelectorAll, addEventListener
   ("click" e "input"), classList.toggle, for...of, toLowerCase(),
   includes(), classList.add/remove.
   ============================================================ */

const btnBuscador = document.getElementById("btn-buscador");
const buscador = document.getElementById("buscador");
const inputBuscador = document.getElementById("buscador-input");
const productos = document.querySelectorAll(".producto");
const sinResultados = document.getElementById("sin-resultados");

// Evento 1: click en la lupa -> muestra/oculta la barra de búsqueda.
// Si el elemento tiene la clase "oculto" se la saca (display vuelve
// a flex/block), si no la tiene se la agrega.
btnBuscador.addEventListener("click", () => {
    buscador.classList.toggle("oculto");
    if (!buscador.classList.contains("oculto")) {
        inputBuscador.focus();
    }
});

// Evento 2: "input" se dispara cada vez que el usuario escribe algo
// en el campo de texto (a diferencia de "change", que espera a que
// pierda el foco). Con cada letra escrita, recorremos los productos
// y comparamos el nombre (en minúscula) contra lo escrito.
inputBuscador.addEventListener("input", () => {
    const texto = inputBuscador.value.trim().toLowerCase();
    let hayResultados = false;

    for (const producto of productos) {
        const nombre = producto.getAttribute("data-nombre").toLowerCase();

        if (nombre.includes(texto)) {
            producto.classList.remove("oculto");
            hayResultados = true;
        } else {
            producto.classList.add("oculto");
        }
    }

    // Si ningún producto matchea, mostramos el mensaje "No se encontraron..."
    if (hayResultados) {
        sinResultados.classList.add("oculto");
    } else {
        sinResultados.classList.remove("oculto");
    }
});
