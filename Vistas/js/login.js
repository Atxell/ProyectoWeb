

async function redirectToUserViewSesion() {
    const correoelectronico = document.getElementById("floatingInput").value;
    const contraseña = document.getElementById("floatingPassword").value;

    console.log("Datos enviados al servidor:", { correoelectronico, contraseña });

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correoelectronico, contraseña }),
    });
  
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Guarda el token en el almacenamiento local
      alert(`Bienvenido, ${data.nombre}`);
      // Redirigir al dashboard o vista principal
      if(data.rol=="admin"){
        window.location.href = "./vistaadmin.html";
      }
      else{
        window.location.href = "./vistausuario.html";
      }
    } else {
      const error = await response.json();
      alert(error.message);
    }
    
  }
  

    function redirectToUserViewRegitros() {
        
    }


    /*
async function llenarCategoria(){

  const response = await fetch("http://localhost:3000/categoria/llenar", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const options = await response.json();
  alert(options.stringify);

  // Get the dropdown element
  const dropdown = document.getElementById('categoria-producto');
        
  // Clear existing options
  dropdown.innerHTML = '';

  options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option.categoria; // Value for submission
      opt.innerHTML = option.categoria; // Display text
      dropdown.appendChild(opt); // Append to dropdown
  });

}
  */



