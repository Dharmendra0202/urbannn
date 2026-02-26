const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Exclude backend folder completely from Metro bundler
config.resolver.blockList = [
  /backend\/.*/,
  /backend$/,
];

// Explicitly set the project root
config.projectRoot = __dirname;

// Only watch app-related folders, exclude backend
config.watchFolders = [__dirname];

// Exclude backend from source extensions
config.resolver.sourceExts = [...config.resolver.sourceExts];

module.exports = config;
