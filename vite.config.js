import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue2";
import {resolve} from "path"; // 主要用于alias文件路径别名
import {fileURLToPath} from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function pathResolve(dir) {
    return resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],

    base: "./",

    // 这里是将src目录配置别名为 /@ 方便在项目中导入src目录下的文件
    resolve: {
        alias: {
            "@": pathResolve("src")
        }
    },

    //静态资源服务的文件夹
    publicDir: "public",

    build: {
        outDir: "dist", //指定输出路径
        assetsDir: "static", // 指定生成静态资源的存放路径
        assetsInlineLimit: 4096, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
        minify: "terser", // 混淆器，terser构建后文件体积更小
        terserOptions: {
            compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true
            }
        },
        cssCodeSplit: true, //启用/禁用 CSS 代码拆分
        sourcemap: false //构建后是否生成 source map 文件
    },

    optimizeDeps: {
        force: true //是否强制依赖预构建
    },

    // 配置 webpack-dev-server 行为。
    server: {
        open: true,
        host: true, // 可以根据环境不同，选择是否可以用ip访问
        port: 12345, // 端口号
        strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
        https: false,
        hmr: true //开启热更新
    }
});
