import { Config } from '@stencil/core';
import replace from 'rollup-plugin-replace';

const environment = process.env;
console.log("FIREBASE_API_KEY", JSON.stringify(process.env.FIREBASE_API_KEY))
console.log("FIREBASE_AUTH_DOMAIN", JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN))
console.log("FIREBASE_PROJECT_ID", JSON.stringify(process.env.FIREBASE_PROJECT_ID))

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
      baseUrl: "https://beta.barcamp.events",
      serviceWorker: null,
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
    replace({
      ENVIRONMENT: process.env.NODE_ENV || "development",
      VERSION: process.env.VERSION || "0.0.0",
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      delimiters: ['<@', '@>'],
    })
  ]
};
