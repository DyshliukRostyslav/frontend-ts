class CoreIndexGenerator {
  generate() {
    let indexText = "/* eslint-disable comma-dangle */";
    indexText += `\nimport { getCoreExports } from "exports";`;

    indexText += "\n\nexport = getCoreExports();\n";
    
    return indexText;
  }
}

module.exports = CoreIndexGenerator;
