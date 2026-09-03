import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

/**
 * AudioService - Centralized Audio & Speech Manager for Little Explorer
 * Handles text-to-speech for words and direct web MP3 audio playback for real sound effects.
 */

export class AudioService {
  private static isMuted: boolean = false;
  private static activeAudioInstance: HTMLAudioElement | null = null;

  /**
   * Play real audio file (MP3 / OGG) directly from URL
   */
  public static async playAudioUrl(url: string): Promise<void> {
    if (this.isMuted || !url) return;
    try {
      this.stopAllAudio();

      if (typeof window !== 'undefined' && typeof window.Audio !== 'undefined') {
        const audio = new window.Audio(url);
        this.activeAudioInstance = audio;
        audio.volume = 1.0;
        audio.play().catch((err) => {
          console.log('Audio playback prevented:', err);
        });
      }
    } catch (error) {
      console.log('Failed to play real audio URL:', error);
    }
  }

  /**
   * Speak item name clearly with warm toddler pitch
   */
  public static async playWord(word: string): Promise<void> {
    if (this.isMuted) return;
    try {
      this.speakText(`${word}!`, 0.82, 1.18);
    } catch (error) {
      // Ignore speech errors
    }
  }

  /**
   * Speak phrase in classic style: "A for Apple!"
   */
  public static async playPoemPhrase(letter: string, word: string): Promise<void> {
    if (this.isMuted) return;
    try {
      const poemText = `${letter} for ${word}!`;
      this.speakText(poemText, 0.78, 1.22);
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
   * Stop active speech and audio playback
   */
  public static async stopAllAudio(): Promise<void> {
    try {
      if (this.activeAudioInstance) {
        this.activeAudioInstance.pause();
        this.activeAudioInstance.currentTime = 0;
        this.activeAudioInstance = null;
      }

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
