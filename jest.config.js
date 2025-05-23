export const testEnvironment = 'jsdom';
export const setupFilesAfterEnv = [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/src/setupTests.ts',
];
export const transform = {
    '^.+\\\\.(t|j)sx?$': ['@swc/jest', {
        jsc: {
            parser: {
                syntax: 'typescript',
                jsx: true,
                decorators: true,
            },
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
        },
    }],
};
