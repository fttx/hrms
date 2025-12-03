// vite.config.js
import { defineConfig } from "file:///workspace/frappe-bench/apps/hrms/frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///workspace/frappe-bench/apps/hrms/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { VitePWA } from "file:///workspace/frappe-bench/apps/hrms/frontend/node_modules/vite-plugin-pwa/dist/index.js";
import frappeui from "file:///workspace/frappe-bench/apps/hrms/frontend/node_modules/frappe-ui/vite.js";
import path from "path";
import fs from "fs";
var __vite_injected_original_dirname = "/workspace/frappe-bench/apps/hrms/frontend";
var vite_config_default = defineConfig({
  server: {
    port: 8080,
    proxy: getProxyOptions()
  },
  plugins: [
    vue(),
    frappeui(),
    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      injectRegister: null,
      devOptions: {
        enabled: true
      },
      manifest: {
        display: "standalone",
        name: "Frappe HR",
        short_name: "Frappe HR",
        start_url: "/hrms",
        description: "Everyday HR & Payroll operations at your fingertips",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/assets/hrms/manifest/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/assets/hrms/manifest/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/assets/hrms/manifest/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/assets/hrms/manifest/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  build: {
    outDir: "../hrms/public/frontend",
    emptyOutDir: true,
    target: "es2015",
    commonjsOptions: {
      include: [/tailwind.config.js/, /node_modules/]
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "frappe-ui": ["frappe-ui"]
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      "frappe-ui > feather-icons",
      "showdown",
      "tailwind.config.js",
      "engine.io-client"
    ]
  }
});
function getProxyOptions() {
  const config = getCommonSiteConfig();
  const webserver_port = config ? config.webserver_port : 8e3;
  if (!config) {
    console.log("No common_site_config.json found, using default port 8000");
  }
  return {
    "^/(app|login|api|assets|files|private)": {
      target: `http://127.0.0.1:${webserver_port}`,
      ws: true,
      router: function(req) {
        const site_name = req.headers.host.split(":")[0];
        console.log(`Proxying ${req.url} to ${site_name}:${webserver_port}`);
        return `http://${site_name}:${webserver_port}`;
      }
    }
  };
}
function getCommonSiteConfig() {
  let currentDir = path.resolve(".");
  while (currentDir !== "/") {
    if (fs.existsSync(path.join(currentDir, "sites")) && fs.existsSync(path.join(currentDir, "apps"))) {
      let configPath = path.join(currentDir, "sites", "common_site_config.json");
      if (fs.existsSync(configPath)) {
        return JSON.parse(fs.readFileSync(configPath));
      }
      return null;
    }
    currentDir = path.resolve(currentDir, "..");
  }
  return null;
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvd29ya3NwYWNlL2ZyYXBwZS1iZW5jaC9hcHBzL2hybXMvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi93b3Jrc3BhY2UvZnJhcHBlLWJlbmNoL2FwcHMvaHJtcy9mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vd29ya3NwYWNlL2ZyYXBwZS1iZW5jaC9hcHBzL2hybXMvZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIlxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIlxuaW1wb3J0IGZyYXBwZXVpIGZyb20gXCJmcmFwcGUtdWkvdml0ZVwiXG5cbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRzZXJ2ZXI6IHtcblx0XHRwb3J0OiA4MDgwLFxuXHRcdHByb3h5OiBnZXRQcm94eU9wdGlvbnMoKSxcblx0fSxcblx0cGx1Z2luczogW1xuXHRcdHZ1ZSgpLFxuXHRcdGZyYXBwZXVpKCksXG5cdFx0Vml0ZVBXQSh7XG5cdFx0XHRyZWdpc3RlclR5cGU6IFwiYXV0b1VwZGF0ZVwiLFxuXHRcdFx0c3RyYXRlZ2llczogXCJpbmplY3RNYW5pZmVzdFwiLFxuXHRcdFx0aW5qZWN0UmVnaXN0ZXI6IG51bGwsXG5cdFx0XHRkZXZPcHRpb25zOiB7XG5cdFx0XHRcdGVuYWJsZWQ6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0bWFuaWZlc3Q6IHtcblx0XHRcdFx0ZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG5cdFx0XHRcdG5hbWU6IFwiRnJhcHBlIEhSXCIsXG5cdFx0XHRcdHNob3J0X25hbWU6IFwiRnJhcHBlIEhSXCIsXG5cdFx0XHRcdHN0YXJ0X3VybDogXCIvaHJtc1wiLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogXCJFdmVyeWRheSBIUiAmIFBheXJvbGwgb3BlcmF0aW9ucyBhdCB5b3VyIGZpbmdlcnRpcHNcIixcblx0XHRcdFx0dGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxuXHRcdFx0XHRpY29uczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogXCIvYXNzZXRzL2hybXMvbWFuaWZlc3QvbWFuaWZlc3QtaWNvbi0xOTIubWFza2FibGUucG5nXCIsXG5cdFx0XHRcdFx0XHRzaXplczogXCIxOTJ4MTkyXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcImltYWdlL3BuZ1wiLFxuXHRcdFx0XHRcdFx0cHVycG9zZTogXCJhbnlcIixcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHNyYzogXCIvYXNzZXRzL2hybXMvbWFuaWZlc3QvbWFuaWZlc3QtaWNvbi0xOTIubWFza2FibGUucG5nXCIsXG5cdFx0XHRcdFx0XHRzaXplczogXCIxOTJ4MTkyXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcImltYWdlL3BuZ1wiLFxuXHRcdFx0XHRcdFx0cHVycG9zZTogXCJtYXNrYWJsZVwiLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3JjOiBcIi9hc3NldHMvaHJtcy9tYW5pZmVzdC9tYW5pZmVzdC1pY29uLTUxMi5tYXNrYWJsZS5wbmdcIixcblx0XHRcdFx0XHRcdHNpemVzOiBcIjUxMng1MTJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG5cdFx0XHRcdFx0XHRwdXJwb3NlOiBcImFueVwiLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0c3JjOiBcIi9hc3NldHMvaHJtcy9tYW5pZmVzdC9tYW5pZmVzdC1pY29uLTUxMi5tYXNrYWJsZS5wbmdcIixcblx0XHRcdFx0XHRcdHNpemVzOiBcIjUxMng1MTJcIixcblx0XHRcdFx0XHRcdHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG5cdFx0XHRcdFx0XHRwdXJwb3NlOiBcIm1hc2thYmxlXCIsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0fSksXG5cdF0sXG5cdHJlc29sdmU6IHtcblx0XHRhbGlhczoge1xuXHRcdFx0XCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjXCIpLFxuXHRcdH0sXG5cdH0sXG5cdGJ1aWxkOiB7XG5cdFx0b3V0RGlyOiBcIi4uL2hybXMvcHVibGljL2Zyb250ZW5kXCIsXG5cdFx0ZW1wdHlPdXREaXI6IHRydWUsXG5cdFx0dGFyZ2V0OiBcImVzMjAxNVwiLFxuXHRcdGNvbW1vbmpzT3B0aW9uczoge1xuXHRcdFx0aW5jbHVkZTogWy90YWlsd2luZC5jb25maWcuanMvLCAvbm9kZV9tb2R1bGVzL10sXG5cdFx0fSxcblx0XHRzb3VyY2VtYXA6IHRydWUsXG5cdFx0cm9sbHVwT3B0aW9uczoge1xuXHRcdFx0b3V0cHV0OiB7XG5cdFx0XHRcdG1hbnVhbENodW5rczoge1xuXHRcdFx0XHRcdFwiZnJhcHBlLXVpXCI6IFtcImZyYXBwZS11aVwiXSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSxcblx0b3B0aW1pemVEZXBzOiB7XG5cdFx0aW5jbHVkZTogW1xuXHRcdFx0XCJmcmFwcGUtdWkgPiBmZWF0aGVyLWljb25zXCIsXG5cdFx0XHRcInNob3dkb3duXCIsXG5cdFx0XHRcInRhaWx3aW5kLmNvbmZpZy5qc1wiLFxuXHRcdFx0XCJlbmdpbmUuaW8tY2xpZW50XCIsXG5cdFx0XSxcblx0fSxcbn0pXG5cbmZ1bmN0aW9uIGdldFByb3h5T3B0aW9ucygpIHtcblx0Y29uc3QgY29uZmlnID0gZ2V0Q29tbW9uU2l0ZUNvbmZpZygpXG5cdGNvbnN0IHdlYnNlcnZlcl9wb3J0ID0gY29uZmlnID8gY29uZmlnLndlYnNlcnZlcl9wb3J0IDogODAwMFxuXHRpZiAoIWNvbmZpZykge1xuXHRcdGNvbnNvbGUubG9nKFwiTm8gY29tbW9uX3NpdGVfY29uZmlnLmpzb24gZm91bmQsIHVzaW5nIGRlZmF1bHQgcG9ydCA4MDAwXCIpXG5cdH1cblx0cmV0dXJuIHtcblx0XHRcIl4vKGFwcHxsb2dpbnxhcGl8YXNzZXRzfGZpbGVzfHByaXZhdGUpXCI6IHtcblx0XHRcdHRhcmdldDogYGh0dHA6Ly8xMjcuMC4wLjE6JHt3ZWJzZXJ2ZXJfcG9ydH1gLFxuXHRcdFx0d3M6IHRydWUsXG5cdFx0XHRyb3V0ZXI6IGZ1bmN0aW9uIChyZXEpIHtcblx0XHRcdFx0Y29uc3Qgc2l0ZV9uYW1lID0gcmVxLmhlYWRlcnMuaG9zdC5zcGxpdChcIjpcIilbMF1cblx0XHRcdFx0Y29uc29sZS5sb2coYFByb3h5aW5nICR7cmVxLnVybH0gdG8gJHtzaXRlX25hbWV9OiR7d2Vic2VydmVyX3BvcnR9YClcblx0XHRcdFx0cmV0dXJuIGBodHRwOi8vJHtzaXRlX25hbWV9OiR7d2Vic2VydmVyX3BvcnR9YFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9XG59XG5cbmZ1bmN0aW9uIGdldENvbW1vblNpdGVDb25maWcoKSB7XG5cdGxldCBjdXJyZW50RGlyID0gcGF0aC5yZXNvbHZlKFwiLlwiKVxuXHQvLyB0cmF2ZXJzZSB1cCB0aWxsIHdlIGZpbmQgZnJhcHBlLWJlbmNoIHdpdGggc2l0ZXMgZGlyZWN0b3J5XG5cdHdoaWxlIChjdXJyZW50RGlyICE9PSBcIi9cIikge1xuXHRcdGlmIChcblx0XHRcdGZzLmV4aXN0c1N5bmMocGF0aC5qb2luKGN1cnJlbnREaXIsIFwic2l0ZXNcIikpICYmXG5cdFx0XHRmcy5leGlzdHNTeW5jKHBhdGguam9pbihjdXJyZW50RGlyLCBcImFwcHNcIikpXG5cdFx0KSB7XG5cdFx0XHRsZXQgY29uZmlnUGF0aCA9IHBhdGguam9pbihjdXJyZW50RGlyLCBcInNpdGVzXCIsIFwiY29tbW9uX3NpdGVfY29uZmlnLmpzb25cIilcblx0XHRcdGlmIChmcy5leGlzdHNTeW5jKGNvbmZpZ1BhdGgpKSB7XG5cdFx0XHRcdHJldHVybiBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhjb25maWdQYXRoKSlcblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHRcdGN1cnJlbnREaXIgPSBwYXRoLnJlc29sdmUoY3VycmVudERpciwgXCIuLlwiKVxuXHR9XG5cdHJldHVybiBudWxsXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdULFNBQVMsb0JBQW9CO0FBQzdVLE9BQU8sU0FBUztBQUNoQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxjQUFjO0FBRXJCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFFBQVE7QUFOZixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixRQUFRO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPLGdCQUFnQjtBQUFBLEVBQ3hCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixJQUFJO0FBQUEsSUFDSixTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsTUFDUCxjQUFjO0FBQUEsTUFDZCxZQUFZO0FBQUEsTUFDWixnQkFBZ0I7QUFBQSxNQUNoQixZQUFZO0FBQUEsUUFDWCxTQUFTO0FBQUEsTUFDVjtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1QsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osV0FBVztBQUFBLFFBQ1gsYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ047QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNWO0FBQUEsVUFDQTtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsWUFDQyxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDVjtBQUFBLFVBQ0E7QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNWO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxJQUNELENBQUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDbkM7QUFBQSxFQUNEO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixpQkFBaUI7QUFBQSxNQUNoQixTQUFTLENBQUMsc0JBQXNCLGNBQWM7QUFBQSxJQUMvQztBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2QsUUFBUTtBQUFBLFFBQ1AsY0FBYztBQUFBLFVBQ2IsYUFBYSxDQUFDLFdBQVc7QUFBQSxRQUMxQjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ2IsU0FBUztBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7QUFFRCxTQUFTLGtCQUFrQjtBQUMxQixRQUFNLFNBQVMsb0JBQW9CO0FBQ25DLFFBQU0saUJBQWlCLFNBQVMsT0FBTyxpQkFBaUI7QUFDeEQsTUFBSSxDQUFDLFFBQVE7QUFDWixZQUFRLElBQUksMkRBQTJEO0FBQUEsRUFDeEU7QUFDQSxTQUFPO0FBQUEsSUFDTiwwQ0FBMEM7QUFBQSxNQUN6QyxRQUFRLG9CQUFvQixjQUFjO0FBQUEsTUFDMUMsSUFBSTtBQUFBLE1BQ0osUUFBUSxTQUFVLEtBQUs7QUFDdEIsY0FBTSxZQUFZLElBQUksUUFBUSxLQUFLLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDL0MsZ0JBQVEsSUFBSSxZQUFZLElBQUksR0FBRyxPQUFPLFNBQVMsSUFBSSxjQUFjLEVBQUU7QUFDbkUsZUFBTyxVQUFVLFNBQVMsSUFBSSxjQUFjO0FBQUEsTUFDN0M7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNEO0FBRUEsU0FBUyxzQkFBc0I7QUFDOUIsTUFBSSxhQUFhLEtBQUssUUFBUSxHQUFHO0FBRWpDLFNBQU8sZUFBZSxLQUFLO0FBQzFCLFFBQ0MsR0FBRyxXQUFXLEtBQUssS0FBSyxZQUFZLE9BQU8sQ0FBQyxLQUM1QyxHQUFHLFdBQVcsS0FBSyxLQUFLLFlBQVksTUFBTSxDQUFDLEdBQzFDO0FBQ0QsVUFBSSxhQUFhLEtBQUssS0FBSyxZQUFZLFNBQVMseUJBQXlCO0FBQ3pFLFVBQUksR0FBRyxXQUFXLFVBQVUsR0FBRztBQUM5QixlQUFPLEtBQUssTUFBTSxHQUFHLGFBQWEsVUFBVSxDQUFDO0FBQUEsTUFDOUM7QUFDQSxhQUFPO0FBQUEsSUFDUjtBQUNBLGlCQUFhLEtBQUssUUFBUSxZQUFZLElBQUk7QUFBQSxFQUMzQztBQUNBLFNBQU87QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
