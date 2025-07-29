import type { DeviceType } from "@/types";
import { GainMode } from "@/types";
import { RX, TX } from "@/core/device";

export class AD9364 implements DeviceType {
  readonly name: string;
  readonly txChannels: number;
  readonly rxChannels: number;
  uri?: string;

  rx: RX;
  tx: TX;

  constructor(name?: string) {
    this.name = name || "AD9364";
    this.txChannels = 2;
    this.rxChannels = 2;

    this.rx = new RX({
      name: "RX",
      bufferSize: 16384,
      sampleRate: 15.36e6,
      centerFrequency: 2.4e9,
      bandwidth: 10e6,
      gain: 30,
      gainMode: GainMode.SLOW_ATTACK,
    });

    this.tx = new TX({
      name: "TX",
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
