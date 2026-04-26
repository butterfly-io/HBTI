import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 重点！和你的仓库名完全一致
  base: '/HBTI/'
});

