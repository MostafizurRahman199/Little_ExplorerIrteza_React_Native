import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

/**
 * AudioService - Centralized Audio & Speech Manager for Little Explorer
 * Provides clean speech pronunciations (e.g. "Dog", "Cat", "Cow") with zero audio pops.
 */

export class AudioService {
  private static isMuted: boolean = false;

  /**
   * Play UI click feedback - Completely silent
   */
  public static async playClickSound(): Promise<void> {
    // Intentionally empty - No audio or pop sound on click/navigation
  }

  /**
   * Speak item name clearly (e.g. "Dog", "Cat", "Cow")
   */
  public static async playWord(word: string): Promise<void> {
    if (this.isMuted) return;
    try {
      this.speakText(word, 0.85, 1.05);
    } catch (error) {
      // Ignore speech errors
    }
  }

  /**
   * Sound effect hook
   */
  public static async playSoundEffect(soundText: string): Promise<void> {
    // Intentionally empty
  }

  /**
   * Core speech synthesis trigger without aggressive cancel/stop hardware pop artifacts
   */
  private static speakText(text: string, rate: number = 0.85, pitch: number = 1.0): void {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
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
