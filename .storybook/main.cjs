// const { default: path } = require("path");
const path = require('path');
module.exports = {
  viteFinal: async (config) => {
    if (config.resolve.alias) {
      config.resolve.alias.push({ find: '@', replacement: path.resolve(__dirname, '../src') + '/' });
    } else {
      config.resolve.alias = [{ find: '@', replacement: path.resolve(__dirname, '../src') + '/' }];
    }
    return config;
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
};
