const warn = process.env.NODE_ENV === 'deploy' ? 'error' : 'warn'

const js = require('@eslint/js')
const configPrettier = require('eslint-config-prettier')
const perfectionist = require('eslint-plugin-perfectionist')
const prettierRecommended = require('eslint-plugin-prettier/recommended')
const pluginPromise = require('eslint-plugin-promise')
const regexp = require('eslint-plugin-regexp')
const pluginVue = require('eslint-plugin-vue')
const tslint = require('typescript-eslint')
const vueParser = require('vue-eslint-parser')

const pluginBrick = require('./brick')

module.exports = [
  js.configs.recommended,
  ...tslint.configs.strict,
  ...pluginVue.configs['flat/recommended'],
  perfectionist.configs['recommended-natural'],
  regexp.configs['flat/recommended'],
  pluginPromise.configs['flat/recommended'],
  prettierRecommended,
  configPrettier,
  {
    plugins: {
      brick: pluginBrick,
    },
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue'],
    languageOptions: {
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
      parser: vueParser,
      parserOptions: {
        parser: tslint.parser,
      },
    },

    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/default-param-last': 'error',
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      '@typescript-eslint/no-unused-vars': [
        warn,
        {
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        warn,
        {
          functions: false,
        },
      ],
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'brick/const-case': 'error',
      curly: 'error',
      'default-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'off',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'logical-assignment-operators': ['error', 'always'],
      'new-cap': ['error', { newIsCap: true, properties: false }],
      'no-alert': warn,
      'no-await-in-loop': 'error',
      'no-constant-binary-expression': 'error',
      'no-constructor-return': 'error',
      'no-debugger': warn,
      'no-duplicate-imports': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-empty-static-block': 'error',
      'no-eq-null': 'error',
      'no-eval': 'error',
      'no-extra-semi': 'off',
      'no-implicit-coercion': 'error',
      'no-implied-eval': 'error',
      'no-invalid-this': 'error',
      'no-lone-blocks': 'error',
      'no-lonely-if': 'error',
      'no-loop-func': 'error',
      'no-multi-assign': 'error',
      'no-negated-condition': 'error',
      'no-nested-ternary': 'error',
      'no-new-func': 'error',
      'no-new-native-nonconstructor': 'error',
      'no-new-wrappers': 'error',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-proto': 'error',
      'no-restricted-syntax': [
        'error',
        {
          message: 'Write function props only with a prefix ^on | ^set.',
          selector:
            'CallExpression[callee.name=defineProps] TSPropertySignature[typeAnnotation.typeAnnotation.type=TSFunctionType][key.name!=/^on|^set/]',
        },
        {
          message: 'Use ^set only with function which must return value.',
          selector:
            'CallExpression[callee.name=defineProps] TSPropertySignature[typeAnnotation.typeAnnotation.type=TSFunctionType][typeAnnotation.typeAnnotation.returnType.typeAnnotation.type=TSVoidKeyword][key.name=/^set/]',
        },
        {
          message: 'Use ^on only with function who work as Event|Emit.',
          selector:
            'CallExpression[callee.name=defineProps] TSPropertySignature[typeAnnotation.typeAnnotation.type=TSFunctionType][typeAnnotation.typeAnnotation.returnType.typeAnnotation.type!=TSVoidKeyword][typeAnnotation.typeAnnotation.returnType.typeAnnotation.type!=TSTypeReference][key.name=/^on/]',
        },
        {
          message: 'Use ^on only with function who work as Event|Emit.',
          selector:
            'CallExpression[callee.name=defineProps] TSPropertySignature[typeAnnotation.typeAnnotation.type=TSFunctionType][typeAnnotation.typeAnnotation.returnType.typeAnnotation.type=TSTypeReference][key.name=/^on/] TSTypeParameterInstantiation > :not(TSVoidKeyword)',
        },
        {
          message: 'Use ^set only with function which must return value.',
          selector:
            'CallExpression[callee.name=defineProps] TSPropertySignature[typeAnnotation.typeAnnotation.type=TSFunctionType][typeAnnotation.typeAnnotation.returnType.typeAnnotation.type=TSTypeReference][key.name=/^set/] TSTypeParameterInstantiation > TSVoidKeyword',
        },
      ],
      'no-return-assign': 'error',
      'no-script-url': 'error',
      'no-self-compare': 'error',
      'no-undef': 'off',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': 'error',
      'no-unreachable-loop': 'error',
      'no-unused-private-class-members': 'error',
      'no-unused-vars': 'off',
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-rename': 'error',
      'no-var': 'error',
      'no-void': 'error',
      'object-shorthand': warn,
      'one-var': ['error', 'never'],
      'operator-assignment': ['error'],
      'perfectionist/sort-vue-attributes': 'off',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-exponentiation-operator': 'error',
      'prefer-numeric-literals': 'error',
      'prefer-object-has-own': 'error',
      'prefer-object-spread': 'error',
      'prefer-regex-literals': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'prettier/prettier': warn,
      'promise/always-return': 'error',
      'promise/no-nesting': 'error',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/prefer-await-to-then': warn,
      'promise/valid-params': 'error',
      'require-await': warn,
      'vue/attribute-hyphenation': [
        'error',
        'never',
        {
          ignore: [],
        },
      ],
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/custom-event-name-casing': ['error', 'camelCase'],
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineOptions', 'defineProps', 'defineSlots', 'defineEmits'],
        },
      ],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/html-button-has-type': [
        'error',
        {
          button: true,
          reset: true,
          submit: true,
        },
      ],
      'vue/match-component-import-name': ['error'],
      'vue/multi-word-component-names': 'off',
      'vue/next-tick-style': ['error', 'promise'],
      'vue/no-boolean-default': ['error', 'default-false'],
      'vue/no-constant-condition': ['error'],
      'vue/no-duplicate-attr-inheritance': ['error'],
      'vue/no-empty-component-block': ['error'],
      'vue/no-restricted-props': [
        'error',
        {
          message: 'Don\'t use word "need" in props',
          name: '/^need/',
        },
      ],
      'vue/no-restricted-syntax': [
        'error',
        {
          message: 'Use "@" symbol for Event|Emit.',
          selector: 'VIdentifier[rawName=/^on/]',
        },
      ],
      'vue/no-template-target-blank': [
        'error',
        {
          allowReferrer: false,
          enforceDynamicLinks: 'always',
        },
      ],
      'vue/no-unused-components': warn,
      'vue/no-unused-refs': ['error'],
      'vue/no-unused-vars': warn,
      'vue/no-useless-v-bind': [
        'error',
        {
          ignoreIncludesComment: false,
          ignoreStringEscape: false,
        },
      ],
      'vue/no-v-html': 'off',
      'vue/no-v-text': ['error'],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/prefer-true-attribute-shorthand': ['error', 'always'],
      'vue/require-component-is': 'off',
      'vue/require-expose': ['error'],
      'vue/v-for-delimiter-style': ['error'],
      'vue/v-on-event-hyphenation': [
        'error',
        'never',
        {
          ignore: [],
        },
      ],
      'vue/v-on-function-call': ['error', 'never'],
      yoda: 'error',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    ignores: ['**/.nuxt', '**/icon.d.ts', '**/img.d.ts', '**/test-buttons.vue'],
  },
]
