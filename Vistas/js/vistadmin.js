<<<<<<< HEAD
let productos = [];
let idProductoCounter = 1;
let categorias = [];
let carrusel = [];
let idCategoriaCounter = 1;
let idCarruselCounter = 1;

// Función para agregar productos
function agregarProducto() {
    const nombre = document.getElementById("nombre-producto").value;
    const cantidad = document.getElementById("cantidad-producto").value;
    const precio = document.getElementById("precio-producto").value;
    const imagen = document.getElementById("imagen-producto").files[0];

    if (nombre && cantidad && precio && imagen) {
        const reader = new FileReader();
        reader.onload = function (e) {
            productos.push({
                id: idProductoCounter++,
                nombre,
                cantidad,
                precio,
                imagen: e.target.result, // Convertimos la imagen a base64
            });
            mostrarProductos();
            limpiarCampos(); // Limpiar los campos después de agregar
        };
        reader.readAsDataURL(imagen); // Leer la imagen como URL
    } else {
        alert("Completa todos los campos.");
    }
}

// Función para mostrar productos en la tabla
function mostrarProductos() {
    const tbody = document.getElementById("tabla-productos").querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos productos

    productos.forEach(prod => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.nombre}</td>
            <td>${prod.cantidad}</td>
            <td>${prod.precio}</td>
            <td><button class="btn btn-info btn-sm" onclick="verImagen('${prod.imagen}')">Ver Imagen</button></td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProducto(${prod.id})">Modificar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${prod.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para editar un producto
function editarProducto(id) {
    const producto = productos.find(prod => prod.id === id);

    if (producto) {
        document.getElementById("edit-nombre-producto").value = producto.nombre;
        document.getElementById("edit-cantidad-producto").value = producto.cantidad;
        document.getElementById("edit-precio-producto").value = producto.precio;
        document.getElementById("editarProductoModal").setAttribute("data-id", id);

        const modal = new bootstrap.Modal(document.getElementById("editarProductoModal"));
        modal.show();
    }
}

// Función para guardar los cambios de edición
function guardarEdicion() {
    const id = parseInt(document.getElementById("editarProductoModal").getAttribute("data-id"));
    const producto = productos.find(prod => prod.id === id);

    if (producto) {
        producto.nombre = document.getElementById("edit-nombre-producto").value;
        producto.cantidad = document.getElementById("edit-cantidad-producto").value;
        producto.precio = document.getElementById("edit-precio-producto").value;

        const nuevaImagen = document.getElementById("edit-imagen-producto").files[0];
        if (nuevaImagen) {
            const reader = new FileReader();
            reader.onload = function (e) {
                producto.imagen = e.target.result;
                mostrarProductos(); // Actualizar tabla después de modificar
            };
            reader.readAsDataURL(nuevaImagen);
        } else {
            mostrarProductos(); // Actualizar solo si no hay nueva imagen
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById("editarProductoModal"));
        modal.hide();
    }
}

// Función para eliminar un producto
function eliminarProducto(id) {
    productos = productos.filter(prod => prod.id !== id);
    mostrarProductos();
}

// Función para ver la imagen
function verImagen(imagen) {
    const imgWindow = window.open("", "Imagen", "width=600,height=400");
    imgWindow.document.write(`<img src="${imagen}" style="max-width:100%; max-height:100%;">`);
}

// Función para limpiar campos del formulario
function limpiarCampos() {
    document.getElementById("nombre-producto").value = "";
    document.getElementById("cantidad-producto").value = "";
    document.getElementById("precio-producto").value = "";
    document.getElementById("imagen-producto").value = "";
}

// Función para buscar en la tabla
function buscarEnTabla(idTabla, idInput) {
    const input = document.getElementById(idInput).value.toLowerCase();
    const tabla = document.getElementById(idTabla);
    const filas = tabla.getElementsByTagName("tr");

    for (let i = 1; i < filas.length; i++) { // Empieza en 1 para omitir encabezado
        const celdas = filas[i].getElementsByTagName("td");
        let coincide = false;

        for (let j = 0; j < celdas.length; j++) {
            if (celdas[j].textContent.toLowerCase().includes(input)) {
                coincide = true;
                break;
            }
        }

        filas[i].style.display = coincide ? "" : "none";
    }
}
// Función para agregar categorías
function agregarCategoria() {
    const nombre = document.getElementById("nombre-categoria").value;
    const descripcion = document.getElementById("descripcion-categoria").value;

    if (nombre && descripcion) {
        categorias.push({
            id: idCategoriaCounter++,
            nombre,
            descripcion,
        });
        mostrarCategorias();
        limpiarCamposCategoria();
    } else {
        alert("Completa todos los campos.");
    }
}

// Función para mostrar las categorías
function mostrarCategorias() {
    const tbody = document.getElementById("tabla-categorias").querySelector("tbody");
    tbody.innerHTML = "";
    categorias.forEach(cat => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${cat.id}</td>
            <td>${cat.nombre}</td>
            <td>${cat.descripcion}</td>
            <td><button class="btn btn-sm btn-warning" onclick="editarCategoria(${cat.id})">Modificar</button></td>
            <td><button class="btn btn-sm btn-danger" onclick="eliminarCategoria(${cat.id})">Eliminar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para abrir el modal de edición de categoría
function editarCategoria(id) {
    const categoria = categorias.find(cat => cat.id === id);

    document.getElementById("edit-nombre-categoria").value = categoria.nombre;
    document.getElementById("edit-descripcion-categoria").value = categoria.descripcion;
    document.getElementById("guardar-cambios-categoria").setAttribute("data-id", id);

    const modal = new bootstrap.Modal(document.getElementById('editarCategoriaModal'));
    modal.show();
}

// Función para guardar los cambios en la categoría
function guardarEdicionCategoria() {
    const id = parseInt(document.getElementById("guardar-cambios-categoria").getAttribute("data-id"));
    const categoria = categorias.find(cat => cat.id === id);

    categoria.nombre = document.getElementById("edit-nombre-categoria").value;
    categoria.descripcion = document.getElementById("edit-descripcion-categoria").value;

    mostrarCategorias();

    const modal = bootstrap.Modal.getInstance(document.getElementById('editarCategoriaModal'));
    modal.hide();
}

// Función para limpiar los campos de categoría
function limpiarCamposCategoria() {
    document.getElementById("nombre-categoria").value = "";
    document.getElementById("descripcion-categoria").value = "";
}


function eliminarCategoria(id) {
    categorias = categorias.filter(cat => cat.id !== id);
    mostrarCategorias();
}
// ---------------------- CARRUSEL ----------------------
// Función para agregar al carrusel
function agregarCarrusel() {
    const titulo = document.getElementById("titulo-carrusel").value;
    const descripcion = document.getElementById("descripcion-carrusel").value;
    const imagen = document.getElementById("imagen-carrusel").files[0];

    if (titulo && descripcion && imagen) {
        const reader = new FileReader();
        reader.onload = function (e) {
            carrusel.push({
                id: idCarruselCounter++,
                titulo,
                descripcion,
                imagen: e.target.result,
            });
            mostrarCarrusel();
            limpiarCamposCarrusel();
        };
        reader.readAsDataURL(imagen);
    } else {
        alert("Completa todos los campos.");
    }
}

// Función para mostrar el carrusel
function mostrarCarrusel() {
    const tbody = document.getElementById("tabla-carrusel").querySelector("tbody");
    tbody.innerHTML = "";
    carrusel.forEach(item => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.id}</td>
            <td>${item.titulo}</td>
            <td>${item.descripcion}</td>
            <td><button class="btn btn-sm btn-info" onclick="verImagen('${item.imagen}')">Ver Imagen</button></td>
            <td><button class="btn btn-sm btn-warning" onclick="editarCarrusel(${item.id})">Modificar</button></td>
            <td><button class="btn btn-sm btn-danger" onclick="eliminarCarrusel(${item.id})">Eliminar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para abrir el modal de edición del carrusel
function editarCarrusel(id) {
    const item = carrusel.find(car => car.id === id);

    document.getElementById("edit-titulo-carrusel").value = item.titulo;
    document.getElementById("edit-descripcion-carrusel").value = item.descripcion;
    document.getElementById("guardar-cambios-carrusel").setAttribute("data-id", id);

    const modal = new bootstrap.Modal(document.getElementById('editarCarruselModal'));
    modal.show();
}

function eliminarCarrusel(id) {
    carrusel = carrusel.filter(item => item.id !== id);
    mostrarCarrusel();
}

// Función para guardar los cambios en el carrusel
function guardarEdicionCarrusel() {
    const id = parseInt(document.getElementById("guardar-cambios-carrusel").getAttribute("data-id"));
    const item = carrusel.find(car => car.id === id);

    item.titulo = document.getElementById("edit-titulo-carrusel").value;
    item.descripcion = document.getElementById("edit-descripcion-carrusel").value;

    const imagen = document.getElementById("edit-imagen-carrusel").files[0];
    if (imagen) {
        const reader = new FileReader();
        reader.onload = function (e) {
            item.imagen = e.target.result;
            mostrarCarrusel();
        };
        reader.readAsDataURL(imagen);
    } else {
        mostrarCarrusel();
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('editarCarruselModal'));
    modal.hide();
}

// Función para limpiar los campos del carrusel
function limpiarCamposCarrusel() {
    document.getElementById("titulo-carrusel").value = "";
    document.getElementById("descripcion-carrusel").value = "";
    document.getElementById("imagen-carrusel").value = "";
}
=======
let productos = [];
let idProductoCounter = 1;
let categorias = [];
let carrusel = [];
let idCategoriaCounter = 1;
let idCarruselCounter = 1;

// Función para agregar productos
function agregarProducto() {
    const nombre = document.getElementById("nombre-producto").value;
    const cantidad = document.getElementById("cantidad-producto").value;
    const precio = document.getElementById("precio-producto").value;
    const imagen = document.getElementById("imagen-producto").files[0];

    if (nombre && cantidad && precio && imagen) {
        const reader = new FileReader();
        reader.onload = function (e) {
            productos.push({
                id: idProductoCounter++,
                nombre,
                cantidad,
                precio,
                imagen: e.target.result, // Convertimos la imagen a base64
            });
            mostrarProductos();
            limpiarCampos(); // Limpiar los campos después de agregar
        };
        reader.readAsDataURL(imagen); // Leer la imagen como URL
    } else {
        alert("Completa todos los campos.");
    }
}

// Función para mostrar productos en la tabla
function mostrarProductos() {
    const tbody = document.getElementById("tabla-productos").querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos productos

    productos.forEach(prod => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.nombre}</td>
            <td>${prod.cantidad}</td>
            <td>${prod.precio}</td>
            <td><button class="btn btn-info btn-sm" onclick="verImagen('${prod.imagen}')">Ver Imagen</button></td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProducto(${prod.id})">Modificar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${prod.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para editar un producto
function editarProducto(id) {
    const producto = productos.find(prod => prod.id === id);

    if (producto) {
        document.getElementById("edit-nombre-producto").value = producto.nombre;
        document.getElementById("edit-cantidad-producto").value = producto.cantidad;
        document.getElementById("edit-precio-producto").value = producto.precio;
        document.getElementById("editarProductoModal").setAttribute("data-id", id);

        const modal = new bootstrap.Modal(document.getElementById("editarProductoModal"));
        modal.show();
    }
}

// Función para guardar los cambios de edición
function guardarEdicion() {
    const id = parseInt(document.getElementById("editarProductoModal").getAttribute("data-id"));
    const producto = productos.find(prod => prod.id === id);

    if (producto) {
        producto.nombre = document.getElementById("edit-nombre-producto").value;
        producto.cantidad = document.getElementById("edit-cantidad-producto").value;
        producto.precio = document.getElementById("edit-precio-producto").value;

        const nuevaImagen = document.getElementById("edit-imagen-producto").files[0];
        if (nuevaImagen) {
            const reader = new FileReader();
            reader.onload = function (e) {
                producto.imagen = e.target.result;
                mostrarProductos(); // Actualizar tabla después de modificar
            };
            reader.readAsDataURL(nuevaImagen);
        } else {
            mostrarProductos(); // Actualizar solo si no hay nueva imagen
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById("editarProductoModal"));
        modal.hide();
    }
}

// Función para eliminar un producto
function eliminarProducto(id) {
    productos = productos.filter(prod => prod.id !== id);
    mostrarProductos();
}

// Función para ver la imagen
function verImagen(imagen) {
    const imgWindow = window.open("", "Imagen", "width=600,height=400");
    imgWindow.document.write(`<img src="${imagen}" style="max-width:100%; max-height:100%;">`);
}

// Función para limpiar campos del formulario
function limpiarCampos() {
    document.getElementById("nombre-producto").value = "";
    document.getElementById("cantidad-producto").value = "";
    document.getElementById("precio-producto").value = "";
    document.getElementById("imagen-producto").value = "";
}

// Función para buscar en la tabla
function buscarEnTabla(idTabla, idInput) {
    const input = document.getElementById(idInput).value.toLowerCase();
    const tabla = document.getElementById(idTabla);
    const filas = tabla.getElementsByTagName("tr");

    for (let i = 1; i < filas.length; i++) { // Empieza en 1 para omitir encabezado
        const celdas = filas[i].getElementsByTagName("td");
        let coincide = false;

        for (let j = 0; j < celdas.length; j++) {
            if (celdas[j].textContent.toLowerCase().includes(input)) {
                coincide = true;
                break;
            }
        }

        filas[i].style.display = coincide ? "" : "none";
    }
}
// Función para agregar categorías
function agregarCategoria() {
    const nombre = document.getElementById("nombre-categoria").value;
    const descripcion = document.getElementById("descripcion-categoria").value;

    if (nombre && descripcion) {
        categorias.push({
            id: idCategoriaCounter++,
            nombre,
            descripcion,
        });
        mostrarCategorias();
        limpiarCamposCategoria();
    } else {
        alert("Completa todos los campos.");
    }
}

// Función para mostrar las categorías
function mostrarCategorias() {
    const tbody = document.getElementById("tabla-categorias").querySelector("tbody");
    tbody.innerHTML = "";
    categorias.forEach(cat => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${cat.id}</td>
            <td>${cat.nombre}</td>
            <td>${cat.descripcion}</td>
            <td><button class="btn btn-sm btn-warning" onclick="editarCategoria(${cat.id})">Modificar</button></td>
            <td><button class="btn btn-sm btn-danger" onclick="eliminarCategoria(${cat.id})">Eliminar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para abrir el modal de edición de categoría
function editarCategoria(id) {
    const categoria = categorias.find(cat => cat.id === id);

    document.getElementById("edit-nombre-categoria").value = categoria.nombre;
    document.getElementById("edit-descripcion-categoria").value = categoria.descripcion;
    document.getElementById("guardar-cambios-categoria").setAttribute("data-id", id);

    const modal = new bootstrap.Modal(document.getElementById('editarCategoriaModal'));
    modal.show();
}

// Función para guardar los cambios en la categoría
function guardarEdicionCategoria() {
    const id = parseInt(document.getElementById("guardar-cambios-categoria").getAttribute("data-id"));
    const categoria = categorias.find(cat => cat.id === id);

    categoria.nombre = document.getElementById("edit-nombre-categoria").value;
    categoria.descripcion = document.getElementById("edit-descripcion-categoria").value;

    mostrarCategorias();

    const modal = bootstrap.Modal.getInstance(document.getElementById('editarCategoriaModal'));
    modal.hide();
}

// Función para limpiar los campos de categoría
function limpiarCamposCategoria() {
    document.getElementById("nombre-categoria").value = "";
    document.getElementById("descripcion-categoria").value = "";
}


function eliminarCategoria(id) {
    categorias = categorias.filter(cat => cat.id !== id);
    mostrarCategorias();
}
// ---------------------- CARRUSEL ----------------------
// Función para agregar al carrusel
function agregarCarrusel() {
    const titulo = document.getElementById("titulo-carrusel").value;
    const descripcion = document.getElementById("descripcion-carrusel").value;
    const imagen = document.getElementById("imagen-carrusel").files[0];

    if (titulo && descripcion && imagen) {
        const reader = new FileReader();
        reader.onload = function (e) {
            carrusel.push({
                id: idCarruselCounter++,
                titulo,
                descripcion,
                imagen: e.target.result,
            });
            mostrarCarrusel();
            limpiarCamposCarrusel();
        };
        reader.readAsDataURL(imagen);
    } else {
        alert("Completa todos los campos.");
    }
}

// Función para mostrar el carrusel
function mostrarCarrusel() {
    const tbody = document.getElementById("tabla-carrusel").querySelector("tbody");
    tbody.innerHTML = "";
    carrusel.forEach(item => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.id}</td>
            <td>${item.titulo}</td>
            <td>${item.descripcion}</td>
            <td><button class="btn btn-sm btn-info" onclick="verImagen('${item.imagen}')">Ver Imagen</button></td>
            <td><button class="btn btn-sm btn-warning" onclick="editarCarrusel(${item.id})">Modificar</button></td>
            <td><button class="btn btn-sm btn-danger" onclick="eliminarCarrusel(${item.id})">Eliminar</button></td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para abrir el modal de edición del carrusel
function editarCarrusel(id) {
    const item = carrusel.find(car => car.id === id);

    document.getElementById("edit-titulo-carrusel").value = item.titulo;
    document.getElementById("edit-descripcion-carrusel").value = item.descripcion;
    document.getElementById("guardar-cambios-carrusel").setAttribute("data-id", id);

    const modal = new bootstrap.Modal(document.getElementById('editarCarruselModal'));
    modal.show();
}

function eliminarCarrusel(id) {
    carrusel = carrusel.filter(item => item.id !== id);
    mostrarCarrusel();
}

// Función para guardar los cambios en el carrusel
function guardarEdicionCarrusel() {
    const id = parseInt(document.getElementById("guardar-cambios-carrusel").getAttribute("data-id"));
    const item = carrusel.find(car => car.id === id);

    item.titulo = document.getElementById("edit-titulo-carrusel").value;
    item.descripcion = document.getElementById("edit-descripcion-carrusel").value;

    const imagen = document.getElementById("edit-imagen-carrusel").files[0];
    if (imagen) {
        const reader = new FileReader();
        reader.onload = function (e) {
            item.imagen = e.target.result;
            mostrarCarrusel();
        };
        reader.readAsDataURL(imagen);
    } else {
        mostrarCarrusel();
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('editarCarruselModal'));
    modal.hide();
}

// Función para limpiar los campos del carrusel
function limpiarCamposCarrusel() {
    document.getElementById("titulo-carrusel").value = "";
    document.getElementById("descripcion-carrusel").value = "";
    document.getElementById("imagen-carrusel").value = "";
}
function redirectToUserViewINICIO() {
    window.location.href = "login.html";
}
>>>>>>> b57f005c3f5d865b4e04c660082ed906d6b8aea4
