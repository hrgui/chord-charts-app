// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "./testEnv/setupi18n";
import "./testEnv/setupDomMocks";

jest.mock("pouchdb-browser", () => {
  const instance = function () {
    return {
      createIndex: jest.fn().mockReturnValue(new Promise((resolve) => resolve(true))),
      find: jest.fn(),
      put: jest.fn(),
      remove: jest.fn(),
      get: jest.fn(),
    };
  };

  instance.plugin = jest.fn();

  return instance;
});
