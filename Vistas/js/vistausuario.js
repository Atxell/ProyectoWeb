/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
let productos = [];
let idProductoCounter = 1;
let categorias = [];
let idCategoriaCounter = 1;

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    const cartItemsList = document.getElementById('cartItems');

    // Eliminar la fila "No hay productos en el carrito" si existe
    const emptyRow = document.querySelector('#cartItems .empty');
    if (emptyRow) {
        cartItemsList.removeChild(emptyRow);
    }

    // Crear una nueva fila para el producto agregado
    const newRow = document.createElement('tr');
    const productCell = document.createElement('td');
    const priceCell = document.createElement('td');
    const actionCell = document.createElement('td');

    // Rellenar las celdas con los datos del producto
    productCell.textContent = productName;
    priceCell.textContent = `$${productPrice}`;

    // Crear el botón "Borrar" y agregarlo a la celda
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
    deleteButton.onclick = function () {
        // Eliminar la fila cuando se hace clic en "Borrar"
        cartItemsList.removeChild(newRow);
        updateCartCount();
        updateTotalPrice();

        // Si el carrito está vacío, mostrar la fila "No hay productos en el carrito"
        if (cartItemsList.children.length === 0) {
            showEmptyCartMessage();
        }
    };

    actionCell.appendChild(deleteButton);

    // Añadir las celdas a la fila
    newRow.appendChild(productCell);
    newRow.appendChild(priceCell);
    newRow.appendChild(actionCell);

    // Añadir la nueva fila a la tabla
    cartItemsList.appendChild(newRow);

    // Actualizar el contador de productos
    updateCartCount();
    updateTotalPrice();
}

// Función para mostrar la fila "No hay productos en el carrito"
function showEmptyCartMessage() {
    const cartItemsList = document.getElementById('cartItems');
    const emptyRow = document.createElement('tr');
    emptyRow.classList.add('empty'); // Identificador para la fila vacía
    const emptyCell = document.createElement('td');
    emptyCell.colSpan = 3; // La celda ocupa las 3 columnas
    emptyCell.textContent = 'No hay productos en el carrito.';
    emptyRow.appendChild(emptyCell);
    cartItemsList.appendChild(emptyRow);
    updateTotalPrice();
}

// Función para actualizar el contador de productos en el carrito
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsList = document.getElementById('cartItems');
    const totalItems = Array.from(cartItemsList.children).filter(
        (row) => !row.classList.contains('empty')
    ).length; // Excluir la fila vacía del conteo
    cartCount.textContent = totalItems;
}

// Mostrar el mensaje vacío al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    showEmptyCartMessage();
});

function updateTotalPrice() {
    const cartItemsList = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    let total = 0;

    // Sumar los precios de todos los productos
    Array.from(cartItemsList.children).forEach((row) => {
        if (!row.classList.contains('empty')) {
            const priceCell = row.children[1];
            const price = parseFloat(priceCell.textContent.replace('$', ''));
            total += price;
        }
    });

    // Mostrar el total formateado
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}


function openPaymentModal() {
    // Cerrar el modal actual (Carrito de Compras)
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();

    // Abrir el nuevo modal (Información de Pago)
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    paymentModal.show();
}

 // Seleccionar método de pago
function selectPaymentMethod(element) {
    // Remover selección de otras opciones
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Agregar clase 'selected' al método seleccionado
    element.classList.add('selected');
}

// Validación básica para entrada de datos
document.getElementById('cardNumber').addEventListener('input', function (e) {
    const input = e.target;
    input.value = input.value.replace(/\D/g, ''); // Permitir solo números
});

document.getElementById('cardExpiryMonth').addEventListener('input', function (e) {
    const input = e.target;
    input.value = input.value.replace(/\D/g, ''); // Permitir solo números
    if (input.value.length > 2) input.value = input.value.slice(0, 2); // Limitar a 2 caracteres
});

document.getElementById('cardExpiryYear').addEventListener('input', function (e) {
    const input = e.target;
    input.value = input.value.replace(/\D/g, ''); // Permitir solo números
    if (input.value.length > 2) input.value = input.value.slice(0, 2); // Limitar a 2 caracteres
});

document.getElementById('cardCVV').addEventListener('input', function (e) {
    const input = e.target;
    input.value = input.value.replace(/\D/g, ''); // Permitir solo números
    if (input.value.length > 3) input.value = input.value.slice(0, 3); // Limitar a 3 caracteres
});

function buscarContenido() {
    const input = document.getElementById("buscar-productos").value.toLowerCase();
    const contenedores = document.querySelectorAll(".contenedor");

    contenedores.forEach(function (contenedor) {
        const nombre = contenedor.getAttribute("data-name").toLowerCase();
        if (nombre.includes(input)) {
            contenedor.style.display = "";
        } else {
            contenedor.style.display = "none";
        }
    });
}
function showSuccessMessage() {
    // Cerrar el modal de pago
    const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    paymentModal.hide();

    // Mostrar el modal de éxito
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();

    // Opcional: Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
        successModal.hide();
    }, 3000);
}

function redirectToUserViewPerfil(event) {
    // Prevenir la acción predeterminada del enlace
    event.preventDefault();

    // Redirigir al usuario a la página "Perfil.html"
    window.location.href = "Perfil.html";  // Asegúrate de que "Perfil.html" esté en la ruta correcta
}
function redirectToUserViewINICIO() {
    window.location.href = "login.html";
}





  //traer productos
  async function traerProductos(){
    try {
      const response = await fetch("http://localhost:3000/producto/llenar");
      const Rproductos = await response.json();
      console.log(JSON.stringify(Rproductos));
  
      Rproductos.forEach(prod => {
        const nombre=prod.nombredelproducto;
        const cantidad=prod.cantidad;
        const precio=prod.precio;
        const idcategoria=prod.idcategoria;
        productos.push({
            id: idProductoCounter++,
            nombre,
            cantidad,
            precio,
            idcategoria
        });
      });
      llenarProductos();
      console.log(JSON.stringify(productos));
    } catch (error) {
      console.error('Error al llenar el div:', error);
    }
  }



//llenar productos

function llenarProductos() {
    const divContent = document.getElementById("contenedor-producto");
    divContent.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos productos

    productos.forEach(prod => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <div class="col mb-5">
                    <div class="card h-100">
                        <!-- Product image-->
                        <img class="card-img-top"
                            src="https://www.tienda.sublimaciondrcperu.com/wp-content/uploads/2020/02/sublimacion-aluminio-placas-09.jpg"
                            alt="..." />
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">${prod.nombre}</h5>
                                <!-- Product price-->
                                ${prod.precio}
                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto"
                                    onclick="addToCart('${prod.nombre}', ${prod.precio})">Añadir</a></div>
                        </div>
                    </div>
                </div>
        `;
        divContent.appendChild(fila);
    });
}