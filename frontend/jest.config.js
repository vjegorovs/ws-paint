const esModules = ["lodash-es"].join("|");

module.exports = {
    preset: "ts-jest",
    setupFilesAfterEnv: [
        "<rootDir>/test-setup.ts",
        "jest-canvas-mock",
    ],
    transform: {
        "^.+\\.(j|t)sx?$": "ts-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!lodash-es/.*)"],
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverageFrom: [
        "!**/node_modules/**",
        "!**/dist/**",
        "!**/vendor/**",
    ],
};