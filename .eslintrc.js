require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/eslint-config-typescript', 'standard', 'prettier'],
  rules: {
    'vue/no-unused-vars': 'off',
    'prettier/prettier': 'off',
    'no-unused-vars': 'off',
  },
  plugins: ['vue', '@typescript-eslint'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
};
