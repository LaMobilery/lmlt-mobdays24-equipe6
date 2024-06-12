// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'simple-import-sort', 'autofix'],
  rules: {
    'prettier/prettier': 'warn',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'autofix/no-unused-vars': 'warn',
    'import/no-unresolved': 'off',
  },
}
