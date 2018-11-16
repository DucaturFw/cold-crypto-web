module.exports = {
	"transform": {
		"^.+\\.tsx?$": "ts-jest"
	},
	"globals": {
		"ts-jest": {
			"tsConfig": "src/tsconfig.json"
		}
	},
	"testEnvironment": "node",
	"testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
		"moduleFileExtensions": [
			"ts",
			"tsx",
			"js",
			"jsx",
			"json",
			"node"
		]
}