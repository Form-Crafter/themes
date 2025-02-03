import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import aliases from './aliases.json'
import pkg from './package.json'

const getAlias = (path: string) => resolve(__dirname, path)

export default defineConfig({
    build: {
        outDir: './dist',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: 'index',
            formats: ['es'],
        },
        target: ['esnext'],
        rollupOptions: {
            external: [...Object.keys(pkg.peerDependencies || {}), 'react/jsx-runtime'],
        },
    },
    resolve: {
        alias: Object.entries(aliases).reduce(
            (res, [key, value]) => ({
                ...res,
                [key]: getAlias(`src/${value}`),
            }),
            {},
        ),
    },
    plugins: [dts()],
})
