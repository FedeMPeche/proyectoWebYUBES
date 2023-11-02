`use strict`;

function scrollToPage(pageNumber) {
  const page = document.getElementById(`page${pageNumber}`);
  page.scrollIntoView({ behavior: "smooth" });
}

//------------------SEGURIDAD---------------------
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje").value;

    // Realiza una solicitud de verificación al servidor antes de enviar el formulario
    grecaptcha.ready(function () {
      grecaptcha.execute("6LdjeOYoAAAAAN3lH1tcA0PBRtFwvfN3Ub9PbF1r", { action: "submit" }).then((recaptchaToken) => {
        verifyRecaptcha(recaptchaToken)
          .then((recaptchaData) => {
            if (recaptchaData.success) {
              // Envía el formulario al servidor para procesarlo
              sendFormDataToServer(nombre, email, telefono, mensaje);
            } else {
              alert("Error de verificación de reCAPTCHA. Por favor, inténtalo de nuevo.");
            }
          })
          .catch((error) => {
            console.error("Error al verificar reCAPTCHA:", error);
          });
      });
    });
  });

  async function verifyRecaptcha(recaptchaToken) {
    const url = "https://www.google.com/recaptcha/api/siteverify";
    const data = {
      secret: "6LdjeOYoAAAAAE6Sv63qqL-NwNDgFe8DrvVgtned", // Reemplaza con tu clave secreta
      response: recaptchaToken,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    });
    return await response.json();
  }

  function sendFormDataToServer(nombre, email, telefono, mensaje) {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("email", email);
    formData.append("telefono", telefono);
    formData.append("mensaje", mensaje);

    fetch("/procesar_formulario.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // El servidor procesó los datos con éxito
          alert("¡Mensaje enviado con éxito! Pronto nos pondremos en contacto, muchas gracias. YUBES.");
        } else {
          // Hubo un error en el servidor
          alert("Error al procesar el formulario en el servidor.");
        }
      })
      .catch((error) => {
        console.error("Error al enviar el formulario al servidor:", error);
      });
  }
});


// ---------------- AUDIO PLAYER -------------------------------------

const audioFiles = [
  '/audio/Bailando.mp3',
  '/audio/De Reojo.wav',
  '/audio/El Espectador.mp3',
  '/audio/En el Fondo del Bar.mp3',
  '/audio/Es Tarde.wav',
  '/audio/La Maquina del Tiempo.wav',
  '/audio/LLevame.mp3',
  '/audio/Loveland.wav',
  '/audio/Meditare.wav',
  '/audio/Naufragio.wav',
  '/audio/No Pares de Brillar.mp3',
  '/audio/Pecho Frío.mp3',
  '/audio/Portuguesa.wav',
  '/audio/Robotizado.mp3',
  '/audio/Rutero.wav',
  '/audio/Sueños.mp3',
  '/audio/Toxicar.wav',
  '/audio/Vendedor de Ilusiones.wav',
];

let audio;
let currentSongIndex = 0;

document.getElementById("playButton").addEventListener("click", function() {
  if (!audio) {
    audio = createAudioElements();
    audio.play();
    document.getElementById("playButton");
  } else {
    audio.play();
  }
});

document.getElementById("pauseButton").addEventListener("click", function() {
  if (audio) {
    audio.pause();
  }
});

document.getElementById("previousButton").addEventListener("click", function() {
  currentSongIndex = (currentSongIndex - 1 + audioFiles.length) % audioFiles.length;
  playSong();
});

document.getElementById("nextButton").addEventListener("click", function() {
  currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
  playSong();
});

function createAudioElements() {
  const audio = new Audio(audioFiles[currentSongIndex]);
  audio.preload = "auto";
  audio.addEventListener('ended', function() {
    currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
    playSong();
  });
  return audio;
}

const songTitles = [
  'Bailando entre las nubes',
  'De Reojo',
  'El Espectador',
  'En el Fondo del Bar',
  'Es Tarde',
  'La Maquina del Tiempo',
  'LLevame',
  'Loveland',
  'Meditare',
  'Naufragio',
  'No Pares de Brillar',
  'Pecho Frío',
  'Portuguesa',
  'Robotizado',
  'Rutero',
  'Sueños',
  'Toxicar',
  'Vendedor de Ilusiones',
];

const playerTitle = document.getElementById('player-title');
const songInfo = document.getElementById('song-info');
const songTitle = document.getElementById('song-title');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const titleWidth = songTitle.clientWidth; 

document.documentElement.style.setProperty('--title-width', `${titleWidth}px`); //

playButton.addEventListener('click', function() {
  playerTitle.style.display = 'none';
  const currentSongTitle = "Bailando entre las nubes";
  songTitle.textContent = currentSongTitle;
  songInfo.style.opacity = 1;
  playSong();
});

pauseButton.addEventListener('click', function() {
  songInfo.style.opacity = 1;
  pauseSong();
});

previousButton.addEventListener('click', function() {
  currentSongIndex = (currentSongIndex - 1 + audioFiles.length) % audioFiles.length;
  playSong();
});

nextButton.addEventListener('click', function() {
  currentSongIndex = (currentSongIndex + 1) % audioFiles.length;
  playSong();
});

function playSong() {
  if (audio) {
    audio.pause();
  }
  audio = createAudioElements();
  songTitle.textContent = songTitles[currentSongIndex];
  songInfo.style.opacity = 1;
  audio.play();
}

function pauseSong() {
  if (audio) {
    audio.pause();
  }
  songInfo.style.opacity = 1;
}

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







