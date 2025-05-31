import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginCypress from 'eslint-plugin-cypress';
import tseslint from 'typescript-eslint';
import pluginReactConfigRecommended from 'eslint-plugin-react/configs/recommended.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import * as pluginCss from '@eslint/css';

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      import: pluginImport,
      'jsx-a11y': pluginJsxA11y,
      prettier: eslintPluginPrettierRecommended.plugins.prettier,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,
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
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'react/prop-types': 'off',
      'react/destructuring-assignment': 'off',
      'react/function-component-definition': 'off',
      'prettier/prettier': [
        'error',
        { singleQuote: true, semi: true, endOfLine: 'lf' },
      ],
    },
  },

  {
    files: ['src/**/*.{js,jsx}'],
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
      ...pluginJs.configs.recommended.rules,
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
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ],
      'react/prop-types': 'off',
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
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      cypress: pluginCypress,
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['cypress/**', 'src/**/*.cy.{js,jsx,ts,tsx}'] },
      ],
    },
  },

  pluginReactConfigRecommended,
  eslintPluginPrettierRecommended,

  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];