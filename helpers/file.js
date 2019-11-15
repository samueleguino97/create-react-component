const fs = require("fs");
const path = require("path");

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  directoryExists: filePath => {
    return fs.existsSync(filePath);
  },
  createDirectory: directoryName => {
    return fs.mkdirSync(directoryName);
  },
  write: (name, contents, options) => {
    return fs.writeFileSync(name, contents, options);
  }
};
