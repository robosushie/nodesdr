# NodeSDR

A universal Software Defined Radio (SDR) library for Node.js with native C++ bindings. Starting with PlutoSDR/AD9361 support and designed to be extensible for other SDR platforms.

## Features

- 🚀 High-performance native C++ implementation with Node.js bindings
- 📡 PlutoSDR/AD9361 support (initial target)
- 🔌 Plugin architecture for extensible SDR platform support
- 📦 Modern ESM module support
- 🛠️ TypeScript definitions included
- 🏗️ Cross-platform support (Windows, Linux, macOS)
- ⚡ NAPI 9 for optimal performance and compatibility

## Installation

```bash
pnpm add nodesdr
```

### Prerequisites

- Node.js >= 18.0.0
- Python 3.x (for node-gyp)
- C++ compiler toolchain

#### Platform-specific requirements:

**Windows:**
- Visual Studio Build Tools or Visual Studio Community

**Linux:**
- build-essential package
- libusb-1.0-dev (for PlutoSDR support)

**macOS:**
- Xcode Command Line Tools

## Quick Start

```typescript
import { PlutoSDR, SampleFormat } from 'nodesdr';

// Initialize PlutoSDR
const sdr = new PlutoSDR();

// Configure device
await sdr.connect();
await sdr.setSampleRate(2.4e6);
await sdr.setCenterFrequency(100e6);
await sdr.setGain(30);

// Start receiving samples
sdr.on('samples', (samples: Float32Array) => {
  console.log(`Received ${samples.length} samples`);
});

await sdr.startRx();

// Cleanup
await sdr.stop();
await sdr.disconnect();
```

## API Reference

### PlutoSDR Class

#### Constructor
```typescript
const sdr = new PlutoSDR(options?: PlutoSDROptions);
```

#### Methods

##### Connection Management
- `connect(uri?: string): Promise<void>` - Connect to PlutoSDR device
- `disconnect(): Promise<void>` - Disconnect from device
- `isConnected(): boolean` - Check connection status

##### Configuration
- `setSampleRate(rate: number): Promise<void>` - Set sample rate in Hz
- `getSampleRate(): Promise<number>` - Get current sample rate
- `setCenterFrequency(freq: number): Promise<void>` - Set center frequency in Hz
- `getCenterFrequency(): Promise<number>` - Get current center frequency
- `setGain(gain: number): Promise<void>` - Set gain in dB
- `getGain(): Promise<number>` - Get current gain

##### Data Streaming
- `startRx(): Promise<void>` - Start receiving samples
- `stopRx(): Promise<void>` - Stop receiving samples
- `startTx(): Promise<void>` - Start transmitting samples
- `stopTx(): Promise<void>` - Stop transmitting samples

#### Events
- `samples` - Emitted when new samples are available
- `error` - Emitted on errors
- `connected` - Emitted when device connects
- `disconnected` - Emitted when device disconnects

## Examples

See the [examples](./examples/) directory for more comprehensive usage examples:

- [basic-rx.js](./examples/basic-rx.js) - Basic receiver example
- [spectrum-analyzer.js](./examples/spectrum-analyzer.js) - Simple spectrum analyzer
- [fm-demod.js](./examples/fm-demod.js) - FM demodulation example

## Building from Source

```bash
# Clone repository
git clone https://github.com/yourusername/nodesdr.git
cd nodesdr

# Install dependencies
pnpm install

# Build native addon and TypeScript
pnpm run build

# Run tests
pnpm test
```

## Development

```bash
# Development build with watch mode
pnpm run dev

# Lint and format code
pnpm run lint
pnpm run format

# Clean build artifacts
pnpm run clean
```

## Plugin Architecture

NodeSDR is designed with a plugin architecture to support multiple SDR platforms:

```typescript
import { registerPlugin } from 'nodesdr';
import { MyCustomSDR } from './my-custom-sdr-plugin';

// Register custom SDR plugin
registerPlugin('MyCustomSDR', MyCustomSDR);

// Use custom SDR
const sdr = new MyCustomSDR();
```

## Supported Platforms

| Platform | Status | Notes |
|----------|--------|-------|
| PlutoSDR/AD9361 | ✅ Supported | Primary target platform |
| RTL-SDR | 🚧 Planned | Future release |
| HackRF | 🚧 Planned | Future release |
| BladeRF | 🚧 Planned | Future release |

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/yourusername/nodesdr/wiki)
- 🐛 [Bug Reports](https://github.com/yourusername/nodesdr/issues)
- 💬 [Discussions](https://github.com/yourusername/nodesdr/discussions)

## Acknowledgments

- [libiio](https://github.com/analogdevicesinc/libiio) - Industrial I/O library
- [node-addon-api](https://github.com/nodejs/node-addon-api) - Node.js native addon API
- PlutoSDR community and Analog Devices

---

**Note:** This is an early-stage project. APIs may change before v1.0.0 release.