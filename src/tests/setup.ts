import "@testing-library/jest-dom";

import { afterEach, vi } from "vitest";

afterEach(() => {
  "Clear all mocks after each test";
  vi.clearAllMocks();
});
