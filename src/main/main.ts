/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { resolveHtmlPath } from './util';



class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 600,
    minHeight:600,
    minWidth:1024,
    icon: getAssetPath('name.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
        devTools:false,
    },
    
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });
  mainWindow.removeMenu()
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  //const menuBuilder = new MenuBuilder(mainWindow);
  //menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);


  // --------------------setup database-------------------//
  
  const sqlite3 = require('sqlite3').verbose();
  const dbPath = path.resolve(__dirname, './database.db');

  const db = new sqlite3.Database(dbPath, (error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
    } else {
      console.log('Connected to the database');
      // Perform database operations here
    }
  });


  ipcMain.on('get-data',async(event,arg)=>{
 db.all('select * from invoices',(error,rows)=>{
     if(error){
       console.log(error)
     }
     else{
      event.reply('get-data',rows)
     }
   })
    
  })
  ipcMain.on('delete-by-id',async(event,arg)=>{
    db.run('delete from invoices where id == ? ',arg)
  })
  ipcMain.on('put-data',async(event,arg)=>{
   let i=0;
    db.run('insert into invoices (billfrom,billto,recipientemail,title,start_date,end_date,invoice_amount,status,items_id) values (?,?,?,?,?,?,?,?,?)',[arg.invoiceToAdd.BillFrom,arg.invoiceToAdd.BillTo,arg.invoiceToAdd.RecipientEmail,arg.invoiceToAdd.BillTitle,arg.invoiceToAdd.IssuedOn,arg.invoiceToAdd.DueOn,arg.price,arg.invoiceToAdd.status,arg.generatedjoin])
    do{

      db.run('insert into items (name,price,qty,invoice_id) values (?,?,?,?)',[arg.invoiceToAdd.ItemsList[i].Name,arg.invoiceToAdd.ItemsList[i].Price,arg.invoiceToAdd.ItemsList[i].Qty,arg.generatedjoin])
      i++;
    }while(i<arg.invoiceToAdd.ItemsList.length)  
      
  })

  ipcMain.on('get-by-id',async(event,arg)=>{
    db.all(`select * from invoices inner join items on invoices.items_id =items.invoice_id and invoices.id==${arg} `,(error,rows)=>{
      event.reply('get-by-id',rows);
    })
  })


