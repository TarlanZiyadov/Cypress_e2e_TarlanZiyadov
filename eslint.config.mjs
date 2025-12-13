import globals from "globals";
import js from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress'

export default [
  {
    ignores: ['.env']
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    plugins: {
      cypress: pluginCypress
    },
   languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly'
      }
    },
    rules: {
      'cypress/no-assigning-return-values': 'error',
      'cypress/unsafe-to-chain-command': 'off',
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-async-tests': 'error',
      'cypress/no-pause': 'error',
      'no-plusplus': ['off'],
      'no-param-reassign': ['error', { 'props': false }],
      'indent': ['error', 2],
      'no-multi-spaces': ['error'],
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      'semi': ['error', 'always'],
      'import/no-extraneous-dependencies': 'off',
      'quotes': [2, 'single'],
      'import/prefer-default-export': 'off',
      'camelcase': 'off',
      'object-curly-spacing': ['error', 'always'],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-before-blocks': ['error', 'always'],
      'func-names': 'off',
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'if' },
        { blankLine: 'always', prev: 'if', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' }
      ],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'never'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'brace-style': 'error',
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'lines-around-comment': ['error', { 'beforeBlockComment': true }],
      'semi-spacing': 'error',
      'space-infix-ops': 'error',
      'template-curly-spacing': ['error', 'never'],
      'array-bracket-newline': ['error', { 'multiline': true }],
      'array-bracket-spacing': ['error', 'never'],
      'dot-location': ['error', 'property'],
      'no-console': ['error', { 'allow': ['error'] }]
    }
  }
];