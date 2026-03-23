# Harvest Desktop

An Electron wrapper that packages the [Harvest](https://www.getharvest.com/) web-based time tracking application as a native Linux desktop app, distributed as a snap.

## Prerequisites

- Node.js and npm
- Python 3 with Pillow (`pip install Pillow`)
- snapcraft (`sudo snap install snapcraft --classic`)

## Quick Start

```bash
# Run locally for testing
make run

# Build and package as a snap
make snap

# Install the snap
make snap-install
```

## Makefile Targets

| Target | Description |
|---|---|
| `make deps` | Install Node.js dependencies |
| `make icons` | Generate PNG icons from the Harvest logo |
| `make lint` | Lint JavaScript (ESLint) and Python (ruff) source files |
| `make test` | Run unit tests using Node.js built-in test runner |
| `make build` | Build the Electron app (unpacked dir in `dist/`) |
| `make run` | Launch the app locally for testing |
| `make install-desktop` | Install `.desktop` file and icon for taskbar integration |
| `make snap` | Build the app and package it as a `.snap` |
| `make snap-install` | Install the built snap locally |
| `make snap-remove` | Remove the installed snap |
| `make snap-clean` | Clean snap build artifacts |
| `make clean` | Remove all build artifacts |

## How It Works

This is a thin Electron shell around the Harvest web interface at `https://id.getharvest.com/accounts`. It does not use any Harvest APIs. You log in with your existing Harvest credentials just as you would in a browser.

Features:
- Standard menu bar with navigation (back, forward, home)
- Keyboard shortcuts (Alt+Left/Right for back/forward, Alt+Home)
- External links open in your default browser
- Session persistence across restarts
- Harvest logo in the taskbar and window title

## Snap Details

- **Base:** core24
- **Confinement:** strict
- **Plugs:** network, browser-support, audio-playback, screen-inhibit-control

## License

BSD 2-Clause. See [LICENSE](LICENSE).
