/* ==========================================================================
   SUBTLE UI SOUND SYNTHESIZER
   Web Audio API Procedural Feedback Soundscape
   ========================================================================== */

export class UiAudio {
  constructor() {
    this.enabled = false;
    this.audioCtx = null;
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');

    this.init();
  }

  init() {
    if (!this.soundToggleBtn) return;

    this.soundToggleBtn.addEventListener('click', () => {
      this.enabled = !this.enabled;
      if (this.enabled) {
        if (!this.audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContext();
        }
        this.soundToggleBtn.classList.add('active');
        this.soundToggleBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
        this.playHoverSound();
      } else {
        this.soundToggleBtn.classList.remove('active');
        this.soundToggleBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
      }
    });

    // Attach click/hover sounds if enabled
    document.addEventListener('click', (e) => {
      if (this.enabled && e.target.closest('button, a, .glass-card, .filter-btn')) {
        this.playClickSound();
      }
    });
  }

  playHoverSound() {
    if (!this.enabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.02, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playClickSound() {
    if (!this.enabled || !this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {
      // Ignore audio errors
    }
  }
}
