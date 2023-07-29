// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///C:/Users/Administrator/Desktop/%E5%85%AC%E5%8F%B8%E9%A1%B9%E7%9B%AE/oa_admin/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/Administrator/Desktop/%E5%85%AC%E5%8F%B8%E9%A1%B9%E7%9B%AE/oa_admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/Administrator/Desktop/%E5%85%AC%E5%8F%B8%E9%A1%B9%E7%9B%AE/oa_admin/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import svgLoader from "file:///C:/Users/Administrator/Desktop/%E5%85%AC%E5%8F%B8%E9%A1%B9%E7%9B%AE/oa_admin/node_modules/vite-svg-loader/index.js";
var __vite_injected_original_dirname = "C:\\Users\\Administrator\\Desktop\\\u516C\u53F8\u9879\u76EE\\oa_admin";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} })
    //configArcoStyleImportPlugin(),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__vite_injected_original_dirname, "./src")
      },
      {
        find: "assets",
        replacement: resolve(__vite_injected_original_dirname, "./src/assets")
      },
      {
        find: "vue-i18n",
        replacement: "vue-i18n/dist/vue-i18n.cjs.js"
        // Resolve the i18n warning issue
      },
      {
        find: "vue",
        replacement: "vue/dist/vue.esm-bundler.js"
        // compile template
      }
    ],
    extensions: [".ts", ".js"]
  },
  define: {
    "process.env": {}
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            "src/style/base.less"
          )}";`
        },
        javascriptEnabled: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERlc2t0b3BcXFxcXHU1MTZDXHU1M0Y4XHU5ODc5XHU3NkVFXFxcXG9hX2FkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBZG1pbmlzdHJhdG9yXFxcXERlc2t0b3BcXFxcXHU1MTZDXHU1M0Y4XHU5ODc5XHU3NkVFXFxcXG9hX2FkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvJUU1JTg1JUFDJUU1JThGJUI4JUU5JUExJUI5JUU3JTlCJUFFL29hX2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInO1xuLy9pbXBvcnQgY29uZmlnQXJjb1N0eWxlSW1wb3J0UGx1Z2luIGZyb20gJy4vcGx1Z2luL2FyY29TdHlsZUltcG9ydCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICB2dWVKc3goKSxcbiAgICBzdmdMb2FkZXIoeyBzdmdvQ29uZmlnOiB7fSB9KSxcbiAgICAvL2NvbmZpZ0FyY29TdHlsZUltcG9ydFBsdWdpbigpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IFtcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ0AnLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ2Fzc2V0cycsXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ3Z1ZS1pMThuJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6ICd2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qcycsIC8vIFJlc29sdmUgdGhlIGkxOG4gd2FybmluZyBpc3N1ZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ3Z1ZScsXG4gICAgICAgIHJlcGxhY2VtZW50OiAndnVlL2Rpc3QvdnVlLmVzbS1idW5kbGVyLmpzJywgLy8gY29tcGlsZSB0ZW1wbGF0ZVxuICAgICAgfSxcbiAgICBdLFxuICAgIGV4dGVuc2lvbnM6IFsnLnRzJywgJy5qcyddLFxuICB9LFxuICBkZWZpbmU6IHtcbiAgICAncHJvY2Vzcy5lbnYnOiB7fSxcbiAgfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgbGVzczoge1xuICAgICAgICBtb2RpZnlWYXJzOiB7XG4gICAgICAgICAgaGFjazogYHRydWU7IEBpbXBvcnQgKHJlZmVyZW5jZSkgXCIke3Jlc29sdmUoXG4gICAgICAgICAgICAnc3JjL3N0eWxlL2Jhc2UubGVzcydcbiAgICAgICAgICApfVwiO2AsXG4gICAgICAgIH0sXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtXLFNBQVMsZUFBZTtBQUMxWCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZUFBZTtBQUp0QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxVQUFVLEVBQUUsWUFBWSxDQUFDLEVBQUUsQ0FBQztBQUFBO0FBQUEsRUFFOUI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3pDO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNoRDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQTtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLElBQ0EsWUFBWSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQzNCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osWUFBWTtBQUFBLFVBQ1YsTUFBTSw4QkFBOEI7QUFBQSxZQUNsQztBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
