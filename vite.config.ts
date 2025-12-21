import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Handle client-side routing in development
  server: {
    historyApiFallback: true,
  },
});
```

### Step 4: Configure Your Hosting Provider

**What hosting are you using?** 

If it's **Netlify** (most likely), create `public/_redirects`:
```
/*    /index.html   200
