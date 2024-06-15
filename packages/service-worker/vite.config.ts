import { resolve } from 'path'
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [],
    build: {
        outDir: '../../dist/service-worker',
        assetsDir: '.',
        minify: false,
        lib: {
            entry: resolve(__dirname, 'service-worker.ts'),
            fileName: 'service-worker',
            formats: ['es']
        },
        rollupOptions: {
            output: {
                entryFileNames: `service-worker.js`,
                assetFileNames: `service-worker.[name].[ext]`
            }
        }
    }
});