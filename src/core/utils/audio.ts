let audioCtx: AudioContext | null = null;
let activeOscillators: { [key: string]: { osc: OscillatorNode; gain: GainNode } } = {};

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Warm synth / organ tone synthesis
export function startNote(frequency: number, noteId: string = 'global') {
  try {
    const ctx = getAudioContext();
    
    // Stop any existing oscillator for this noteId
    stopNote(noteId);

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Organ/Keyboard hybrid tone: Sine + Triangle + a bit of square
    // Custom waveform synthesis for a richer EdTech experience than a harsh raw sine wave
    osc.type = 'triangle'; 
    
    // Add a slight detuned second harmonic for warmth
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // ADSR Envelope
    const now = ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    // Attack (smooth fade-in)
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
    // Decay & Sustain
    gainNode.gain.setValueAtTime(0.3, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.3);

    // Lowpass filter to make it sound warm and pleasant
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, now);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    activeOscillators[noteId] = { osc, gain: gainNode };
  } catch (error) {
    console.warn('Audio Context error:', error);
  }
}

export function stopNote(noteId: string = 'global') {
  try {
    const ctx = audioCtx || getAudioContext();
    const active = activeOscillators[noteId];
    if (active) {
      const now = ctx.currentTime;
      // Release envelope (smooth fade-out)
      active.gain.gain.setValueAtTime(active.gain.gain.value, now);
      active.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      const osc = active.osc;
      setTimeout(() => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore already stopped oscillator
        }
      }, 200);

      delete activeOscillators[noteId];
    }
  } catch (error) {
    console.warn('Stop Audio error:', error);
  }
}

// Play success sound
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 (Arpeggio)
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gainNode.gain.setValueAtTime(0, now + index * 0.08);
      gainNode.gain.linearRampToValueAtTime(0.15, now + index * 0.08 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.3);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.4);
    });
  } catch (error) {
    console.warn('Success sound error:', error);
  }
}

// Play error sound
export function playErrorSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    
    // Low dissonant tone (130Hz and 135Hz beating)
    osc1.frequency.setValueAtTime(130, now);
    osc2.frequency.setValueAtTime(135, now);

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    // Lowpass filter to make the sawtooth less harsh
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.4);
    osc2.stop(now + 0.4);
  } catch (error) {
    console.warn('Error sound error:', error);
  }
}

// Stop all active notes immediately (e.g. on component unmount or view change)
export function stopAllNotes() {
  try {
    const keys = Object.keys(activeOscillators);
    keys.forEach(key => {
      stopNote(key);
    });
  } catch (error) {
    console.warn('Stop all notes error:', error);
  }
}
