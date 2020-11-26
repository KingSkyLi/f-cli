const program = require('commander')
const { chalk } = require('@vue/cli-shared-utils')
// 重新定义错误提示信息
// missingArgument等函数注入信息
module.exports = (methodName, log) => {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    if (methodName === 'unknownCommand') {
      // const partCommands = [this.name()];
      // for (let parentCmd = this.parent; parentCmd; parentCmd = parentCmd.parent) {
      //   partCommands.unshift(parentCmd.name());
      // }
      // const fullCommand = partCommands.join(' ');
      // const message = `未知的命令： ${chalk.yellow(this.args[0])}\n` +
      //   (this._hasHelpOption ? `请查看帮助： ${chalk.yellow(fullCommand)} ${chalk.yellow(this._helpLongFlag)}` : '');
      // console.log(chalk.red(message));
      // process.exit(1)
    }
    let messsage = log(...args)
    this.outputHelp()
    console.log(`  ` + chalk.red(messsage))
    console.log()
    process.exit(1)
  }
}
