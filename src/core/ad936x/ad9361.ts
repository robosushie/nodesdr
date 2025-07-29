import type { DeviceType } from "@/types";
import { GainMode } from "@/types";
import { TX, RX } from "../device";

export class AD9363 implements DeviceType {
  readonly name: string;
  readonly txChannels: number;
  readonly rxChannels: number;
  uri?: string;

  rx0: RX;
  rx1: RX;
  tx0: TX;
  tx1: TX;

  constructor(name?: string) {
    this.name = name || "AD9361";
    this.txChannels = 2;
    this.rxChannels = 2;
    this.rx0 = new RX({
      name: "RX0",
      bufferSize: 16384,
      sampleRate: 15.36e6,
      centerFrequency: 2.4e9,
      bandwidth: 10e6,
      gain: 30,
      gainMode: GainMode.SLOW_ATTACK,
    });
    this.rx1 = new RX({
      name: "RX1",
      bufferSize: 16384,
      sampleRate: 15.36e6,
      centerFrequency: 2.4e9,
      bandwidth: 10e6,
      gain: 30,
      gainMode: GainMode.SLOW_ATTACK,
    });
    this.tx0 = new TX({
      name: "TX0",
      bufferSize: 16384,
      sampleRate: 15.36e6,
      centerFrequency: 2.4e9,
      bandwidth: 10e6,
      gain: 30,
      isCyclic: false,
    });
    this.tx1 = new TX({
      name: "TX1",
      bufferSize: 16384,
      sampleRate: 15.36e6,
      centerFrequency: 2.4e9,
      bandwidth: 10e6,
      gain: 30,
      isCyclic: false,
    });
  }

  // Implement DeviceType interface methods
  getName(): string {
    return this.name;
  }
  getTXChannels(): number {
    return this.txChannels;
  }
  getRXChannels(): number {
    return this.rxChannels;
  }
  setURI(uri: string): void {
    this.uri = uri;
  }
  getURI(): string {
    return this.uri || "";
  }
  async connect(uri?: string): Promise<boolean> {
    return true;
  }
  async disconnect(): Promise<boolean> {
    return true;
  }
  isConnected(): boolean {
    return false;
  }
}
