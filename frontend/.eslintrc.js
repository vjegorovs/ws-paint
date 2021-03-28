module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"settings": {
		"react": {
			"version": "detect",
		},
	},
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint",
		"import",
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		],
		"block-spacing": [2, "always"],
		"camelcase": ["warn", { "properties": "never", "ignoreDestructuring": true }],
		"comma-spacing": ["error"],
		"semi-spacing": 2,
		"eqeqeq": ["error", "smart"],
		"no-mixed-spaces-and-tabs": [0, "smart-tabs"],
		"object-curly-spacing": ["error", "always"],
		"eol-last": "error",
		"no-trailing-spaces": "error",
		"no-var": "error",
		"no-whitespace-before-property": ["error"],
		"space-before-blocks": ["error", "always"],
		"space-in-parens": ["error", "never"],
		"arrow-spacing": ["error"],

		"@typescript-eslint/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
		"@typescript-eslint/comma-dangle": ["error", "always-multiline"],
		"@typescript-eslint/semi": ["error"],
		"@typescript-eslint/space-before-function-paren": ["error", {
			"anonymous": "always",
			"named": "never",
			"asyncArrow": "always",
		}],
		"@typescript-eslint/type-annotation-spacing": ["error"],
		"@typescript-eslint/prefer-for-of": ["error"],
		"@typescript-eslint/no-extra-semi": ["error"],
		"@typescript-eslint/ban-ts-comment": ["off"],
		"@typescript-eslint/no-empty-interface": ["off"],
		"@typescript-eslint/no-explicit-any": ["off"],
		"@typescript-eslint/explicit-module-boundary-types": ["off"],
		"@typescript-eslint/no-namespace": ["error"],
		"@typescript-eslint/no-unused-vars": ["off"],
		"@typescript-eslint/ban-types": ["off"],
		"@typescript-eslint/no-redeclare": "error",
		"@typescript-eslint/no-this-alias": ["error"],
		"@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true }],
		"@typescript-eslint/no-non-null-assertion": ["off"],

		"import/no-default-export": "warn",
		"import/no-unassigned-import": ["error", { "allow": ["react", "**/*.scss"] }],
		"react/prop-types": "off",
		"react/no-find-dom-node": "off",
		"react/display-name": "off",
		"react/jsx-boolean-value": ["error", "always"],
		"react/jsx-tag-spacing": ["error", {
			"closingSlash": "never",
			"beforeSelfClosing": "always",
			"afterOpening": "never",
			"beforeClosing": "never",
		}],
		"react/jsx-curly-spacing": ["error", { "when": "never", "children": true }],
	},
	overrides: [
		{
			files: ["*.d.ts"],
			rules: {
				"import/no-default-export": "off",
			},
		}
	]
};
