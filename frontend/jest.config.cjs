module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.js$': 'babel-jest',
        ".+\\.(avif|css|styl|less|sass|scss|png|jpg|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-transform-stub"
    },
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '\\.(avif|css|less|scss|sass|png|jpg|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: ['./jest.setup.js']
};
