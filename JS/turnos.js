/* ============================================================
   TURNOS.JS
   Conceptos usados: switch, Promise (resolve/reject), .then()/
   .catch(), addEventListener("click"), trim(), template strings,
   JSON.stringify/parse, array.filter, for...of.
   ============================================================ */

const inputNombre = document.getElementById("nombre-cliente");
const selectServicio = document.getElementById("servicio");
const inputFecha = document.getElementById("fecha");
const inputHora = document.getElementById("hora");
const btnReservar = document.getElementById("btn-reservar");
const mensajeTurno = document.getElementById("mensaje-turno");
const listaTurnosGuardados = document.getElementById("lista-turnos-guardados");

// switch: según el value del <select>, devuelve el precio del
// servicio. Mismo mecanismo que el ejercicio de "fruta" del apunte.
function precioSegunServicio(servicio) {
    switch (servicio) {
        case "corte":
            return 4000;
        case "fade":
            return 6000;
        case "barba":
            return 3000;
        case "combo":
            return 8000;
        default:
            return 0;
    }
}

// Esta función devuelve una Promise, igual que el ejercicio de
// "verificarEdad()" del apunte de Promises: valida los datos y
// resuelve (resolve) si está todo bien, o rechaza (reject) con
// un mensaje de error si falta algo.
function validarTurno(nombre, fecha, hora) {
    return new Promise((resolve, reject) => {
        if (nombre.trim() === "") {
            reject("Ingresá tu nombre para reservar el turno.");
        } else if (fecha === "") {
            reject("Elegí una fecha para el turno.");
        } else if (hora === "") {
            reject("Elegí un horario para el turno.");
        } else {
            resolve("Turno reservado con éxito.");
        }
    });
}

function obtenerTurnos() {
    const datos = localStorage.getItem("turnosKaisen");
    return datos ? JSON.parse(datos) : [];
}

function guardarTurnos(turnos) {
    localStorage.setItem("turnosKaisen", JSON.stringify(turnos));
}

function renderizarTurnos() {
    const turnos = obtenerTurnos();
    listaTurnosGuardados.innerHTML = "";

    for (const turno of turnos) {
        const fila = `
            <div class="turno-item" data-id="${turno.id}">
                <span>${turno.nombre} - ${turno.servicioTexto} - ${turno.fecha} ${turno.hora} ($${turno.precio})</span>
                <button class="btn-cancelar">Cancelar</button>
            </div>
        `;
        listaTurnosGuardados.innerHTML += fila;
    }

    // Enganchamos el evento de cancelar en cada fila recién creada.
    document.querySelectorAll(".btn-cancelar").forEach((boton) => {
        boton.addEventListener("click", () => {
            const idFila = boton.closest(".turno-item").getAttribute("data-id");
            const turnosFiltrados = obtenerTurnos().filter((t) => String(t.id) !== idFila);
            guardarTurnos(turnosFiltrados);
            renderizarTurnos();
        });
    });
}

// Evento: click en "Reservar turno".
btnReservar.addEventListener("click", () => {
    const nombre = inputNombre.value;
    const fecha = inputFecha.value;
    const hora = inputHora.value;
    const servicio = selectServicio.value;
    const precio = precioSegunServicio(servicio);

    validarTurno(nombre, fecha, hora)
        .then((mensajeExito) => {
            // .then() se ejecuta solo si la Promise se resolvió (resolve).
            mensajeTurno.textContent = mensajeExito;
            mensajeTurno.className = "ok";

            const turnos = obtenerTurnos();
            turnos.push({
                id: Date.now(),
                nombre,
                servicioTexto: selectServicio.options[selectServicio.selectedIndex].text,
                fecha,
                hora,
                precio
            });
            guardarTurnos(turnos);
            renderizarTurnos();

            inputNombre.value = "";
            inputFecha.value = "";
            inputHora.value = "";
        })
        .catch((mensajeError) => {
            // .catch() se ejecuta solo si la Promise fue rechazada (reject).
            mensajeTurno.textContent = mensajeError;
            mensajeTurno.className = "error";
        });
});

renderizarTurnos();
