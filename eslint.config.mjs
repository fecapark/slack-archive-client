import eslintConfigPrettier from 'eslint-config-prettier/flat'
import perfectionist from 'eslint-plugin-perfectionist'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactRefresh from 'eslint-plugin-react-refresh'
import unusedImports from 'eslint-plugin-unused-imports'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import tsParser from '@typescript-eslint/parser'

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
})

const config = [
  /* 
    https://nextjs.org/docs/pages/api-reference/config/eslint#reference
    하지만, next/core-web-vitals 에서 비명시적으로 아래 두 패키지의 설치를 요구해요.
    - eslint-plugin-react-hooks
    - @next/eslint-plugin-next
  */
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  reactCompiler.configs.recommended,
  perfectionist.configs['recommended-natural'],

  {
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      'unused-imports': unusedImports,
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
          selector: 'variableLike',
        },
        {
          format: ['PascalCase'],
          selector: ['typeLike', 'enumMember'],
        },
        {
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          selector: 'typeProperty',
          trailingUnderscore: 'allow',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      curly: 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'object-shorthand': ['error', 'always'],
      // 아래 자동정렬은 런타임 동작에 영향을 줄 수 있는 것들이에요.
      'perfectionist/sort-enums': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          internalPattern: ['~/*', '@/*'],
          newlinesBetween: 'always',
          customGroups: {
            type: {},
            value: {},
          },
        },
      ],
      'perfectionist/sort-maps': 'off',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-modules': 'off',
      'react-compiler/react-compiler': 'warn',
      // 'react-hooks/exhaustive-deps': [
      //   'error',
      //   {
      //     additionalHooks: '(useEnterDoneEffect|useActiveEffect|useCallbackOnce)',
      //   },
      // ],
      'react-hooks/rules-of-hooks': 'error',
      'react/display-name': [1, { ignoreTranspilerName: false }],
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: ['metadata'], // next의 layout에서 사용되는 metadata를 허용해요.
        },
      ],
      // perfectionist의 sorting과 겹칠 수 있어서 off해요.
      'sort-imports': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { args: 'after-used', argsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_' },
      ],
    },
    settings: {
      'import/external-module-folders': ['node_modules'],
      'import/resolver': {},
    },
  },

  eslintConfigPrettier,
]

export default config
