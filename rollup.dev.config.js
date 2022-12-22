import rollupCommonConfig from "./rollup.common.config";
import serve from 'rollup-plugin-serve';
import livereload from "rollup-plugin-livereload";
import replace from "@rollup/plugin-replace";
const config = {...rollupCommonConfig}

config.watch = {
    include: 'src/**'
};

console.log(config)

let serverUrl = "http://localhost:7080"

config.plugins = [
    ...config.plugins,
    serve({
        host: 'localhost',
        port:8080,
        open:true,
        contentBase:'dist'
    }),
    livereload('dist'),
    replace({
        preventAssignment: true,
        "env.serverUrl": serverUrl
      })
]

export default config;