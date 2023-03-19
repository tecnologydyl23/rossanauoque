/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['staticw.s3.amazonaws.com'],
  },

}
const withVideos = require('next-videos')



module.exports = (nextConfig, withVideos())



