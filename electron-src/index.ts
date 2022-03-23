// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import { app, BrowserWindow, ipcMain, IpcMainEvent, Menu } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'
import * as fs from 'fs'

Menu.setApplicationMenu(null)

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  console.log('Prepare next')

  await prepareNext('./renderer')

  console.log('Next is prepared')

  let mainWindow: BrowserWindow | null = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
      pathname: join(__dirname, '../renderer/out/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(url)
  mainWindow.maximize()
  mainWindow.on('close', () => {
    if (mainWindow) {
      mainWindow.webContents.closeDevTools()
    }
    mainWindow = null
    app.quit()
  })
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})

let readInterval: null | NodeJS.Timeout = null

ipcMain.on('path', (event: IpcMainEvent, jsonPath: string) => {
  console.log(jsonPath)
  if (readInterval !== null) {
    clearInterval(readInterval)
  }
  readInterval = setInterval(() => {
    let json = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
    console.log('READ')
    event.sender.send('json', json)
  }, 6000)

})
