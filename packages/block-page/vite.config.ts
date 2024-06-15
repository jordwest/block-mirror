import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin({hot: false})],
    build: {
        outDir: '../../dist/block-page',
        assetsDir: '.',
        minify: false,
        rollupOptions: {
            output: {
                entryFileNames: `block-page.js`,
                assetFileNames: `block-page.[name].[ext]`
            }
        }
    }
});