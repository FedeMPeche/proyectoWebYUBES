`use strict`;
// FORMULARIO DE CONTACTO


// ---------------- AUDIO PLAYER -------------------------------------

const audioFiles = [
  'audio/Bailando.mp3',
  'audio/ElEspectador.mp3',
  'audio/Robotizado.mp3',
  'audio/NoParesdeBrillar.mp3',
  'audio/LLevame.mp3',
  'audio/PechoFrio.mp3',
  'audio/Sueños.mp3',
  'audio/EnelFondodelBar.mp3',
  'audio/Meditare.mp3',
  'audio/DeReojo.mp3',
  'audio/Toxicar.mp3',
  'audio/LaMaquinadelTiempo.mp3',
  'audio/Loveland.mp3',
  'audio/VendedordeIlusiones.mp3',
  'audio/Rutero.mp3',
  'audio/Portuguesa.mp3',
  'audio/Naufragio.mp3',
  'audio/EsTarde.mp3',
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
  playButton.style.backgroundImage = 'url("/img/player-play2.png")';
  nextButton.style.backgroundImage = 'url("/img/player-track-next3.png")';
  pauseButton.style.backgroundImage = 'url("/img/player-pause3.png")';
  previousButton.style.backgroundImage = 'url("/img/player-track-prev3.png")';


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
  pauseButton.style.backgroundImage = 'url("/img/player-pause2.png")';
  nextButton.style.backgroundImage = 'url("/img/player-track-next3.png")';
  playButton.style.backgroundImage = 'url("/img/player-play3.png")';
  previousButton.style.backgroundImage = 'url("/img/player-track-prev3.png")';

  if (audio) {
    audio.pause();
    isPaused = true;
    audioPosition = audio.currentTime;
  }
});

document.getElementById("previousButton").addEventListener("click", function() {
  previousButton.style.backgroundImage = 'url("/img/player-prev2.png")';
  pauseButton.style.backgroundImage = 'url("/img/player-pause3.png")';
  nextButton.style.backgroundImage = 'url("/img/player-track-next3.png")';
  playButton.style.backgroundImage = 'url("/img/player-play3.png")';


  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = audioFiles.length - 1;
  }
  playSong();
});

document.getElementById("nextButton").addEventListener("click", function() {
  nextButton.style.backgroundImage = 'url("/img/player-next2.png")';
  playButton.style.backgroundImage = 'url("/img/player-play3.png")';
  pauseButton.style.backgroundImage = 'url("/img/player-pause3.png")';
  previousButton.style.backgroundImage = 'url("/img/player-track-prev3.png")';




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
  '[LADO A] 03- Robotizado',
  '[LADO A] 04- No pares de brillar',
  '[LADO A] 05- Llevame',
  '[LADO A] 06- Pecho frio',
  '[LADO A] 07- Sueños',
  '[LADO A] 08- En el fondo del bar',
  '[LADO B] 01- Meditare',
  '[LADO B] 02- De reojo',
  '[LADO B] 03- Toxicar',
  '[LADO B] 04- La maquina del tiempo',
  '[LADO B] 05- Loveland',
  '[LADO B] 06- Vendedor de ilusiones',
  '[LADO B] 07- Rutero',
  '[LADO B] 08- Portuguesa',
  '[LADO B] 09- Naufragio',
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


const buttons = document.querySelectorAll("#audio-controls button");
buttons.forEach(button => {
  button.addEventListener("click", () => {
   
    button.classList.add("button-clicked");

    setTimeout(() => {
      button.classList.remove("button-clicked");
    }, 3000); 
  });
});



// TARJETAS FOOTER
const tarjetas = document.querySelectorAll('.tarjetas');


tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener('click', () => {
    
        tarjeta.classList.toggle('expandida');
       
        const otrasTarjetas = Array.from(tarjetas).filter((t) => t !== tarjeta);
      
        otrasTarjetas.forEach((otraTarjeta) => {
            otraTarjeta.classList.remove('expandida');
        });
    });
});





