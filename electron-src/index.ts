// Native
import { dirname, join } from 'path'
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

ipcMain.on('path', (event: IpcMainEvent, jsonPaths: { path1: string, path2: string }) => {
  console.log(jsonPaths)
  if (readInterval !== null) {
    clearInterval(readInterval)
  }
  readInterval = setInterval(() => {
    let json = JSON.parse(fs.readFileSync(jsonPaths.path1, 'utf-8'))
    let json2 = JSON.parse(fs.readFileSync(jsonPaths.path2, 'utf-8'))
    // console.log('READ')
    event.sender.send('json', { json1: json, json2: json2 })
  }, 6000)

})

function ensureDirectoryExistence (filePath: string) {
  const dirName = dirname(filePath)
  console.log(dirName)
  if (fs.existsSync(dirName)) {
    return true
  }
  ensureDirectoryExistence(dirName)
  fs.mkdirSync(dirName)
}

ipcMain.on('save', (event: IpcMainEvent, data: { type: 'level' | 'player' | 'deck', json: any }) => {
  console.log(join(app.getPath('userData'), '\\Saves'))
  // console.log(data)
  ensureDirectoryExistence(join(app.getPath('userData'), '\\Saves', data.type + '.json'))
  fs.writeFileSync(join(app.getPath('userData'), '\\Saves', data.type + '.json'), JSON.stringify(data.json))
  event.sender.send('saveSuccess')
})

const playerStatPath = join(app.getPath('userData'), '\\Saves', 'player2.json')

ipcMain.on('getPlayerStat', (_event: IpcMainEvent) => {
  console.log('Check file exist')
  console.log(fs.existsSync(playerStatPath))
})
