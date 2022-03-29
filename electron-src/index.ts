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

function ensureDirectoryExistence (filePath: string) {
  const dirName = dirname(filePath)
  console.log(dirName)
  if (fs.existsSync(dirName)) {
    return true
  }
  ensureDirectoryExistence(dirName)
  fs.mkdirSync(dirName)
}

const configPath = join(app.getPath('userData'), '\\Saves', 'config.json')

let readInterval: null | NodeJS.Timeout = null

// WATCH STATS FILE
ipcMain.on('watchStats', (event: IpcMainEvent) => {
  if (fs.existsSync(configPath)) {
    console.log('CONFIG EXISTS')
    let jsonConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

    if (jsonConfig && jsonConfig.path && fs.existsSync(jsonConfig.path)) {
      console.log('STATS EXISTS')
      // TODO DEV
      const devPath = 'C:\\Users\\krics\\Desktop\\json test\\PlayerProfileSettings_1.json'
      const devPath2 = 'C:\\Users\\krics\\Desktop\\json test\\PlayerProfileSettings_2.json'

      if (readInterval !== null) {
        clearInterval(readInterval)
      }
      readInterval = setInterval(() => {
        // TODO Save level if file changed and send levelAdded event

        // TODO DEV
        let json1 = JSON.parse(fs.readFileSync(devPath, 'utf-8'))
        let json2 = JSON.parse(fs.readFileSync(devPath2, 'utf-8'))

        let json: undefined | JSON
        json = JSON.parse(fs.readFileSync(jsonConfig.path, 'utf-8'))
        console.log('READ')

        event.sender.send('json', { json1: json1, json2: json2, json: json })
      }, 6000)

      setTimeout(() => {
        event.sender.send('watchStatsSuccess', { path: jsonConfig.path })
      }, 1000)

      return
    }
  }
  setTimeout(() => {
    event.sender.send('watchStatsError')
  }, 1000)
})

// FINd PATH
ipcMain.on('findPath', (event, data: { type: string }) => {
  const pathBase = join(app.getPath('home'), '\\AppData\\Local\\Back4Blood\\')
  let path: string | undefined
  let found = false
  switch (data.type) {
    case 'steam':
      found = fs.existsSync(join(pathBase, 'Steam\\Saved\\SaveGames\\PlayerProfileSettings.json'))
      path = join(pathBase, 'Steam\\Saved\\SaveGames\\PlayerProfileSettings.json')
      break
    case 'epic':
      found = fs.existsSync(join(pathBase, 'Epic\\Saved\\SaveGames\\PlayerProfileSettings.json'))
      path = join(pathBase, 'Epic\\Saved\\SaveGames\\PlayerProfileSettings.json')
      break
    case 'xbox':
      break
    default:
      break
  }

  if (found) {
    setTimeout(() => {
      event.sender.send('findPathSuccess', { path: path })
    }, 1000)
  } else {
    setTimeout(() => {
      event.sender.send('findPathError')
    }, 1000)
  }
})

// SAVE PATH TO CONFIG FILE
ipcMain.on('saveConfig', (event, data: { path: string }) => {
  // Ensure the directory is exists
  ensureDirectoryExistence(configPath)
  // Delete old config
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath)
  }
  // Save new config
  fs.writeFileSync(configPath, JSON.stringify({ path: data.path }))
  // Send response
  if (fs.existsSync(configPath)) {
    event.sender.send('saveConfigSuccess')
  } else {
    event.sender.send('saveConfigError')
  }
})

// RESET CONFIG
ipcMain.on('resetConfig', (event) => {
  if (readInterval !== null) {
    clearInterval(readInterval)
  }
  // Delete old config
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath)
  }
  // Send response
  if (!fs.existsSync(configPath)) {
    setTimeout(() => {
      event.sender.send('resetConfigSuccess')
    }, 1000)

  } else {
    setTimeout(() => {
      event.sender.send('resetConfigError')
    }, 1000)

  }
})
