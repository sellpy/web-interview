module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'prettier', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: [2, 'never'],
    quotes: [2, 'single'],
    indent: [2, 2],
    'no-console': 0,
    'react/prop-types': 0,
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': [2, { props: false }],
  },
}
