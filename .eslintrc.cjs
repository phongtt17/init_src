module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'vite/no-deprecated-import': 'off',
    'vite/no-deprecated-defineProps': 'off',
    'vite/no-deprecated-defineEmits': 'off',
    'vite:import-analysis': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-use-before-define': 'off',
    'react/no-unescaped-entities': 0,
    camelcase: 'off',
    'react-hooks/rules-of-hooks': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-extra-boolean-cast': 'off',
    'react/display-name': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/self-closing-comp': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
  },
};
