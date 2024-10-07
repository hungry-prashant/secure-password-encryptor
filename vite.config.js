import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs'; // CommonJS plugin
import dts from 'rollup-plugin-dts';
import esbuild from 'esbuild'; // Ensures esbuild is correctly used for processing

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'SecurePasswordEncryptor',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        'string-width',        // Exclude problematic modules
        '@mapbox/node-pre-gyp', // Exclude node-pre-gyp
        /\.d\.ts$/             // Ignore .d.ts files
      ],
      output: {
        globals: {
          bcrypt: 'bcrypt',
        },
      },
      plugins: [
        commonjs(), // Handle CommonJS modules
      ],
    },
    esbuild: {
        exclude: [/\.d\.ts$/, /\.namespace\.js$/], // Skip transforming declaration files and namespaces
      }
      
  },
  plugins: [
    dts(), // To bundle TypeScript declarations if needed
  ],
});
