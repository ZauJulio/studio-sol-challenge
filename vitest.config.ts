import { defineConfig } from 'vitest/config';
import * as tsconfig from './tsconfig.json';

const root = './src';

// Load tsconfig.json path aliases
const alias = Object.entries(tsconfig.compilerOptions.paths).reduce(
  (acc, [key, value]) => {
    const _alias = key;
    const _path = value[0];

    if (!_path.startsWith(root)) acc[_alias] = `${root}/${_path}`;

    return acc;
  },
  {},
);

export default defineConfig({ resolve: { alias } });
