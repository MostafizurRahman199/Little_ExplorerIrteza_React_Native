import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

/**
 * AudioService - Centralized Audio & Speech Manager for Little Explorer
 * Provides beautiful, melodic nursery rhyme pronunciations with rhythmic cadence
 * and warm melodic chime effects tailored for toddlers.
 */

export class AudioService {
  private static isMuted: boolean = false;

  /**
   * Play a soft, warm 3-note marimba musical chime (C5 -> E5 -> G5)
   */
  private static playMelodicChime(): void {
    if (this.isMuted) return;
    try {
      if (typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const now = ctx.currentTime;

          // Warm child-friendly marimba chord (C5, E5, G5)
          const frequencies = [523.25, 659.25, 783.99];
          frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.12, now + i * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.08);
            osc.stop(now + i * 0.08 + 0.25);
          });
        }
      }
    } catch (e) {
      // Ignore Web Audio errors if unsupported
    }
  }

  /**
   * Play UI click feedback - Completely silent
   */
  public static async playClickSound(): Promise<void> {
    // Intentionally empty
  }

  /**
   * Speak item name clearly with warm toddler pitch
   */
  public static async playWord(word: string): Promise<void> {
    if (this.isMuted) return;
    try {
      this.playMelodicChime();
      const rhythmicText = word.includes(' for ')
        ? word.replace(' for ', '! ... is for... ') + '! ... ' + word.split(' for ')[0] + ', ' + word.split(' for ')[1] + '!'
        : `${word}!`;

      this.speakText(rhythmicText, 0.76, 1.25);
    } catch (error) {
      // Ignore speech errors
    }
  }

  /**
   * Speak a nursery rhyme poem phrase with melodic rhythm (e.g. "A... is for... Apple! ... A, A, Apple!")
   */
  public static async playPoemPhrase(letter: string, word: string): Promise<void> {
    if (this.isMuted) return;
    try {
      this.playMelodicChime();
      // Melodic nursery rhyme structure: "A... is for... Apple! ... A, A, Apple!"
      const poemText = `${letter}... is for... ${word}! ... ${letter}, ${word}!`;
      this.speakText(poemText, 0.74, 1.28);
    } catch (error) {
      // Ignore speech errors
    }
  }

  /**
   * Sound effect hook
   */
  public static async playSoundEffect(soundText: string): Promise<void> {
    if (this.isMuted) return;
    try {
      this.playMelodicChime();
      this.speakText(`${soundText}!`, 0.82, 1.22);
    } catch (error) {
      // Ignore
    }
  }

  /**
   * Core speech synthesis trigger with nursery rhyme pitch & rhythmic timing
   */
  private static speakText(text: string, rate: number = 0.76, pitch: number = 1.28): void {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel(); // Stop active audio
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = pitch;
        utterance.volume = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        // Silently ignore speech errors
      }
    } else {
      try {
        Speech.stop();
        Speech.speak(text, {
          rate: rate,
          pitch: pitch,
          language: 'en-US',
        });
      } catch (err) {
        // Silently ignore speech errors
      }
    }
  }

  /**
   * Stop active speech
   */
  public static async stopAllAudio(): Promise<void> {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      } else {
        Speech.stop();
      }
    } catch (error) {
      // Ignore stop errors
    }
  }

  /**
   * Toggle mute setting
   */
  public static setMuted(muted: boolean): void {
    this.isMuted = muted;
  }

  public static getIsMuted(): boolean {
    return this.isMuted;
  }
}
