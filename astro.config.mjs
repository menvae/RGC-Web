import { defineConfig } from 'astro/config';
import basicSsl from "@vitejs/plugin-basic-ssl";
import sitemap from '@astrojs/sitemap';
// import fs from 'fs-extra';

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
