module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    'import/no-unresolved': 'off',
    'no-shadow': 'off', // 允许变量同名，因为 ts 会检查
    '@typescript-eslint/no-shadow': ['error'],
    'no-unused-vars': 'off', // 允许未使用的变量，因为 ts 会检查
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^' }],
    'class-methods-use-this': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.ts', '.vue'],
      },
    },
  },
}
