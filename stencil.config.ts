import { Config } from '@stencil/core';
import replace from 'rollup-plugin-replace';

export const config: Config = {
  namespace: 'app',
  preamble: 'BarCamp Events',
  globalStyle: "./src/app.css",
  commonjs: {
    namedExports: {
      './node_modules/idb/build/idb.js': ['openDb'],
      './node_modules/firebase/dist/index.cjs.js': ['initializeApp', 'firestore']
    }
  },
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
      serviceWorker: {
        swSrc: 'src/sw.js'
      },
      copy: [
        { src: "svg/*.svg", dest: "./build/svg/" },
        { src: "firebase-messaging-sw.js", dest: "./firebase-messaging-sw.js" },
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
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_SENDER_ID: process.env.FIREBASE_SENDER_ID,
      GOOGLE_PLACES_API: process.env.GOOGLE_PLACES_API,
      GOOGLE_MAPS_API: process.env.GOOGLE_MAPS_API,
      delimiters: ['<@', '@>'],
    })
  ]
};
