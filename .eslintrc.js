module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/indent': ['error', 2, {
      VariableDeclarator: 4,
      SwitchCase: 1
    }],
    '@typescript-eslint/no-unused-vars': 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-triple-slash-reference": 0,
    "@typescript-eslint/triple-slash-reference": ['error', {
      "path": "always",
      "types": "never",
      "lib": "never"
    }],
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }],
  }
}