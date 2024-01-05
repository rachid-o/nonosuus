const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, "../.env");
const env = fs.readFileSync(envPath, "utf-8").split("\n");

const versionIndex = env.findIndex((line) => line.startsWith("REACT_APP_VERSION="));
const version = new Date().toISOString();
if (versionIndex !== -1) {
  env[versionIndex] = `REACT_APP_VERSION=${version}`;
} else {
  env.push(`REACT_APP_VERSION=${version}`);
}

console.log(`REACT_APP_VERSION version updated to ${version}`);
fs.writeFileSync(envPath, env.join("\n"));
