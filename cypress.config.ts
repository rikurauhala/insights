import { defineConfig } from 'cypress'

export default defineConfig({
  retries: 3,
  e2e: {
    baseUrl: 'http://localhost:5173',
  },
})
