async function redirectToUserViewINICIO() {
    const usuario = {
        username: document.querySelector('input[placeholder="Nombre de usuario"]').value,
        nombres: document.querySelector('input[placeholder="Nombre(s)"]').value,
        apellidos: document.querySelector('input[placeholder="Apellidos"]').value,
        email: document.querySelector('input[placeholder="Correo electronico"]').value + "@gmail.com",
        password: document.querySelector('input[placeholder="Contraseña"]').value,
        confirmPassword: document.querySelector('input[placeholder="Confirmar contraseña"]').value,
        direccion: {
            calle: document.querySelector('input[placeholder="Calle"]').value,
            numero: document.querySelector('input[placeholder="Número exterior"]').value,
            colonia: document.querySelector('input[placeholder="Colonia"]').value,
            pais: document.querySelector('select[aria-label="Default select example"]').value,
            estado: document.querySelectorAll('select[aria-label="Default select example"]')[1].value,
            ciudad: document.querySelectorAll('select[aria-label="Default select example"]')[2].value,
            codigoPostal: document.querySelector('input[placeholder="Código Postal"]').value,
        },
    };

    const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Guarda el token en el almacenamiento local
      alert(`Bienvenido, ${data.nombre}`);
      // Redirigir al dashboard o vista principal
      window.location.href = "registro.html";
    } else {
      const error = await response.json();
      alert(error.message);
    }
  }