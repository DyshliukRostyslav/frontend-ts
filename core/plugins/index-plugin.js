/* eslint-disable no-magic-numbers */
const fs = require("fs");

class IndexPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.run.tap("IndexPlugin",() => {
      this.options.forEach(option => {
        const packageName = option.name;
        const generator = option.generator;

        const indexContent = generator.generate();

        fs.writeFileSync(
          `${__dirname}//index.ts`,
          indexContent
        );
      });
    });
  }
}

module.exports = IndexPlugin;