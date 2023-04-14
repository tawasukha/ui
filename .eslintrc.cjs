module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-redeclare": "off",
    "@typescript-eslint/restrict-plus-operands": "off"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
