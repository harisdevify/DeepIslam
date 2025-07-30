import tailwindcss from '@tailwindcss/vite'; // ✅ this must exist if you're using it
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
