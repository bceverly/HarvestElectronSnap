.PHONY: all deps icons build run install-desktop snap snap-install snap-remove snap-clean clean

NPM := npm
ELECTRON := npx electron --no-sandbox
ELECTRON_BUILDER := npx electron-builder

all: build

# Install node dependencies
deps: node_modules

node_modules: package.json
	$(NPM) install
	@touch node_modules

# Generate PNG icons from the Harvest logo
icons: icons/256x256.png

icons/256x256.png: icons/harvest-original.png
	python3 generate-icons.py

# Build the Electron app (unpacked directory)
build: deps icons
	$(ELECTRON_BUILDER) --linux dir

# Run the app locally for testing
run: deps icons
	$(ELECTRON) .

# Install .desktop file and icon for local dev (shows icon in taskbar)
install-desktop: icons
	mkdir -p $(HOME)/.local/share/applications
	mkdir -p $(HOME)/.local/share/icons/hicolor/256x256/apps
	cp icons/256x256.png $(HOME)/.local/share/icons/hicolor/256x256/apps/harvest-desktop.png
	cp harvest-desktop.desktop $(HOME)/.local/share/applications/harvest-desktop.desktop
	@echo "Desktop file installed. You may need to log out/in or run: gtk-update-icon-cache"

# Build the snap package
snap: build
	snapcraft pack

# Install the snap locally
snap-install:
	sudo snap install --dangerous harvest-desktop_*.snap

# Remove the installed snap
snap-remove:
	sudo snap remove harvest-desktop

# Clean snap build artifacts
snap-clean:
	snapcraft clean 2>/dev/null; true
	rm -f harvest-desktop_*.snap
	rm -rf snap/.snapcraft

# Clean everything
clean: snap-clean
	rm -rf dist
	rm -rf node_modules
	rm -f icons/[0-9]*x[0-9]*.png
