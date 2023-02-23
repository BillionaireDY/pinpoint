import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'index': 'components/index.ts',
  },
  splitting: true,
  dts: true,
  format: ['cjs', 'esm'],
  external: ['react'],
});