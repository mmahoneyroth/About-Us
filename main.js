﻿const { app, BrowserWindow, ipcMain  } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        autoHideMenuBar: true,
        icon: 'images/icon.ico',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')

    win.maximize()
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

