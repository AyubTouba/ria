module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./"],
  transform: { "\\.ts$": ["ts-jest"] },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles  : ["./jest-setup/index.js","./src/Config/inversify.config.ts"],
  globals: {
    "ts-jest": {
      "tsConfig": "./tsconfig.json"
    }
  }
};
