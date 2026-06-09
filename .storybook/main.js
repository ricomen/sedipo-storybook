import { mergeConfig } from 'vite';

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/html-vite',
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      css: {
        preprocessorOptions: {
          scss: {
            silenceDeprecations: [
              'import',
              'color-functions',
              'global-builtin',
              'if-function',
            ],
          },
        },
      },
    });
  },
};

export default config;
