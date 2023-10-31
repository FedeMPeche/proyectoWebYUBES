`use strict`;

function scrollToPage(pageNumber) {
  const page = document.getElementById(`page${pageNumber}`);
  page.scrollIntoView({ behavior: "smooth" });
}

//------------------SEGURIDAD---------------------

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formularioContacto');
  
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío normal del formulario

    // Realiza tu validación personalizada aquí si es necesario

    // Verifica si grecaptcha está definido antes de ejecutar grecaptcha.execute()
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.execute();
    } else {
      console.error('Error: grecaptcha no está definido. Asegúrate de que el script de reCAPTCHA se haya cargado correctamente.');
    }

    // Luego de ejecutar reCAPTCHA, puedes realizar la solicitud POST
    const formData = new FormData(form);
    fetch('procesarFormulario.php', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        // Muestra la respuesta del servidor al usuario
        alert(data.message);
        form.reset();
      })
      .catch(error => {
        console.error(error);
        alert('Ocurrió un error al procesar el formulario. Inténtalo de nuevo más tarde.');
      });
  });
});




// Función para alternar el estado de silencio del video y el ícono del botón
// function toggleMute() {
//   var video = document.getElementById("background-video");
//   var muteButton = document.getElementById("mute-button");
//   if (video.muted) {
//     video.muted = false;
//     muteButton.innerHTML = '<i class="bi bi-mic"></i>';
//   } else {
//     video.muted = true;
//     muteButton.innerHTML = '<i class="bi bi-mic-mute"></i>';
//   }
// }

// Obtén todas las tarjetas
const tarjetas = document.querySelectorAll('.tarjetas');

// Agrega un evento de clic a cada tarjeta
tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
        // Alternar la clase 'expandida' en la tarjeta actual
        tarjeta.classList.toggle('expandida');
        // Obtener todas las tarjetas excepto la actual
        const otrasTarjetas = Array.from(tarjetas).filter((t) => t !== tarjeta);
        // Quitar la clase 'expandida' de las otras tarjetas
        otrasTarjetas.forEach((otraTarjeta) => {
            otraTarjeta.classList.remove('expandida');
        });
    });
});






