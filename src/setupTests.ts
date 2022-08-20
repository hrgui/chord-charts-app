import "@testing-library/jest-dom";
import "./testEnv/setupi18n";
import "./testEnv/setupDomMocks";
import { vi } from "vitest";

vi.mock("pouchdb-browser", () => {
  const instance = function () {
    return {
      createIndex: vi.fn().mockReturnValue(new Promise((resolve) => resolve(true))),
      find: vi.fn(),
      put: vi.fn(),
      remove: vi.fn(),
      get: vi.fn(),
    };
  };

  instance.plugin = vi.fn();

  return { default: instance };
});

// TODO: without this mock, react-youtube fails to load because it's a default import
vi.mock("react-youtube", () => {
  return { default: () => null };
});
