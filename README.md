# Vite plugin for Aztec

Makes "@aztec/aztec.js" work with Vite.

## Installation

```sh
npm install @nemi-fi/vite-plugin-aztec -D
```

## Usage

`@aztec` packages versions must be pinned in order for this plugin to work correctly. So, remove `^` symbols from package.json:

```diff
- "@aztec/aztec.js": "^0.71.0",
+ "@aztec/aztec.js": "0.71.0",
```

And add `aztec` to your list of plugins:

```ts
import { aztec } from "@nemi-fi/vite-plugin-aztec";

export default defineConfig({
  plugins: [aztec()],
});
```
