module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['@stylistic/js', 'prettier'],
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['static/docs'],
  rules: {
    semi: ['error', 'never'], // Not yelling when semicolons
    '@stylistic/js/indent': ['error', 2],
    'prettier/prettier': ['error'],
  },
}
