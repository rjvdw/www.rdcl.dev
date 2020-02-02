import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: 'src/get_venue.js',
    output: {
      file: 'functions/get_venue.js',
      format: 'cjs',
      name: 'get_venue',
    },
    plugins: [
      resolve({
        preferBuiltins: true,
      }),
      commonjs(),
    ],
  }
]
