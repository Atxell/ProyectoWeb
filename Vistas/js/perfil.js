// Elementos de la página
const btnEditar = document.querySelector("button[onclick='habilitarEdicionDatos()']");
const seccionEdicion = document.getElementById("editar-datos");
const btnGuardar = document.querySelector("button[onclick='guardarCambiosDatos()']");
const btnCancelar = document.querySelector("button[onclick='cancelarEdicionDatos()']");

// Elementos de visualización
const nombreUsuario = document.getElementById("nombre-usuario");
const emailUsuario = document.getElementById("email-usuario");
const telefonoUsuario = document.getElementById("telefono-usuario");
const contrasenaUsuario = document.getElementById("contrasena-usuario");

// Elementos de edición
const inputNombre = document.getElementById("nuevo-nombre");
const inputEmail = document.getElementById("nuevo-email");
const inputTelefono = document.getElementById("nuevo-telefono");
const inputContrasena = document.getElementById("nueva-contrasena");

// Función para habilitar la edición de los datos
function habilitarEdicionDatos() {
    seccionEdicion.classList.remove("d-none");
    btnEditar.style.display = "none";

    // Rellenar los campos de edición con los datos actuales
    inputNombre.value = nombreUsuario.textContent.trim();
    inputEmail.value = emailUsuario.textContent.trim();
    inputTelefono.value = telefonoUsuario.textContent.trim();
    inputContrasena.value = ""; // No rellenar la contraseña por seguridad
}

// Función para guardar los cambios
async function guardarCambiosDatos() {
    // Obtener los valores editados
    const nuevosDatos = {
        nombre: inputNombre.value.trim(),
        correoelectronico: inputEmail.value.trim(),
        numerotelefono: inputTelefono.value.trim(),
        contrasena: inputContrasena.value.trim()
    };

    // Validar que los campos no estén vacíos
    if (!nuevosDatos.nombre || !nuevosDatos.correoelectronico || !nuevosDatos.numerotelefono || !nuevosDatos.contrasena) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    try {
        // Enviar datos al backend
        const response = await fetch("http://localhost:3000/perfil/editar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevosDatos)
        });

        if (!response.ok) {
            throw new Error("Error al guardar los cambios");
        }

        const resultado = await response.json();
        if (resultado.exito) {
            // Actualizar la vista con los nuevos datos
            nombreUsuario.textContent = nuevosDatos.nombre;
            emailUsuario.textContent = nuevosDatos.correoelectronico;
            telefonoUsuario.textContent = nuevosDatos.numerotelefono;
            contrasenaUsuario.textContent = "******"; // Enmascarar contraseña
            cancelarEdicionDatos();
            alert("Datos actualizados con éxito");
        } else {
            alert(`No se pudo actualizar los datos: ${resultado.mensaje}`);
        }
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al guardar los datos.");
    }
}

// Función para cancelar la edición
function cancelarEdicionDatos() {
    seccionEdicion.classList.add("d-none");
    btnEditar.style.display = "inline-block";
}



    