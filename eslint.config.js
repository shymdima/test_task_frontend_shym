// eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginCypress from 'eslint-plugin-cypress';

import pluginReactConfigRecommended from 'eslint-plugin-react/configs/recommended.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import * as pluginCss from '@eslint/css';

export default [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      'jsx-a11y': pluginJsxA11y,
      prettier: eslintPluginPrettierRecommended.plugins.prettier,
    },
    rules: {
      'function-paren-newline': ['error', 'consistent'],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
      'jsx-a11y/control-has-associated-label': 'off',
      'implicit-arrow-linebreak': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: true, optionalDependencies: false, peerDependencies: false },
      ],
      'max-len': [
        'error',
        { ignoreTemplateLiterals: true, ignoreComments: true, code: 100 },
      ],
      'no-console': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-shadow': ['error', { builtinGlobals: false }],
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/destructuring-assignment': 'off',
      'react/function-component-definition': 'off',
      'prettier/prettier': [
        'error',
        { singleQuote: true, semi: true, endOfLine: 'lf' },
      ],
    },
  },

  {
    files: ['**/*.css', '**/*.scss'],
    languageOptions: {
      parser: pluginCss.parser,
    },
    plugins: {
      css: pluginCss,
      prettier: eslintPluginPrettierRecommended.plugins.prettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        { singleQuote: true, semi: true, endOfLine: 'lf' },
      ],
    },
  },

  {
    files: ['cypress/**/*.{js,jsx,ts,tsx}', 'src/**/*.cy.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.cypress,
        ...globals.browser,
      },
    },
    plugins: {
      cypress: pluginCypress,
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['cypress/**', 'src/**/*.cy.{js,jsx,ts,tsx}'] },
      ],
    },
  },

  pluginJs.configs.recommended,
  pluginReactConfigRecommended,
  eslintPluginPrettierRecommended,
];
