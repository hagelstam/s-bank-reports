//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  printWidth: 80,
  tabWidth: 2,
  endOfLine: 'auto',
  arrowParens: 'always',
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
