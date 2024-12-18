module.exports = {
    roots: ['<rootDir>/tests'],
    preset: 'ts-jest',
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/app/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.mjs'],
    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['<rootDir>/build', '<rootDir>/node_modules'],
    testMatch: [
        '**/?(*.)+(spec|test).[tj]s?(x)',
    ],
};
