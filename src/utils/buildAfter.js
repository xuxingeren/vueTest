// var fs = require("fs");

class buildAfter {
  constructor() {}
  apply(compiler) {
    compiler.hooks.done.tap('buildAfter', () => {
      // let readDir = fs.readdirSync(`${process.cwd()}/pc`)
      console.log('buildAfter')
    });
  }
}

module.exports = buildAfter