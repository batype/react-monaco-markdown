import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'react-monaco-markdown',
  },
  cssMinifier: 'esbuild',
  mfsu: {
    esbuild: true,
  },
});
