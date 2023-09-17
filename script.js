`use strict`;

// const audioPlayer = document.getElementById('audio-player');

// audioPlayer.addEventListener('play', () => {
//   console.log('Reproduciendo música...');
//   // Puedes agregar aquí cualquier otra lógica que desees ejecutar al reproducir.
// });

// audioPlayer.addEventListener('pause', () => {
//   console.log('Música en pausa...');
//   // Puedes agregar aquí cualquier otra lógica que desees ejecutar al pausar.
// });

// audioPlayer.addEventListener('ended', () => {
//   console.log('Música terminada...');
//   // Puedes agregar aquí cualquier otra lógica que desees ejecutar al finalizar la canción.
// });

// const playPauseButton = document.getElementById('play-pause-button');
// const prevButton = document.getElementById('prev-button');
// const nextButton = document.getElementById('next-button');

// let currentSongIndex = 0;
// const songs = ['/Bailando.wav', '/El Espectador.wav', '/En el Fondo del Bar.wav', '/LLevame.wav', '/No Pares de Brillar.wav', '/Pecho Frío.wav', '/Robotisado.wav', '/Sueños.wav'];

// function playPause() {
//   if (audioPlayer.paused) {
//     audioPlayer.play();
//     playPauseButton.textContent = 'Pausa';
//   } else {
//     audioPlayer.pause();
//     playPauseButton.textContent = 'Reproducir';
//   }
// }

// function playNext() {
//   currentSongIndex = (currentSongIndex + 1) % songs.length;
//   audioPlayer.src = songs[currentSongIndex];
//   audioPlayer.play();
// }

// function playPrev() {
//   currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
//   audioPlayer.src = songs[currentSongIndex];
//   audioPlayer.play();
// }

// playPauseButton.addEventListener('click', playPause);
// nextButton.addEventListener('click', playNext);
// prevButton.addEventListener('click', playPrev);

$(document).ready(function() {
  $('a[href^="#"]').click(function() {
    var destino = $(this.hash); //this.hash lee el atributo href de este
    $('html, body').animate({ scrollTop: destino.offset().top }, 700); //Llega a su destino con el tiempo deseado
    return false;
  });
});

function scrollToPage(pageNumber) {
  const page = document.getElementById(`page${pageNumber}`);
  page.scrollIntoView({ behavior: "smooth" });
}

// Función para alternar el estado de silencio del video y el ícono del botón
function toggleMute() {
  var video = document.getElementById("background-video");
  var muteButton = document.getElementById("mute-button");
  if (video.muted) {
    video.muted = false;
    muteButton.innerHTML = '<i class="bi bi-mic"></i>';
  } else {
    video.muted = true;
    muteButton.innerHTML = '<i class="bi bi-mic-mute"></i>';
  }
}

//------------------SEGURIDAD---------------------

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form'); // Selecciona el formulario

  // Agrega un evento al formulario cuando se envía
  form.addEventListener('submit', function (event) {
    // Evita que el formulario se envíe automáticamente
    event.preventDefault();

    // Obtiene los valores de los campos de entrada
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;

    // Realiza la validación de entrada aquí
    if (nombre === '' || email === '' || telefono === '' || mensaje === '') {
      alert('Todos los campos son obligatorios. Por favor, completa el formulario.');
    } else {
      
      alert('Mensaje enviado correctamente');

      form.reset();
    }
  });
});