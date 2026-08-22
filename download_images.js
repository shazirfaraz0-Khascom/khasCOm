const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const DIR_TO_SCAN = [
  path.join(__dirname, 'app'),
  path.join(__dirname, 'components'),
  path.join(__dirname, 'lib')
];
const PUBLIC_IMAGES_DIR = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
  fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
}

// Regex to find https:// images
const urlRegex = /https:\/\/(images\.unsplash\.com|upload\.wikimedia\.org)[^"'\s`)]+/g;

const urlMap = new Map();

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    }).on('error', reject);
  });
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

const filesToUpdate = [];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let match;
  let matches = [];
  while ((match = urlRegex.exec(content)) !== null) {
    matches.push(match[0]);
  }
  
  if (matches.length > 0) {
    filesToUpdate.push({ filePath, urls: [...new Set(matches)] });
  }
}

async function main() {
  for (const dir of DIR_TO_SCAN) {
    if (fs.existsSync(dir)) {
      processDirectory(dir);
    }
  }

  console.log(`Found ${filesToUpdate.length} files to update.`);

  for (const fileObj of filesToUpdate) {
    let content = fs.readFileSync(fileObj.filePath, 'utf-8');
    let contentChanged = false;

    for (const url of fileObj.urls) {
      if (url.includes('${')) {
        console.log(`Skipping template URL: ${url}`);
        continue;
      }

      const cleanUrl = url.replace(/&amp;/g, '&');
      
      let localFilename;
      if (cleanUrl.includes('unsplash.com')) {
        const match = cleanUrl.match(/photo-([a-zA-Z0-9-]+)/);
        const id = match ? match[1] : crypto.createHash('md5').update(cleanUrl).digest('hex');
        localFilename = `unsplash-${id}.jpg`;
      } else if (cleanUrl.includes('wikimedia.org')) {
        const parts = cleanUrl.split('/');
        let name = parts[parts.length - 1];
        // Handle SVG by ensuring it ends with .svg
        if (name.includes('.svg')) {
          name = name.split('?')[0];
        }
        localFilename = `wiki-${name}`;
      } else {
        localFilename = `img-${crypto.createHash('md5').update(cleanUrl).digest('hex')}.jpg`;
      }

      const destPath = path.join(PUBLIC_IMAGES_DIR, localFilename);
      const localUrl = `/images/${localFilename}`;

      if (!urlMap.has(cleanUrl)) {
        console.log(`Downloading ${cleanUrl} -> ${localFilename}`);
        try {
          await downloadImage(cleanUrl, destPath);
          urlMap.set(cleanUrl, localUrl);
        } catch (e) {
          console.error(`Error downloading ${cleanUrl}:`, e.message);
          continue;
        }
      }

      const mappedUrl = urlMap.get(cleanUrl);
      if (mappedUrl) {
        const oldContent = content;
        content = content.split(url).join(mappedUrl);
        if (content !== oldContent) {
          contentChanged = true;
        }
      }
    }

    if (contentChanged) {
      fs.writeFileSync(fileObj.filePath, content, 'utf-8');
      console.log(`Updated ${fileObj.filePath}`);
    }
  }

  // Also download the flags used in ExportCountriesBanner
  const flags = ["us", "ca", "gb", "de", "fr", "sa", "ae", "qa", "au"];
  const FLAGS_DIR = path.join(PUBLIC_IMAGES_DIR, 'flags');
  if (!fs.existsSync(FLAGS_DIR)) fs.mkdirSync(FLAGS_DIR, { recursive: true });

  for (const flag of flags) {
    const flagUrl = `https://flagcdn.com/w160/${flag}.png`;
    const destPath = path.join(FLAGS_DIR, `${flag}.png`);
    if (!fs.existsSync(destPath)) {
      console.log(`Downloading flag ${flagUrl}`);
      try {
        await downloadImage(flagUrl, destPath);
      } catch (e) {
        console.error(`Error downloading ${flagUrl}:`, e.message);
      }
    }
  }

  console.log('All done!');
}

main().catch(console.error);
