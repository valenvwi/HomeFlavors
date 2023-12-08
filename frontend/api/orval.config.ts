import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './HomeFlavors API.yaml',
    output: {
      baseUrl: 'http://localhost:8000',
      target: './index.ts',
      prettier: true,
    },
  },
});
