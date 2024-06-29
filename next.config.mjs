/** @type {import('next').NextConfig} */

// update nextConfig to fix "TypeError: Cannot read properties of undefined (reading 'prototype')"
// This issue is caused by this change in MongoDB's bson parser. 
// MongoDB's bson parser uses top-level await and dynamic import in ESM mode to avoid some Webpack bundling issues. 
// And Next.js forces ESM mode.

// const nextConfig = {
//     experimental: {
//       esmExternals: "loose", // <-- add this
//       serverComponentsExternalPackages: ["mongoose"] // <-- and this
//     },
//     // and the following to enable top-level await support for Webpack
//     webpack: (config) => {
//       config.experiments = {
//         topLevelAwait: true
//       };
//       return config;
//     },
//   }

const nextConfig = {};


export default nextConfig;
