import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mediaManifest from "./vite-plugins/media-manifest";

export default defineConfig({
  plugins: [react(), mediaManifest()],
});
