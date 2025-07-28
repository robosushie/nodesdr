/**
 * Basic device definitions for NodeSDR
 */

import { EventEmitter } from 'node:events';

/**
 * Base SDR device interface
 */
export interface SDRDevice extends EventEmitter {
  connect(uri?: string): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  
  setSampleRate(rate: number): Promise<void>;
  getSampleRate(): Promise<number>;
  setCenterFrequency(freq: number): Promise<void>;
  getCenterFrequency(): Promise<number>;
  setGain(gain: number): Promise<void>;
  getGain(): Promise<number>;
  
  startRx(): Promise<void>;
  stopRx(): Promise<void>;
}