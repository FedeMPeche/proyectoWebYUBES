`use strict`;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#formularioContacto").addEventListener("submit", function (event){
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const mensaje = document.getElementById("mensaje").value;

    // Realiza una solicitud de verificación al servidor antes de enviar el formulario
    grecaptcha.ready(function () {
      grecaptcha.execute("6Ld8FuooAAAAAK1ceZUVisI8Bi-TaCSQU91-mYgk", { action: "submit" }).then((recaptchaToken) => {
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
      secret: "6Ld8FuooAAAAAJmCtPE3a71k1-8Px88-vXdqTZcR", // Reemplaza con tu clave secreta
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
  '/audio/ElEspectador.mp3',
  '/audio/EnelFondodelBar.mp3',
  '/audio/LLevame.mp3',
  '/audio/NoParesdeBrillar.mp3',
  '/audio/PechoFrio.mp3',
  '/audio/Robotizado.mp3',
  '/audio/Sueños.mp3',
  '/audio/Meditare.mp3',
  '/audio/Rutero.mp3',
  '/audio/Naufragio.mp3',
  '/audio/LaMaquinadelTiempo.mp3',
  '/audio/VendedordeIlusiones.mp3',
  '/audio/Loveland.mp3',
  '/audio/Toxicar.mp3',
  '/audio/DeReojo.mp3',
  '/audio/Portuguesa.mp3',
  '/audio/EsTarde.mp3',
];

let audio;
let currentSongIndex = 0;
let isPaused = false;
let audioPosition = 0;

const playerTitle = document.getElementById('player-title');
const songInfo = document.getElementById('song-info');
const songTitle = document.getElementById('song-title');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');
const titleWidth = songTitle.clientWidth;


document.getElementById("playButton").addEventListener("click", function() {
  if (!audio) {
    playerTitle.style.display = 'none';
    songTitle.textContent = songTitles[currentSongIndex];
    songInfo.style.opacity = 1;
    audio = createAudioElements();
  }
  if (isPaused) {
    isPaused = false;
  }
  audio.play();
});

document.getElementById("pauseButton").addEventListener("click", function() {
  if (audio) {
    audio.pause();
    isPaused = true;
    audioPosition = audio.currentTime;
  }
});

document.getElementById("previousButton").addEventListener("click", function() {
  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = audioFiles.length - 1;
  }
  playSong();
});

document.getElementById("nextButton").addEventListener("click", function() {
  if (currentSongIndex < audioFiles.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }
  playSong();
});

function createAudioElements() {
  const audio = new Audio(audioFiles[currentSongIndex]);
  audio.preload = "auto";
  return audio;
}

const songTitles = [
  '[LADO A] 01- Bailando entre las nubes',
  '[LADO A] 02- El espectador',
  '[LADO A] 03- En el fondo del bar',
  '[LADO A] 04- LLevame',
  '[LADO A] 05- No pares de brillar',
  '[LADO A] 06- Pecho frio',
  '[LADO A] 07- Robotizado',
  '[LADO A] 08- Sueños',
  '[LADO B] 01- Meditare',
  '[LADO B] 02- Rutero',
  '[LADO B] 03- Naufragio',
  '[LADO B] 04- La maquina del tiempo',
  '[LADO B] 05- Vendedor de ilusiones',
  '[LADO B] 06- Loveland',
  '[LADO B] 07- Toxicar',
  '[LADO B] 08- De reojo',
  '[LADO B] 09- Portuguesa',
  '[LADO B] 10- Es tarde',
];

document.documentElement.style.setProperty('--title-width', `${titleWidth}px`); //

function playSong() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audioPosition = 0;
  }
  audio = createAudioElements();
  songTitle.textContent = songTitles[currentSongIndex];
  songInfo.style.opacity = 1;
  audio.play();
}

function pauseSong() {
  if (audio) {
    audio.pause();
    isPaused = true;
  }
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







