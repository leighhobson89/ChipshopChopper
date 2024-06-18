import {getShiftTimeRemaining} from './constantsAndGlobalVars.js';

const audioFiles = [
    './resources/audio/ambience1.mp3',
    './resources/audio/ambience2.mp3',
    './resources/audio/ambience3.mp3',
    './resources/audio/ambience4.mp3',
    './resources/audio/ambience5.mp3',
    './resources/audio/ambience6.mp3'
];

let currentAudio = null;
let nextAudio = null;
let fadeInterval = null;
const fadeDuration = 5000; // 5 seconds
const crossfadeDuration = 5000; // 5 seconds

function playAudio(audioElement) {
    audioElement.play().catch(error => console.error('Error playing audio:', error));
}

function fadeAudio(audioElement, startVolume, endVolume, duration) {
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = (endVolume - startVolume) / steps;
    let currentStep = 0;

    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            if (endVolume === 0) {
                audioElement.pause();
            }
        } else {
            audioElement.volume = startVolume + (currentStep * volumeStep);
            currentStep++;
        }
    }, stepDuration);
}

function selectRandomAudioFile() {
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    return audioFiles[randomIndex];
}

export function startAmbientSoundLoop() {
    currentAudio = new Audio(selectRandomAudioFile());
    currentAudio.volume = 0;
    playAudio(currentAudio);
    fadeAudio(currentAudio, 0, 1, fadeDuration);

    currentAudio.addEventListener('timeupdate', () => {
        if (currentAudio.currentTime >= currentAudio.duration - crossfadeDuration / 1000) {
            nextAudio = new Audio(selectRandomAudioFile());
            nextAudio.volume = 0;
            playAudio(nextAudio);
            fadeAudio(nextAudio, 0, 1, fadeDuration);
            fadeAudio(currentAudio, 1, 0, fadeDuration);
            currentAudio = nextAudio;
        }

        const shiftTimeRemaining = getShiftTimeRemaining();
        if (shiftTimeRemaining <= 5) {
            fadeAudio(currentAudio, currentAudio.volume, 0, fadeDuration);
            if (shiftTimeRemaining <= 1) {
                currentAudio.pause();
                clearInterval(fadeInterval);
            }
        }
    });
}