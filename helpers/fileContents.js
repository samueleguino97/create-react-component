function Upperize(str) {
  // util function to convert the input to string type
  function convertToString(input) {
    if (input) {
      if (typeof input === "string") {
        return input;
      }

      return String(input);
    }
    return "";
  }

  // convert string to words
  function toWords(input) {
    input = convertToString(input);

    var regex = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

    return input.match(regex);
  }

  // convert the input array to camel case
  function toCamelCase(inputArray) {
    let result = "";

    for (let i = 0, len = inputArray.length; i < len; i++) {
      let currentStr = inputArray[i];

      let tempStr = currentStr.toLowerCase();

      // convert first letter to upper case (the word is in lowercase)
      tempStr = tempStr.substr(0, 1).toUpperCase() + tempStr.substr(1);

      result += tempStr;
    }

    return result;
  }

  // this function call all other functions

  function toCamelCaseString(input) {
    let words = toWords(input);

    return toCamelCase(words);
  }
  return toCamelCaseString(str);
}

function getClassname(name, stylesType) {
  if (stylesType === "CSS" || stylesType === "SASS") {
    return `'${name}-container'`;
  } else {
    return "{styles.container}";
  }
}

function getImport(name, stylesType) {
  switch (stylesType) {
    case "CSS":
      return `import './${name}.css'`;
    case "Modular CSS":
      return `import styles from './${name}.module.css'`;
    case "SASS":
      return `import './${name}.scss'`;
    case "Modular SASS":
      return `import styles from './${name}.module.scss'`;
    case "JSS":
      return `import {styles} from './${name}.styles.js'`;

    default:
      break;
  }
  if (stylesType === "CSS" || stylesType === "SASS") {
    return `'./${name}'`;
  } else {
    return "{styles.container}";
  }
}

module.exports = {
  getStylesContent: (name, type) => {
    switch (type) {
      case "CSS":
        return `.${name}-container{\n\n}`;
      case "Modular CSS":
        return `.container{\n\n}`;
      case "SASS":
        return `.${name}-container{\n\n}`;
      case "Modular SASS":
        return `.container{\n\n}`;
      case "JSS":
        return `export const styles ={\ncontainer:{\n\n}\n}`;

      default:
        break;
    }
  },
  getComponentContent: (name, type, stylesType) => {
    switch (type) {
      case "Functional":
        return `import React from 'react'\n${getImport(
          name,
          stylesType
        )}\n\nfunction ${Upperize(
          name
        )}(props){\n\treturn(\n\t\t<div className=${getClassname(
          name,
          stylesType
        )} ></div>\n\t);\n}\n\nexport default ${Upperize(name)};`;
      case "Class":
        return `import React from 'react'\n${getImport(
          name,
          stylesType
        )}\n\nclass ${Upperize(
          name
        )}{\n\n\trender(){\n\t\treturn(\n\t\t\t<div className=${getClassname(
          name,
          stylesType
        )} ></div>\n\t\t)\n\t};\n}\n\nexport default ${Upperize(name)};`;
      default:
        break;
    }
  }
};
