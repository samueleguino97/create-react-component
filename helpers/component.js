const touch = require("touch");

const write = require("./file").write;

const getStylesContent = require("./fileContents").getStylesContent;

const getComponentContent = require("./fileContents").getComponentContent;

function createMainFile(name, type, stylesType) {
  touch(`${name}/${name}.js`);

  write(`${name}/${name}.js`, getComponentContent(name, type, stylesType));
}

function createStyles(name, type) {
  const extension = getStylesExtension(type);

  touch(`${name}/${name}.${extension}`);
  write(`${name}/${name}.${extension}`, getStylesContent(name, type));
}

function getStylesExtension(type) {
  switch (type) {
    case "CSS":
      return "css";

    case "Modular CSS":
      return "module.css";

    case "SASS":
      return "scss";

    case "Modular SASS":
      return "module.scss";

    case "JSS":
      return "styles.js";

    default:
      return "css";
  }
}

module.exports = {
  createComponent: answers => {
    const componentName = answers.componentName;

    createMainFile(componentName, answers.componentType, answers.stylesType);

    createStyles(componentName, answers.stylesType);

    answers.test === "Yes" &&
      touch(`${componentName}/${componentName}.test.js`);
  }
};
