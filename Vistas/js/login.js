

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
      window.location.href = "/home.html";
    } else {
      const error = await response.json();
      alert(error.message);
    }
  }
  

    function redirectToUserViewRegitros() {
        window.location.href = "registro.html";
    }

