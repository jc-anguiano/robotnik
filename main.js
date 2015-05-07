var app = require('app');
var BrowserWindow = require('browser-window');
var Tray = require('tray');
var vm = require('vm');
var ipc = require('ipc');

ipc.on('code', function(event, code) {
  console.log( code );
  var sandbox = {
    require: require
  };
  vm.runInNewContext( code, sandbox );
  // console.log( sandbox );
});

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    title: 'Robotnik'
  });

  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/static/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
