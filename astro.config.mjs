import { defineConfig } from 'astro/config';
import basicSsl from "@vitejs/plugin-basic-ssl";
// import fs from 'fs-extra';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  vite: {
    plugins: [
      basicSsl(),
      // {
      //   name: 'copy-lib',
      //   buildEnd() {
      //     fs.copySync('src/lib', 'dist/lib');
      //   },
      // },
    ],
    server: {
      https: true,
    },
  },
  site: 'https://rgconverter.netlify.app',
  integrations: [sitemap()],
});