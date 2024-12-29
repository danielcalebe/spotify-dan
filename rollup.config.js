import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js', // Adjust to your entry point
  output: {
    file: 'dist/bundle.js',
    format: 'cjs', // or 'es', 'iife', etc., depending on your needs
  },
  plugins: [
    resolve(), // Node resolve plugin
    commonjs(), // CommonJS plugin
  ],
};
