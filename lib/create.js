// fs-extra：fs-extra是fs的一个扩展，提供了非常多的便利API，并且继承了fs所有方法和为fs方法添加了promise的支持。
// inquirer：inquirer命令行的交互提示
// validate-npm-package-name：输入一个字符串，来判断这个字符串是否符合npm package规范
const fsExtra = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const slash = require('slash')
const validateProjectName = require('validate-npm-package-name')
// stopSpinner是对ora中不同状态的封装，cli-shared-utils/lib/spinner.js,主要就是控制node命令行的loading和状态的图标
// error是cli-shared-utils/lib/logger.js中封装的日志输入函数
const { chalk, error, stopSpinner } = require('@vue/cli-shared-utils')

async function create(projectName, options) {
    let cwd = process.cwd()
    let targetDir = path.resolve(cwd, projectName)
    let result = validateProjectName(projectName)
    if (!result.validForNewPackages) {
        console.error(chalk.red(`Invalid project name: "${projectName}"`))
        result.errors && result.errors.forEach(err => {
            console.error(chalk.red.dim('Error: ' + err))
        })
        result.warnings && result.warnings.forEach(warn => {
            console.error(chalk.red.dim('Warning: ' + warn))
        })
        process.exit(1)
    }
    let isExist = fsExtra.existsSync(targetDir)
    if(isExist){
        
    }
}

module.exports = (...args) => {
    return create(...args).catch(err => {
        stopSpinner(false)
        error(err)
    })
}