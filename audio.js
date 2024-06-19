import {
    getAreChipsFrying, getAudioMuted,
    getFryTimeRemaining,
    getShiftInProgress,
    getShiftTimeRemaining, setAudioMuted
} from './constantsAndGlobalVars.js';

let fryingAudio = null;
let isFrying = false;
let preMuteVolumes = [];

const ambientAudioFiles = [
    './resources/audio/ambience1.mp3',
    './resources/audio/ambience2.mp3',
    './resources/audio/ambience3.mp3',
    './resources/audio/ambience4.mp3',
    './resources/audio/ambience5.mp3',
    './resources/audio/ambience6.mp3'
];

export const audioFiles = {
    frying: './resources/audio/frying.mp3',
    peeling: './resources/audio/peeling.mp3',
    chopping: './resources/audio/chopping.mp3',
    click: './resources/audio/click.mp3',
    clickTwo: './resources/audio/clickTwo.mp3',
    shiftEnd: './resources/audio/shiftEnd.mp3',
    tickClock: './resources/audio/tickClock.mp3',
    kerching: './resources/audio/kerching.mp3',
    goodPrize: './resources/audio/goodPrize.mp3',
    badPrize: './resources/audio/badPrize.mp3'
};

let currentAudio = null;
let nextAudio = null;
let fadeIntervals = [];
const fadeDuration = 5000;
let playingAudios = []; // Array to track currently playing audio file paths

function playAudio(audioElement) {
    audioElement.play().catch(error => console.error('Error playing audio:', error));
    playingAudios.push(audioElement); // Add to currently playing array
}

function fadeAudio(audioElement, startVolume, endVolume, duration, onFinish) {
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = (endVolume - startVolume) / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
        if (currentStep >= steps) {
            if (endVolume < startVolume) {
                playingAudios = playingAudios.filter(src => src !== audioElement.src); // Remove from currently playing array
            }
            clearInterval(fadeInterval);
            if (endVolume === 0) {
                audioElement.pause();
            }
            if (onFinish) onFinish();
        } else {
            audioElement.volume = startVolume + (currentStep * volumeStep);
            currentStep++;
        }
    }, stepDuration);

    fadeIntervals.push(fadeInterval);
}

function selectRandomAudioFile() {
    const randomIndex = Math.floor(Math.random() * ambientAudioFiles.length);
    return ambientAudioFiles[randomIndex];
}

export function startAmbientTrack() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }

    nextAudio = new Audio(selectRandomAudioFile());
    nextAudio.volume = 0;
    if (!getAudioMuted()) {
        playAudio(nextAudio);
        fadeAudio(nextAudio, 0, 0.25, fadeDuration);
    }

    nextAudio.addEventListener('timeupdate', () => {
        const shiftTimeRemaining = getShiftTimeRemaining();

        // Fade out current track if shift is ending
        if (shiftTimeRemaining <= 5) {
            fadeAudio(nextAudio, nextAudio.volume, 0, fadeDuration, () => {
                nextAudio.pause();
            });
        }

        // Crossfade to the next track if less than 5 seconds remaining
        if (nextAudio.currentTime >= nextAudio.duration - 5) {
            if (!currentAudio) {
                currentAudio = nextAudio;
                nextAudio = new Audio(selectRandomAudioFile());
                nextAudio.volume = 0;
                if (!getAudioMuted()) {
                    playAudio(nextAudio);
                    fadeAudio(nextAudio, 0, 0.25, fadeDuration);
                    fadeAudio(currentAudio, 0.25, 0, fadeDuration, () => {
                        currentAudio.pause();
                        currentAudio = null;
                    });
                }
            }
        }

        // Stop all tracks if shift time remaining is 0
        if (shiftTimeRemaining === 0) {
            if (currentAudio) {
                fadeAudio(currentAudio, currentAudio.volume, 0, fadeDuration, () => {
                    currentAudio.pause();
                    currentAudio = null;
                });
            }
            fadeAudio(nextAudio, nextAudio.volume, 0, fadeDuration, () => {
                nextAudio.pause();
            });
        }
    });
}

export function playFryingSoundLoop() {
    if (isFrying) return;

    isFrying = true;
    fryingAudio = new Audio(audioFiles.frying);
    fryingAudio.loop = true;
    fryingAudio.volume = 0.2;

    function checkFryingStatus() {
        const areChipsFrying = getAreChipsFrying();
        const shiftInProgress = getShiftInProgress();
        const fryTimeRemaining = getFryTimeRemaining();

        if (areChipsFrying && shiftInProgress) {
            if (fryingAudio.paused) {
                fryingAudio.play().catch(error => console.error('Error playing frying audio:', error));
                playingAudios.push(fryingAudio); // Add to currently playing array
            }
        } else {
            stopFryingSound();
        }

        if (fryTimeRemaining === 1) {
            startFadeOut(fryingAudio, 1000); // 2 seconds fade out
        }
    }

    checkFryingStatus();

    const checkInterval = setInterval(checkFryingStatus, 200);

    function stopFryingSound() {
        isFrying = false;
        clearInterval(checkInterval);
        fryingAudio.pause();
        playingAudios = playingAudios.filter(src => src !== fryingAudio); // Remove from currently playing array
    }

    if (!getAreChipsFrying() || !getShiftInProgress()) {
        stopFryingSound();
    }
}

function startFadeOut(audio, duration) {
    const steps = 20;
    const stepDuration = duration / steps;
    const volumeStep = audio.volume / steps;
    let currentStep = 0;

    const fadeInterval = setInterval(() => {
        if (currentStep >= steps) {
            clearInterval(fadeInterval);
            audio.pause();
            playingAudios = playingAudios.filter(src => src !== audio); // Remove from currently playing array
        } else {
            audio.volume = Math.max(0, audio.volume - volumeStep);
            currentStep++;
        }
    }, stepDuration);
}

export function playAudioFile(filePath, volume = 1.0) {
    const audio = new Audio(filePath);
    audio.volume = volume;
    audio.play().catch(error => console.error('Error playing audio:', error));
    playingAudios.push(audio); // Add to currently playing array
    audio.addEventListener('ended', () => {
        playingAudios = playingAudios.filter(src => src !== audio); // Remove from currently playing array
    });

    audio.addEventListener('pause', () => {
        playingAudios = playingAudios.filter(src => src !== audio); // Remove from currently playing array
    });
    return audio;
}

export function getPlayingAudioFiles() {
    return playingAudios;
}

export function muteAllAudio() {
    setAudioMuted(true);
    playingAudios.forEach(audio => {
        preMuteVolumes.push({ audio: audio, volume: audio.volume })
        audio.volume = 0;
    });
}

export function unmuteAllAudio() {
    setAudioMuted(false);
    preMuteVolumes.forEach(item => {
        item.audio.volume = item.volume;
    });

    preMuteVolumes = [];
}
