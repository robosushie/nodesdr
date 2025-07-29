import type { RXType, TXType } from "@/types";

export class TX implements TXType {
  readonly name: string;
  bufferSize: number;
  sampleRate: number;
  centerFrequency: number;
  bandwidth: number;
  gain: number;
  isCyclic: boolean;

  constructor(config: TXType) {
    this.name = config.name;
    this.bufferSize = config.bufferSize;
    this.sampleRate = config.sampleRate;
    this.centerFrequency = config.centerFrequency;
    this.bandwidth = config.bandwidth;
    this.gain = config.gain;
    this.isCyclic = config.isCyclic;
  }

  getName(): string {
    return this.name;
  }

  async setSampleLength(length: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getSampleLength(): Promise<number> {
    // To be implemented by inheriting classes
    return 0;
  }

  async setSampleRate(rate: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getSampleRate(): Promise<number> {
    // To be implemented by inheriting classes
    return this.sampleRate;
  }

  async setCenterFrequency(freq: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getCenterFrequency(): Promise<number> {
    // To be implemented by inheriting classes
    return this.centerFrequency;
  }

  async setBandwidth(bandwidth: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getBandwidth(): Promise<number> {
    // To be implemented by inheriting classes
    return this.bandwidth;
  }

  async setGain(gain: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getGain(): Promise<number> {
    // To be implemented by inheriting classes
    return this.gain;
  }

  async setCyclicMode(isCyclic: boolean): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getCyclicMode(): Promise<boolean> {
    // To be implemented by inheriting classes
    return this.isCyclic;
  }

  async send(samples: Float32Array): Promise<void> {
    // To be implemented by inheriting classes
  }
}

export class RX implements RXType {
  readonly name: string;
  bufferSize: number;
  sampleRate: number;
  centerFrequency: number;
  bandwidth: number;
  gain: number;
  gainMode: string;

  constructor(config: RXType) {
    this.name = config.name;
    this.bufferSize = config.bufferSize;
    this.sampleRate = config.sampleRate;
    this.centerFrequency = config.centerFrequency;
    this.bandwidth = config.bandwidth;
    this.gain = config.gain;
    this.gainMode = config.gainMode;
  }

  getName(): string {
    return this.name;
  }

  async setSampleLength(length: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getSampleLength(): Promise<number> {
    // To be implemented by inheriting classes
    return 0;
  }

  async setSampleRate(rate: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getSampleRate(): Promise<number> {
    // To be implemented by inheriting classes
    return this.sampleRate;
  }

  async setCenterFrequency(freq: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getCenterFrequency(): Promise<number> {
    // To be implemented by inheriting classes
    return this.centerFrequency;
  }

  async setBandwidth(bandwidth: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getBandwidth(): Promise<number> {
    // To be implemented by inheriting classes
    return this.bandwidth;
  }

  async setGain(gain: number): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getGain(): Promise<number> {
    // To be implemented by inheriting classes
    return this.gain;
  }

  async setGainMode(mode: string): Promise<void> {
    // To be implemented by inheriting classes
  }

  async getGainMode(): Promise<string> {
    // To be implemented by inheriting classes
    return this.gainMode;
  }

  async send(samples: Float32Array): Promise<void> {
    // To be implemented by inheriting classes
  }
}
