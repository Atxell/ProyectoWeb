

let direcciones = [];
let idDireccionCounter = 1;
        // Navegación dinámica entre secciones
        document.querySelectorAll(".sidebar a").forEach(link => {
            link.addEventListener("click", function(event) {
                event.preventDefault();

                // Eliminar clase activa de todos los enlaces
                document.querySelectorAll(".sidebar a").forEach(link => link.classList.remove("active"));

                // Agregar clase activa al enlace actual
                this.classList.add("active");

                // Ocultar todas las secciones
                document.querySelectorAll(".section").forEach(section => section.classList.add("d-none"));

                // Mostrar la sección seleccionada
                const sectionId = this.getAttribute("data-section");
                document.getElementById(sectionId).classList.remove("d-none");
            });
        });

        function agregarDireccion() {
    const nombre = document.getElementById("nombredrcc").value;
    const calle = document.getElementById("calle").value;
    const codigoPostal = document.getElementById("codpost").value;
    const numeroExterior = document.getElementById("nm-ext").value;
    const numeroInterior = document.getElementById("nm-int").value;
    const colonia = document.getElementById("colonia").value;
    const pais = document.getElementById("pais").value;
    const estado = document.getElementById("estado").value;
    const ciudad = document.getElementById("ciudad").value;
    const numeroTelefonico = document.getElementById("nm-tfl").value;

    if (nombre && calle && codigoPostal && numeroExterior && colonia && pais && estado && ciudad && numeroTelefonico) {
        direcciones.push({
            id: idDireccionCounter++,
            nombre,
            calle,
            codigoPostal,
            numeroExterior,
            numeroInterior: numeroInterior || "N/A",
            colonia,
            pais,
            estado,
            ciudad,
            numeroTelefonico
        });

        mostrarDirecciones();
        limpiarCamposDireccion();
    } else {
        alert("Por favor completa todos los campos obligatorios.");
    }
}

function mostrarDirecciones() {
    const tbody = document.getElementById("tabla-direcciones").querySelector("tbody");
    tbody.innerHTML = "";

    direcciones.forEach(dir => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${dir.nombre}</td>
            <td>${dir.calle}</td>
            <td>${dir.codigoPostal}</td>
            <td>${dir.numeroExterior}</td>
            <td>${dir.numeroInterior}</td>
            <td>${dir.colonia}</td>
            <td>${dir.pais}</td>
            <td>${dir.estado}</td>
            <td>${dir.ciudad}</td>
            <td>${dir.numeroTelefonico}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarDireccion(${dir.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}
function eliminarDireccion(id) {
    direcciones = direcciones.filter(dir => dir.id !== id);
    mostrarDirecciones();
}

function limpiarCamposDireccion() {
    document.getElementById("nombredrcc").value = "";
    document.getElementById("calle").value = "";
    document.getElementById("codpost").value = "";
    document.getElementById("nm-ext").value = "";
    document.getElementById("nm-int").value = "";
    document.getElementById("colonia").value = "";
    document.getElementById("pais").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("ciudad").value = "";
    document.getElementById("nm-tfl").value = "";
}

// Habilitar edición de datos personales
function habilitarEdicionDatos() {
    document.getElementById("editar-datos").classList.remove("d-none");
}

// Cancelar edición
function cancelarEdicionDatos() {
    document.getElementById("editar-datos").classList.add("d-none");
}

// Guardar cambios en los datos personales
function guardarCambiosDatos() {
    const nuevoNombre = document.getElementById("nuevo-nombre").value;
    const nuevoEmail = document.getElementById("nuevo-email").value;
    const nuevoTelefono = document.getElementById("nuevo-telefono").value;
    const nuevaContrasena = document.getElementById("nueva-contrasena").value;

    if (nuevoNombre && nuevoEmail && nuevoTelefono) {
        document.getElementById("nombre-usuario").textContent = nuevoNombre;
        document.getElementById("email-usuario").textContent = nuevoEmail;
        document.getElementById("telefono-usuario").textContent = nuevoTelefono;

        if (nuevaContrasena) {
            document.getElementById("contrasena-usuario").textContent = "******";
        }

        alert("Datos personales actualizados correctamente.");
        cancelarEdicionDatos();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}


// Habilitar cambio de foto
function habilitarCambioFoto() {
    const cambiarFoto = document.getElementById("cambiar-foto");
    cambiarFoto.click();

    cambiarFoto.addEventListener("change", function () {
        const archivo = cambiarFoto.files[0];
        if (archivo) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("foto-perfil").src = e.target.result;
            };
            reader.readAsDataURL(archivo);
        }
    });
}
    