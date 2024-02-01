import { describe } from "node:test";
import { createDataURL } from "./FileReader";
import { expect, it, vi, afterEach } from "vitest";

class MockFileReader {
  onload: { (): void } | null;
  onerror: { (): void } | null;
  result: string | null;

  constructor() {
    this.onload = null;
    this.onerror = null;
    this.result = null;
  }

  readAsDataURL() {
    this.result = "test";
    this.onload?.call(this);
  }
}

const mockFileReader = new MockFileReader();

describe("FileReader", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("createDataURL", () => {
    it("Should return promise on successful data url creation", async () => {
      vi.stubGlobal(
        "FileReader",
        vi.fn(() => mockFileReader),
      );

      mockFileReader.readAsDataURL = function () {
        this.result = "test";
        this.onload?.call(this);
      };

      const file = new Blob([""], { type: "text/plain" });
      const result = createDataURL(file);
      expect(result).toBeInstanceOf(Promise);
      expect(result).resolves.toBe("test");
    });

    it("Should return promise on error", async () => {
      vi.stubGlobal(
        "FileReader",
        vi.fn(() => mockFileReader),
      );

      mockFileReader.readAsDataURL = function () {
        this.onerror?.call(this);
      };

      const file = new Blob([""], { type: "text/plain" });
      const result = createDataURL(file);
      expect(result).toBeInstanceOf(Promise);
      expect(result).rejects.toThrow("Error on load");
    });
  });
});
