require("dotenv").config({ path: ".env.test" });

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupAfterEnv.ts"],
};
