module.exports = {
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'object-shorthand': 'warn',
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 20,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  }
}
