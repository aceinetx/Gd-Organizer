const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const { spawn, execSync } = require('child_process');
const https = require('https');
const fs = require('fs');

ipcMain.handle('game:openExternal', async (event, url) => {
  if (url.startsWith('http')) {
    shell.openExternal(url);
  }
});

ipcMain.handle('game:fetchModInfo', async (event, modId) => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.geode-sdk.org',
      path: `/v1/mods/${modId}`,
      method: 'GET',
      headers: { 'User-Agent': 'GD-Organizer-Launcher/1.0' }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.payload || null);
        } catch (e) { resolve(null); }
      });
    });
    req.on('error', () => resolve(null));
    req.end();
  });
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');
}

ipcMain.on('window:minimize', () => {
  BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on('window:close', () => {
  app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('dialog:openFolder', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  return canceled ? null : filePaths[0];
});

ipcMain.handle('dialog:openFile', async (event, filters) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: filters
  });
  return canceled ? null : filePaths[0];
});

ipcMain.handle('game:deleteMod', async (event, folderPath, modFileName) => {
  try {
    const p1 = path.join(folderPath, 'geode', 'mods', modFileName);
    const p2 = path.join(folderPath, 'geode', 'mods', modFileName + '.disabled');
    
    if (fs.existsSync(p1)) fs.unlinkSync(p1);
    if (fs.existsSync(p2)) fs.unlinkSync(p2);
    
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('game:installMod', async (event, folderPath, sourcePath) => {
  try {
    const destDir = path.join(folderPath, 'geode', 'mods');
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    
    const fileName = path.basename(sourcePath);
    const destPath = path.join(destDir, fileName);
    
    fs.copyFileSync(sourcePath, destPath);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('game:getSingleModInfo', async (event, filePath) => {
  try {
    const escapedPath = "'" + filePath.replace(/'/g, "''") + "'";
    const psCmd = `powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; try { $z = [System.IO.Compression.ZipFile]::OpenRead(${escapedPath}); $e = $z.Entries | ?{$_.Name -eq 'mod.json'}; if($e){ $s = $e.Open(); $r = New-Object System.IO.StreamReader($s); $j = $r.ReadToEnd(); $r.Close(); $s.Close(); write-host $j }else{ write-host '{}' }; $z.Dispose(); } catch { write-host '{}' }"`;
    
    const output = execSync(psCmd, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return JSON.parse(output || '{}');
  } catch (err) {
    return {};
  }
});

ipcMain.handle('game:analyze', async (event, folderPath) => {
  let hasGeode = false;
  let version = "2.206";
  
  try {
    const exePath = path.join(folderPath, 'GeometryDash.exe');
    if (!fs.existsSync(exePath)) return { hasGeode: false, version: "Not Found" };

    const indicators = ['Geode.dll', 'geode-loader.dll', 'XInput9_1_0.dll'];
    hasGeode = indicators.some(ind => fs.existsSync(path.join(folderPath, ind)));
    
    
    try {
      const psCmd = `powershell -command "$v = (Get-Item '${exePath}').VersionInfo; if ($v.FileVersion) { $v.FileVersion } elseif ($v.ProductVersion) { $v.ProductVersion } else { '' }"`;
      let result = execSync(psCmd, { encoding: 'utf-8', stdio: 'pipe' }).trim();
      if (result && result !== "0.0.0.0" && result !== "1.0.0.0") version = result;
      else {
        const stats = fs.statSync(exePath);
        const sizeMB = stats.size / (1024 * 1024);
        if (sizeMB < 9) version = "2.1";
        else version = "2.2";
      }
    } catch (e) { value = "Detected"; }
    version = version.replace(/, /g, '.').replace(/,/g, '.').trim();
    if (version.startsWith('1.0.0.')) version = "2.206";
  } catch (err) { version = "Detected"; }

  return { hasGeode, version };
});

ipcMain.handle('game:toggleMod', async (event, folderPath, modId, enabled, modFileName) => {
  try {
    const modsPath = path.join(folderPath, 'geode', 'mods');
    if (!fs.existsSync(modsPath)) return { success: false, error: "Mods folder not found" };

    const files = fs.readdirSync(modsPath);
    // Find the file that matches modId, accounting for .disabled suffix
    const targetFile = files.find(f => {
      const base = f.replace('.geode', '').replace('.disabled', '');
      return base.toLowerCase() === modId.toLowerCase();
    });

    if (!targetFile) return { success: false, error: "Mod file not found" };

    const oldPath = path.join(modsPath, targetFile);
    let newName = targetFile;

    if (enabled) {
      newName = targetFile.replace('.disabled', '');
    } else {
      if (!targetFile.endsWith('.disabled')) {
        newName = targetFile + '.disabled';
      }
    }

    const newPath = path.join(modsPath, newName);
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
    }


    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});

ipcMain.handle('game:getMods', async (event, folderPath) => {
  const modsPath = path.join(folderPath, 'geode', 'mods');
  if (!fs.existsSync(modsPath)) return [];

  // We only look at files now for true folder-based isolation.
  try {
    const files = fs.readdirSync(modsPath).filter(f => f.match(/\.geode(\.disabled)?$/));
    if (files.length === 0) return [];

    const escapedPaths = files.slice(0, 100).map(f => "'" + path.join(modsPath, f).replace(/'/g, "''") + "'").join(',');
    
    const psCmd = `powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; $p = @(${escapedPaths}); $out = @(); foreach($a in $p){ try { $z = [System.IO.Compression.ZipFile]::OpenRead($a); $e = $z.Entries | ?{$_.Name -eq 'mod.json'}; if($e){ $s = $e.Open(); $r = New-Object System.IO.StreamReader($s); $j = $r.ReadToEnd(); $o = $j | ConvertFrom-Json; $d = @(); if($o.dependencies){ if($o.dependencies -is [System.Array]){ foreach($dp in $o.dependencies){ if($dp.id){ $d += $dp.id }else{ $d += $dp } } }else{ foreach($k in $o.dependencies.PSObject.Properties.Name){ $d += $k } } }; $out += [PSCustomObject]@{i=$o.id; n=$o.name; d=$d; desc=$o.description; v=$o.version}; $r.Close(); $s.Close(); }else{ $fn = [System.IO.Path]::GetFileNameWithoutExtension($a).Replace('.geode',''); $out += [PSCustomObject]@{i=$fn; n=$fn; d=@(); desc=''; v='' } }; $z.Dispose(); } catch { $fn = [System.IO.Path]::GetFileNameWithoutExtension($a).Replace('.geode',''); $out += [PSCustomObject]@{i=$fn; n=$fn; d=@(); desc=''; v='' } } }; $out | ConvertTo-Json -Compress"`;
    
    let output = "";
    try {
      output = execSync(psCmd, { encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 15000 }).trim();
    } catch(e) { console.error("PS Failed:", e); }

    let resultsArray = [];
    if (output) {
      try {
        const parsed = JSON.parse(output);
        resultsArray = Array.isArray(parsed) ? parsed : [parsed];
      } catch(e) { console.error("JSON Parse Failed:", e); }
    }

    return files.slice(0, 100).map((file, idx) => {
      const res = resultsArray[idx] || {};
      const id = res.i || file.replace('.geode', '').replace('.disabled', '');
      const name = res.n || id;
      const dependencies = res.d || [];
      const description = res.desc || 'No description available.';
      const version = res.v || 'Unknown';

      return {
        id: id,
        name: name,
        file: file,
        enabled: !file.endsWith('.disabled'),
        dependencies: Array.isArray(dependencies) ? dependencies : [],
        description: description,
        version: version
      };
    });
  } catch (err) {
    console.error("Critical Error in getMods:", err);
    return [];
  }
});

ipcMain.handle('game:launch', async (event, folderPath) => {
  const exePath = path.join(folderPath, 'GeometryDash.exe');
  if (fs.existsSync(exePath)) {
    const child = spawn(exePath, [], { cwd: folderPath, detached: true });
    child.unref();
    return { success: true };
  }
  return { success: false, error: 'File not found' };
});

ipcMain.handle('catalog:browse', async (event, page, query) => {
  return new Promise((resolve) => {
    let url = `https://api.geode-sdk.org/v1/mods?page=${page}&per_page=15&gd=2.2081&platforms=win`;
    if (query) url += `&query=${encodeURIComponent(query)}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const mods = (json.payload?.data || []).map(m => {
            const v = m.versions?.[0] || {};
            const dev = m.developers?.find(d => d.is_owner);
            return {
              id: m.id,
              name: v.name || m.id,
              description: v.description || '',
              version: v.version || '?',
              developer: dev?.display_name || 'Unknown',
              downloads: m.download_count || 0,
              download_link: v.download_link || null,
              featured: m.featured || false
            };
          });
          resolve({ mods, total: json.payload?.count || 0 });
        } catch (e) { resolve({ mods: [], total: 0 }); }
      });
    }).on('error', () => resolve({ mods: [], total: 0 }));
  });
});

ipcMain.handle('catalog:download', async (event, folderPath, downloadUrl, modId) => {
  const sender = event.sender;
  return new Promise((resolve) => {
    const modsPath = path.join(folderPath, 'geode', 'mods');
    if (!fs.existsSync(modsPath)) {
      try { fs.mkdirSync(modsPath, { recursive: true }); } catch(e) { return resolve({ success: false, error: e.message }); }
    }
    const destFile = path.join(modsPath, `${modId}.geode`);

    const doDownload = (url) => {
      https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return doDownload(res.headers.location);
        }
        const totalBytes = parseInt(res.headers['content-length'] || '0', 10);
        let downloaded = 0;

        const ws = fs.createWriteStream(destFile);
        res.on('data', (chunk) => {
          downloaded += chunk.length;
          if (totalBytes > 0) {
            const pct = Math.round((downloaded / totalBytes) * 100);
            try { sender.send('download-progress', pct); } catch(e) {}
          }
        });
        res.pipe(ws);
        ws.on('finish', () => { ws.close(); resolve({ success: true }); });
        ws.on('error', (e) => resolve({ success: false, error: e.message }));
      }).on('error', (e) => resolve({ success: false, error: e.message }));
    };
    doDownload(downloadUrl);
  });
});
