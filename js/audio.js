/**
 * AnimeVerse Audio Synthesizer Engine
 * Web Audio API procedural sound system for futuristic cyberpunk UI effects and ambient synth pads.
 */

class AnimeAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = true;
        this.isAmbientPlaying = false;
        this.ambientGain = null;
        this.oscillators = [];
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playHoverSound() {
        if (this.isMuted) return;
        try {
            this.initContext();
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, now); // D5
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.08);
        } catch (e) {
            console.warn('Audio play error:', e);
        }
    }

    playClickSound() {
        if (this.isMuted) return;
        try {
            this.initContext();
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, now); // A4
            osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.12); // D6

            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.12);
        } catch (e) {
            console.warn('Audio play error:', e);
        }
    }

    playModalOpenSound() {
        if (this.isMuted) return;
        try {
            this.initContext();
            const now = this.ctx.currentTime;
            const notes = [440, 554.37, 659.25, 880]; // A Major 7 chord

            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.04);

                gain.gain.setValueAtTime(0.05, now + idx * 0.04);
                gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.35);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now + idx * 0.04);
                osc.stop(now + idx * 0.04 + 0.35);
            });
        } catch (e) {
            console.warn('Audio play error:', e);
        }
    }

    toggleAmbient() {
        this.initContext();
        this.isMuted = !this.isMuted;

        if (!this.isMuted) {
            this.startAmbientSynth();
            this.playModalOpenSound();
        } else {
            this.stopAmbientSynth();
        }

        return !this.isMuted;
    }

    startAmbientSynth() {
        if (this.isAmbientPlaying) return;
        try {
            this.isAmbientPlaying = true;
            const now = this.ctx.currentTime;

            this.ambientGain = this.ctx.createGain();
            this.ambientGain.gain.setValueAtTime(0.001, now);
            this.ambientGain.gain.exponentialRampToValueAtTime(0.04, now + 2.0); // gentle fade in
            this.ambientGain.connect(this.ctx.destination);

            // Ambient ethereal chords (Cyberpunk anime vibe)
            const freqs = [110, 220, 277.18, 329.63, 440, 554.37]; // A major 9
            this.oscillators = [];

            freqs.forEach(f => {
                const osc = this.ctx.createOscillator();
                const filter = this.ctx.createBiquadFilter();

                osc.type = 'sawtooth';
                osc.frequency.value = f;

                filter.type = 'lowpass';
                filter.frequency.value = 450;
                filter.Q.value = 4;

                // Subtle LFO modulation for breathing anime atmosphere
                const lfo = this.ctx.createOscillator();
                const lfoGain = this.ctx.createGain();
                lfo.frequency.value = 0.2 + Math.random() * 0.2;
                lfoGain.gain.value = 150;
                lfo.connect(filter.frequency);
                lfo.start();

                osc.connect(filter);
                filter.connect(this.ambientGain);

                osc.start();
                this.oscillators.push(osc, lfo);
            });
        } catch (e) {
            console.warn('Ambient synth error:', e);
        }
    }

    stopAmbientSynth() {
        if (!this.isAmbientPlaying || !this.ambientGain) return;
        try {
            const now = this.ctx.currentTime;
            this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
            this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

            setTimeout(() => {
                this.oscillators.forEach(osc => {
                    try { osc.stop(); } catch(e) {}
                });
                this.oscillators = [];
                this.isAmbientPlaying = false;
            }, 850);
        } catch (e) {
            console.warn('Stop synth error:', e);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.audioEngine = new AnimeAudioEngine();

    // Auto-bind sound effects to interactive elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('button, .nav-link, .tilt-card, .tab-btn, .char-thumb, .manga-item')) {
            window.audioEngine.playHoverSound();
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('button, .nav-link, .tab-btn, .char-thumb, .filter-chip')) {
            window.audioEngine.playClickSound();
        }
    });
});
