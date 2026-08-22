const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_IMAGES_DIR = path.join(__dirname, 'public', 'images');
const FLAGS_DIR = path.join(PUBLIC_IMAGES_DIR, 'flags');

const DIR_TO_SCAN = [
  path.join(__dirname, 'app'),
  path.join(__dirname, 'components'),
  path.join(__dirname, 'lib')
];

// Replaces extensions in TSX files
function processDirectoryForFiles(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectoryForFiles(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const original = content;
      // We know all downloaded images are in /images/ with extensions .jpg or .png (flags)
      // They might be referenced as unsplash-123.jpg or flag-us.png or wiki-xxx.jpg
      content = content.replace(/\/images\/(unsplash|img|wiki)-([^'"`\s]+)\.(jpg|jpeg|png)/g, '/images/$1-$2.webp');
      content = content.replace(/\/images\/flags\/([^'"`\s]+)\.(jpg|jpeg|png)/g, '/images/flags/$1.webp');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`Updated paths in ${fullPath}`);
      }
    }
  }
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const basename = path.basename(filePath, ext);
    const dir = path.dirname(filePath);
    const outPath = path.join(dir, `${basename}.webp`);
    
    try {
      const metadata = await sharp(filePath).metadata();
      const pipeline = sharp(filePath);
      
      // Resize if the image is too large (to save space)
      if (metadata.width && metadata.width > 1200) {
        pipeline.resize(1200);
      }

      await pipeline
        .webp({ quality: 65, effort: 6 }) // quality 65 is usually a good balance for webp to get <100kb
        .toFile(outPath);
        
      // Delete original
      fs.unlinkSync(filePath);
      console.log(`Compressed: ${path.basename(filePath)} -> ${path.basename(outPath)}`);
    } catch (err) {
      console.error(`Error compressing ${filePath}:`, err);
    }
  }
}

async function processImagesInDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      await processImagesInDir(fullPath);
    } else {
      await compressImage(fullPath);
    }
  }
}

async function main() {
  console.log('Compressing images...');
  await processImagesInDir(PUBLIC_IMAGES_DIR);
  
  console.log('Updating code references...');
  for (const dir of DIR_TO_SCAN) {
    if (fs.existsSync(dir)) {
      processDirectoryForFiles(dir);
    }
  }
  
  console.log('All done!');
}

main().catch(console.error);
