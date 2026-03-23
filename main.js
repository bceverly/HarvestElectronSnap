const { app, BrowserWindow, shell, Menu, nativeImage } = require('electron');
const path = require('path');

const HARVEST_URL = 'https://id.getharvest.com/accounts';

function createWindow() {
  // Load multiple icon sizes for best taskbar/dock display
  const iconSizes = [16, 32, 48, 64, 128, 256];
  const icon = nativeImage.createEmpty();
  for (const size of iconSizes) {
    const img = nativeImage.createFromPath(
      path.join(__dirname, 'icons', `${size}x${size}.png`)
    );
    icon.addRepresentation({ width: size, height: size, buffer: img.toPNG() });
  }

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: icon,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true
    }
  });

  // Build a simple menu with standard editing and navigation
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Go',
      submenu: [
        {
          label: 'Back',
          accelerator: 'Alt+Left',
          click: () => {
            const focused = BrowserWindow.getFocusedWindow();
            if (focused && focused.webContents.navigationHistory.canGoBack()) {
              focused.webContents.navigationHistory.goBack();
            }
          }
        },
        {
          label: 'Forward',
          accelerator: 'Alt+Right',
          click: () => {
            const focused = BrowserWindow.getFocusedWindow();
            if (focused && focused.webContents.navigationHistory.canGoForward()) {
              focused.webContents.navigationHistory.goForward();
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Home',
          accelerator: 'Alt+Home',
          click: () => {
            const focused = BrowserWindow.getFocusedWindow();
            if (focused) {
              focused.loadURL(HARVEST_URL);
            }
          }
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  // Open external links in the system browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    const harvestDomains = [
      'getharvest.com',
      'harvestapp.com',
      'id.getharvest.com'
    ];
    const parsed = new URL(url);
    if (harvestDomains.some(d => parsed.hostname.endsWith(d))) {
      return { action: 'allow' };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });

  win.loadURL(HARVEST_URL);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
