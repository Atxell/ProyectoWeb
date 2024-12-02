document.addEventListener('DOMContentLoaded', () => {
    async function redirectToUserViewINICIO() {
        const datos = {
            username: document.getElementById('username').value,
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            direccion: document.getElementById('direccion').value,
            pais: document.getElementById('pais').value,
            estado: document.getElementById('estado').value,
            ciudad: document.getElementById('ciudad').value,
            codigoPostal: document.getElementById('codigoPostal').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                window.location.href = './login.html';
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (err) {
            console.error('Error al enviar datos:', err);
        }
    }

    // Asigna el evento al botón
    document.getElementById('registerButton').addEventListener('click', redirectToUserViewINICIO);
});
