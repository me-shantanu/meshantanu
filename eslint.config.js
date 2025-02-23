// eslint.config.js
const { defineConfig } = require('eslint-define-config');
const prettier = require('eslint-plugin-prettier');
const eslintConfigNext = require('eslint-config-next');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      prettier, // Add Prettier plugin
    },
    rules: {
      'prettier/prettier': 'warn',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'import/no-anonymous-default-export': 'off',
    },
    overrides: [
      {
        files: ['**/*.{js,jsx,ts,tsx}'],
        extends: [eslintConfigNext, eslintConfigPrettier],
      },
    ],
  },
]);
