/**
 * AnimeVerse Audio Engine
 * Gentle evolving ambient music and quiet UI sounds, enabled only by user choice.
 */
class AnimeAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = true;
        this.isAmbientPlaying = false;
        this.ambientGain = null;
        this.ambientVoices = [];
        this.chordTimer = null;
        this.melodyTimer = null;
        this.chordIndex = 0;
        this.masterGain = null;
    }

    initContext() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return false;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.55;
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return true;
    }

    playTone(frequency, duration = 0.16, volume = 0.012, type = 'sine') {
        if (this.isMuted || !this.initContext()) return;
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            osc.type = type;
            osc.frequency.setValueAtTime(frequency, now);
            filter.type = 'lowpass';
            filter.frequency.value = 1300;
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(volume, now + 0.025);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + duration + 0.04);
        } catch (error) {
            console.warn('Audio effect unavailable:', error);
        }
    }

    playHoverSound() { this.playTone(659.25, 0.065, 0.0035, 'sine'); }
    playClickSound() {
        if (this.isMuted) return;
        this.playTone(523.25, 0.12, 0.007, 'sine');
        setTimeout(() => this.playTone(783.99, 0.14, 0.004, 'sine'), 55);
    }
    playModalOpenSound() {
        if (this.isMuted) return;
        [523.25, 659.25, 783.99].forEach((note, index) => {
            setTimeout(() => this.playTone(note, 0.38, 0.005, 'sine'), index * 65);
        });
    }

    toggleAmbient() {
        if (!this.initContext()) return false;
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
        if (this.isAmbientPlaying || !this.ctx) return;
        this.isAmbientPlaying = true;
        this.chordIndex = 0;
        const now = this.ctx.currentTime;
        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.0001, now);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.018, now + 4.5);
        this.ambientGain.connect(this.masterGain);

        // Soft sine/triangle tones with gentle low-pass filtering replace the old harsh sawtooth wall.
        const voices = [
            { freq: 110, type: 'sine', volume: 0.30, detune: -2 },
            { freq: 220, type: 'sine', volume: 0.18, detune: 2 },
            { freq: 261.63, type: 'triangle', volume: 0.06, detune: 0 },
            { freq: 329.63, type: 'sine', volume: 0.08, detune: 3 }
        ];
        this.ambientVoices = voices.map((voice, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const filter = this.ctx.createBiquadFilter();
            osc.type = voice.type;
            osc.frequency.setValueAtTime(voice.freq, now);
            osc.detune.value = voice.detune;
            filter.type = 'lowpass';
            filter.frequency.value = index === 0 ? 260 : 620;
            filter.Q.value = 0.25;
            gain.gain.value = voice.volume;
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ambientGain);
            osc.start(now);
            return { osc, base: voice.freq };
        });

        // A slow chord progression gives the ambience movement without a repetitive, piercing note.
        const progression = [
            [110, 220, 261.63, 329.63],
            [98, 196, 246.94, 293.66],
            [130.81, 261.63, 329.63, 392],
            [87.31, 174.61, 220, 261.63],
            [110, 220, 277.18, 329.63]
        ];
        const evolve = () => {
            if (!this.isAmbientPlaying || !this.ctx) return;
            this.chordIndex = (this.chordIndex + 1) % progression.length;
            const time = this.ctx.currentTime;
            progression[this.chordIndex].forEach((note, index) => {
                const voice = this.ambientVoices[index];
                if (!voice) return;
                voice.osc.frequency.cancelScheduledValues(time);
                voice.osc.frequency.setTargetAtTime(note, time, 3.2);
            });
            this.ambientGain.gain.cancelScheduledValues(time);
            this.ambientGain.gain.setTargetAtTime(0.015 + (this.chordIndex % 2) * 0.002, time, 3.5);
        };
        this.chordTimer = setInterval(evolve, 9500);

        // A sparse, low-volume melody adds movement without sounding like a notification loop.
        const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 440, 587.33];
        let melodyIndex = 0;
        this.melodyTimer = setInterval(() => {
            if (!this.isAmbientPlaying || this.isMuted) return;
            this.playTone(melody[melodyIndex], 1.15, 0.0022, 'sine');
            melodyIndex = (melodyIndex + 1) % melody.length;
        }, 2400);
    }

    stopAmbientSynth() {
        if (!this.isAmbientPlaying || !this.ambientGain || !this.ctx) return;
        const now = this.ctx.currentTime;
        this.ambientGain.gain.cancelScheduledValues(now);
        this.ambientGain.gain.setTargetAtTime(0.0001, now, 0.2);
        if (this.chordTimer) clearInterval(this.chordTimer);
        if (this.melodyTimer) clearInterval(this.melodyTimer);
        this.chordTimer = null;
        this.melodyTimer = null;
        const voices = this.ambientVoices;
        this.isAmbientPlaying = false;
        setTimeout(() => {
            voices.forEach(voice => {
                try { voice.osc.stop(); } catch (error) {}
            });
            this.ambientVoices = [];
        }, 1100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.audioEngine = new AnimeAudioEngine();
    document.addEventListener('mouseover', (event) => {
        if (event.target.closest('button, .nav-link, .tilt-card, .tab-btn, .char-thumb, .manga-item')) {
            window.audioEngine.playHoverSound();
        }
    });
    document.addEventListener('click', (event) => {
        if (event.target.closest('button, .nav-link, .tab-btn, .char-thumb, .filter-chip')) {
            window.audioEngine.playClickSound();
        }
    });
});
