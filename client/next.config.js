/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/api' // development api
        : 'http://localhost:4000/api' // production api
},

experimental: {
  esmExternals: false,
}
};
