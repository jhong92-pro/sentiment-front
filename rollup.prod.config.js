import { terser } from "rollup-plugin-terser";
import rollupCommonConfig from "./rollup.common.config";
import replace from "@rollup/plugin-replace";
import serve from 'rollup-plugin-serve';


const config = {...rollupCommonConfig}

let serverUrl = "http://localhost:7080" // will be changed

config.plugins=[
    ...config.plugins,
    serve({
        host: 'localhost',
        port:8080,
        open:true,
        contentBase:'dist'
    }),
    terser(),
    replace({
        preventAssignment: true,
        "env.serverUrl": serverUrl
      })
];

export default config;