import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

export default defineConfig({
  base: './',
  test: {
    globals: true,
    environment: 'jsdom',
  },
});