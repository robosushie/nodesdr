import { AD9363 } from "./ad936x/ad9363";

export class PlutoSDR extends AD9363 {
  constructor() {
    super("PlutoSDR");
  }
}
