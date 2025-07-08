import fs from 'fs-extra';
import path from 'path';

const dir = "dist";

const sourcePath = path.join(dir, 'sitemap-0.xml');
const destPath = path.join(dir, 'sitemap.xml');

const waitForSitemap = async () => {
  while (true) {
    if (fs.existsSync(sourcePath)) {
      fs.copySync(sourcePath, destPath);
      console.log('Added sitemap.xml from sitemap-0.xml');
      break;
    } else {
      console.log('sitemap-0.xml not found, retrying in 500ms...');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
};

waitForSitemap();