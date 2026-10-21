/**
 * AnimeVerse Audio Engine
 * Soft, sparse, piano-like ambient notes. No continuous low drone or UI beeps.
 * Audio is opt-in and stops cleanly when toggled off.
 */
class AnimeAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = true;
        this.isAmbientPlaying = false;
        this.masterGain = null;
        this.ambientTimer = null;
        this.noteIndex = 0;
        this.activeNodes = new Set();
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return false;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.9;
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return true;
    }

    playAmbientNote(frequency, startDelay = 0) {
        if (!this.ctx || this.isMuted || !this.isAmbientPlaying) return;
        const start = this.ctx.currentTime + startDelay;
        const osc = this.ctx.createOscillator();
        const overtone = this.ctx.createOscillator();
        const toneGain = this.ctx.createGain();
        const overtoneGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        // Rounded, mellow timbre: a soft fundamental and a very quiet octave.
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, start);
        overtone.type = 'sine';
        overtone.frequency.setValueAtTime(frequency * 2, start);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, start);
        filter.Q.value = 0.35;

        toneGain.gain.setValueAtTime(0.0001, start);
        toneGain.gain.linearRampToValueAtTime(0.032, start + 0.12);
        toneGain.gain.exponentialRampToValueAtTime(0.0001, start + 2.9);
        overtoneGain.gain.setValueAtTime(0.0001, start);
        overtoneGain.gain.linearRampToValueAtTime(0.0035, start + 0.12);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, start + 1.4);

        osc.connect(filter);
        filter.connect(toneGain);
        toneGain.connect(this.masterGain);
        overtone.connect(overtoneGain);
        overtoneGain.connect(this.masterGain);
        osc.start(start);
        overtone.start(start);
        osc.stop(start + 2.8);
        overtone.stop(start + 1.5);

        const nodes = [osc, overtone, toneGain, overtoneGain, filter];
        nodes.forEach(node => this.activeNodes.add(node));
        osc.onended = () => nodes.forEach(node => this.activeNodes.delete(node));
    }

    toggleAmbient() {
        if (!this.initContext()) return false;
        this.isMuted = !this.isMuted;
        if (!this.isMuted) this.startAmbientSynth();
        else this.stopAmbientSynth();
        return !this.isMuted;
    }

    startAmbientSynth() {
        if (this.isAmbientPlaying || !this.ctx) return;
        this.isAmbientPlaying = true;
        this.noteIndex = 0;

        // A calm, spacious pentatonic phrase; notes overlap gently but never form a drone.
        const phrase = [
            { note: 392.00, delay: 0.0 },
            { note: 493.88, delay: 1.0 },
            { note: 587.33, delay: 2.15 },
            { note: 493.88, delay: 3.7 },
            { note: 440.00, delay: 5.0 },
            { note: 392.00, delay: 6.3 },
            { note: 329.63, delay: 7.7 },
            { note: 440.00, delay: 9.1 }
        ];
        const playPhrase = () => {
            if (!this.isAmbientPlaying || this.isMuted) return;
            const item = phrase[this.noteIndex % phrase.length];
            this.playAmbientNote(item.note);
            this.noteIndex += 1;
        };
        playPhrase();
        this.ambientTimer = setInterval(playPhrase, 1500);
    }

    stopAmbientSynth() {
        this.isAmbientPlaying = false;
        if (this.ambientTimer) clearInterval(this.ambientTimer);
        this.ambientTimer = null;
        // Notes already playing are allowed to finish their soft fade-out.
    }

    // Keep existing app calls compatible, but intentionally remove interface beeps.
    playHoverSound() {}
    playClickSound() {}
    playModalOpenSound() {}
}

document.addEventListener('DOMContentLoaded', () => {
    window.audioEngine = new AnimeAudioEngine();
});
