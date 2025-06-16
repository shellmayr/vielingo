import { AudioFile } from '../data/exercises';

export interface AudioPlayerConfig {
  autoplay?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  volume?: number;
  playbackRate?: number;
  loop?: boolean;
}

export interface AudioCacheEntry {
  audioBuffer: AudioBuffer;
  lastAccessed: number;
  size: number;
}

export interface AudioMetadata {
  duration: number;
  format: string;
  bitrate?: number;
  sampleRate?: number;
  channels?: number;
}

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private cache: Map<string, AudioCacheEntry> = new Map();
  private maxCacheSize: number = 50 * 1024 * 1024; // 50MB
  private currentCacheSize: number = 0;
  private preloadQueue: Set<string> = new Set();

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('AudioContext not supported:', error);
    }
  }

  async preloadAudio(url: string): Promise<void> {
    if (this.cache.has(url) || this.preloadQueue.has(url)) {
      return;
    }

    this.preloadQueue.add(url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch audio: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      
      if (this.audioContext) {
        const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
        this.addToCache(url, audioBuffer);
      }
    } catch (error) {
      console.error(`Failed to preload audio ${url}:`, error);
    } finally {
      this.preloadQueue.delete(url);
    }
  }

  private addToCache(url: string, audioBuffer: AudioBuffer): void {
    const size = this.estimateBufferSize(audioBuffer);
    
    // Check if we need to free up space
    while (this.currentCacheSize + size > this.maxCacheSize && this.cache.size > 0) {
      this.evictLeastRecentlyUsed();
    }

    this.cache.set(url, {
      audioBuffer,
      lastAccessed: Date.now(),
      size
    });

    this.currentCacheSize += size;
  }

  private estimateBufferSize(audioBuffer: AudioBuffer): number {
    return audioBuffer.length * audioBuffer.numberOfChannels * 4; // 4 bytes per sample (32-bit float)
  }

  private evictLeastRecentlyUsed(): void {
    let oldestEntry = { url: '', lastAccessed: Date.now() };
    
    for (const [url, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestEntry.lastAccessed) {
        oldestEntry = { url, lastAccessed: entry.lastAccessed };
      }
    }

    if (oldestEntry.url) {
      const entry = this.cache.get(oldestEntry.url);
      if (entry) {
        this.currentCacheSize -= entry.size;
        this.cache.delete(oldestEntry.url);
      }
    }
  }

  async getAudioBuffer(url: string): Promise<AudioBuffer | null> {
    // Check cache first
    const cached = this.cache.get(url);
    if (cached) {
      cached.lastAccessed = Date.now();
      return cached.audioBuffer;
    }

    // If not cached, preload it
    await this.preloadAudio(url);
    const newCached = this.cache.get(url);
    return newCached?.audioBuffer || null;
  }

  createAudioPlayer(audioFile: AudioFile, config: AudioPlayerConfig = {}): AudioPlayer {
    return new AudioPlayer(audioFile, this, config);
  }

  async preloadViennaAudio(theme: string): Promise<void> {
    const themeUrls = this.getThemeAudioUrls(theme);
    const preloadPromises = themeUrls.map(url => this.preloadAudio(url));
    await Promise.allSettled(preloadPromises);
  }

  private getThemeAudioUrls(theme: string): string[] {
    // This would typically come from your Vienna content data
    const themeAudioMap: Record<string, string[]> = {
      'wiener-wohnen': [
        '/audio/vienna/wiener-wohnen/housing-office-call.mp3',
        '/audio/vienna/wiener-wohnen/neighbors-discussion.mp3'
      ],
      'heurigenkultur': [
        '/audio/vienna/heurigenkultur/heuriger-ordering.mp3',
        '/audio/vienna/heurigenkultur/wine-tasting.mp3'
      ],
      'kaffeehauskultur': [
        '/audio/vienna/kaffeehauskultur/cafe-ordering.mp3',
        '/audio/vienna/kaffeehauskultur/coffee-house-atmosphere.mp3'
      ],
      'alltagsgeschichten': [
        '/audio/vienna/alltagsgeschichten/bakery-visit.mp3',
        '/audio/vienna/alltagsgeschichten/public-transport.mp3'
      ],
      'wiener-grant-schmaeh': [
        '/audio/vienna/wiener-grant-schmaeh/cafe-grant.mp3',
        '/audio/vienna/wiener-grant-schmaeh/schmaeh-examples.mp3'
      ],
      'fiaker': [
        '/audio/vienna/fiaker/fiaker-tour.mp3',
        '/audio/vienna/fiaker/history-explanation.mp3'
      ]
    };

    return themeAudioMap[theme] || [];
  }

  clearCache(): void {
    this.cache.clear();
    this.currentCacheSize = 0;
  }

  getCacheStats(): { size: number; entries: number; maxSize: number } {
    return {
      size: this.currentCacheSize,
      entries: this.cache.size,
      maxSize: this.maxCacheSize
    };
  }
}

export class AudioPlayer {
  private audio: HTMLAudioElement;
  private audioManager: AudioManager;
  private audioFile: AudioFile;
  private config: AudioPlayerConfig;
  private eventListeners: Map<string, Function[]> = new Map();

  constructor(audioFile: AudioFile, audioManager: AudioManager, config: AudioPlayerConfig = {}) {
    this.audioFile = audioFile;
    this.audioManager = audioManager;
    this.config = { volume: 0.8, playbackRate: 1.0, ...config };
    
    this.audio = new Audio();
    this.setupAudioElement();
    this.setupEventListeners();
  }

  private setupAudioElement(): void {
    this.audio.src = this.audioFile.url;
    this.audio.volume = this.config.volume || 0.8;
    this.audio.playbackRate = this.config.playbackRate || 1.0;
    this.audio.preload = this.config.preload || 'metadata';
    this.audio.loop = this.config.loop || false;
  }

  private setupEventListeners(): void {
    const events = ['loadstart', 'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 
                   'play', 'pause', 'ended', 'error', 'timeupdate', 'progress'];

    events.forEach(event => {
      this.audio.addEventListener(event, (e) => {
        this.emit(event, e);
      });
    });
  }

  async play(): Promise<void> {
    try {
      await this.audio.play();
    } catch (error) {
      console.error('Audio play failed:', error);
      throw error;
    }
  }

  pause(): void {
    this.audio.pause();
  }

  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  setCurrentTime(time: number): void {
    this.audio.currentTime = Math.max(0, Math.min(time, this.audio.duration || 0));
  }

  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  getDuration(): number {
    return this.audio.duration || this.audioFile.duration || 0;
  }

  setVolume(volume: number): void {
    this.audio.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.audio.volume;
  }

  setPlaybackRate(rate: number): void {
    const validRates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
    const closestRate = validRates.reduce((prev, curr) => 
      Math.abs(curr - rate) < Math.abs(prev - rate) ? curr : prev
    );
    this.audio.playbackRate = closestRate;
  }

  getPlaybackRate(): number {
    return this.audio.playbackRate;
  }

  isPlaying(): boolean {
    return !this.audio.paused && !this.audio.ended && this.audio.currentTime > 0;
  }

  isLoaded(): boolean {
    return this.audio.readyState >= 2; // HAVE_CURRENT_DATA
  }

  getAudioFile(): AudioFile {
    return this.audioFile;
  }

  // Event system
  on(event: string, callback: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: Function): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  // Convenience methods for language learning
  async playSegment(startTime: number, endTime: number): Promise<void> {
    return new Promise((resolve) => {
      this.setCurrentTime(startTime);
      
      const checkEnd = () => {
        if (this.getCurrentTime() >= endTime) {
          this.pause();
          this.off('timeupdate', checkEnd);
          resolve();
        }
      };

      this.on('timeupdate', checkEnd);
      this.play();
    });
  }

  async repeatSegment(startTime: number, endTime: number, times: number = 3): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.playSegment(startTime, endTime);
      if (i < times - 1) {
        // Small pause between repetitions
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  getTranscript(): string | undefined {
    return this.audioFile.transcript;
  }

  getAccent(): 'standard' | 'viennese' | undefined {
    return this.audioFile.accent;
  }

  destroy(): void {
    this.audio.pause();
    this.audio.src = '';
    this.eventListeners.clear();
  }
}

// Compression utilities for audio optimization
export class AudioCompressor {
  static async compressAudio(audioBuffer: ArrayBuffer, quality: number = 0.8): Promise<ArrayBuffer> {
    // This is a placeholder for audio compression logic
    // In a real implementation, you might use libraries like:
    // - @ffmpeg/ffmpeg for client-side compression
    // - Server-side compression with ffmpeg
    
    console.log(`Compressing audio with quality ${quality}`);
    return audioBuffer; // Return as-is for now
  }

  static getSupportedFormats(): string[] {
    const audio = document.createElement('audio');
    const formats = [];

    if (audio.canPlayType('audio/mpeg')) formats.push('mp3');
    if (audio.canPlayType('audio/ogg')) formats.push('ogg');
    if (audio.canPlayType('audio/wav')) formats.push('wav');
    if (audio.canPlayType('audio/aac')) formats.push('aac');

    return formats;
  }

  static getBestFormat(): string {
    const formats = AudioCompressor.getSupportedFormats();
    // Prefer order: ogg (best compression), aac, mp3, wav
    const preferredOrder = ['ogg', 'aac', 'mp3', 'wav'];
    
    for (const format of preferredOrder) {
      if (formats.includes(format)) {
        return format;
      }
    }

    return 'mp3'; // fallback
  }
}

// Singleton instance
export const audioManager = new AudioManager(); 