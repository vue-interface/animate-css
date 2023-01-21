module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        '@vue/eslint-config-typescript'
    ],
    rules: {
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'vue/multi-word-component-names': 0,
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 1,
            'alignAttributesVertically': false,
            'ignores': []
        }],
        'vue/html-closing-bracket-newline': ['error', {
            'singleline': 'never',
            'multiline': 'never'
        }],
        'keyword-spacing': ['error', {
            'before': true,
            'after': true,
            'overrides': {
                'if': { 'after': false },
                'while': { 'after': false },
                'for': { 'after': false },
            }
        }],
        'indent': ['error', 4],
        'semi': [2, 'always'],
        'object-curly-spacing': ['error', 'always'],
        'space-before-blocks': ['error', 'always']
    }
};
