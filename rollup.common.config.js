import htmlTemplate from 'rollup-plugin-generate-html-template';
import scss from 'rollup-plugin-scss';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';


export default {
    input: 'src/js/index.js',
    output: {
        file: './dist/bundle.js',
        format: 'cjs',
        sourcemap: true,
    },
    plugins:[
        nodeResolve(),
        scss({
            insert:true,
            sourceMap:true
        }),
        htmlTemplate({
            template: 'src/index.html',
            target: 'index',
        }),
        PeerDepsExternalPlugin(),
        commonjs({
            include: 'node_modules/**',

       })
    ]
}