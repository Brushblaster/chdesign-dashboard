module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['off', 0],
    'vue/html-indent': ['off', 0],
    'vue/attributes-order': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': 0,
    'vue/order-in-components': 0,
    'vue/no-unused-vars': 0,
    'prettier/prettier': 0,
    'vue/require-valid-default-prop': 0
  }
}
