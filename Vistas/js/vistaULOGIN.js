let productos = [];
let idProductoCounter = 1;
let categorias = [];
let idCategoriaCounter = 1;

function redirectToUserViewINICIO() {
    window.location.href = "login.html";
}
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
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="login.html"
                                    onclick="addToCart('${prod.nombre}', ${prod.precio})">Añadir</a></div>
                        </div>
                    </div>
                </div>
        `;
        divContent.appendChild(fila);
    });
}