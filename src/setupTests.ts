// Setup file for Jest tests
// This file is executed before each test file

// Global test configuration
jest.setTimeout(10000);

// Mock console methods in tests to avoid noise
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}; 