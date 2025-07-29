/**
 * Basic types for NodeSDR
 */

export interface DeviceType {
  readonly name: string;
  uri?: string;

  readonly txChannels: number;
  readonly rxChannels: number;

  getName(): string;
  getTXChannels(): number;
  getRXChannels(): number;

  setURI(uri: string): void;
  getURI(): string;

  connect(uri?: string): Promise<boolean>;
  disconnect(): Promise<boolean>;
  isConnected(): boolean;
}

export interface TXType {
  readonly name: string;
  bufferSize: number;
  sampleRate: number;
  centerFrequency: number;
  bandwidth: number;
  gain: number;
  isCyclic: boolean;
}

export interface RXType {
  readonly name: string;
  bufferSize: number;
  sampleRate: number;
  centerFrequency: number;
  bandwidth: number;
  gain: number;
  gainMode: string;
}

export enum GainMode {
  MANUAL = "manual",
  SLOW_ATTACK = "slow_attack",
}
