import { Config } from '@stencil/core';
import dotenvPlugin from 'rollup-plugin-dotenv'

export const config: Config = {
  namespace: 'app',
  preamble: 'BarCamp Events',
  globalStyle: "./src/app.css",
  testing: {
    emulate: [
      { device: "iPad" },
      { device: "iPhone 8" },
      { device: "iPhone SE" },
      { device: "Pixel 2" },
      { viewport: { width: 1400, height: 1200 } }
    ],
    verbose: false,
    collectCoverage: true,
    notify: true,
    coverageDirectory: "./data/tests/",
    // coverageThreshold: {
    //   global: {
    //     branches: 90,
    //     functions: 80,
    //     lines: 80,
    //     statements: -1000
    //   }
    // },
    coverageReporters: [
      "json-summary",
      "lcov",
      "text",
    ]
  },
  outputTargets: [
    {
      type: 'www',
      dir: "public",
      baseUrl: "https://beta.barcamp.events",
      copy: [
        { src: "svg/*.svg", dest: "./build/svg/" }
        { src: "assets/audio" },
        { src: "assets/fonts" },
        { src: "assets/images" },
        { src: "assets/scripts" },
        { src: "assets/video" },
        { src: "*.html" },
      ],
    }
  ],
  plugins: [
    dotenvPlugin()
  ]
};
