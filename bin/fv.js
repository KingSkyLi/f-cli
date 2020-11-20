#! /usr/bin/env node

// 最先检查node版本
// chalk：控制台的颜色输出插件 文档：https://www.npmjs.com/package/chalk
// semer：版本校验插件 文档：https://www.npmjs.com/package/semver
// slash：统一windows和unix的符号，foo/bar foo\\bar 文档：https://www.npmjs.com/package/slash
// commander： 命令行交互组件 文档：https://www.npmjs.com/package/commander
// minimist：处理process.args参数
const { chalk, semver } = require('@vue/cli-shared-utils')
const slash = require('slash')
const program = require('commander')
const minimist = require('minimist')
const { args } = require('commander')
const wantedNodeVersion = require('../package.json').engines.node
// 指令错误信息
const programErrorMessages = require('../lib/util/programErrorMessages')

// 定义版本校验函数
function checkNodeVersion(wanted, name) {
    if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
        console.log(chalk.red(
            `当前的node环境是：${process.version}，${name}需求的node版本为：${wanted}。请更新您的node版本。`
        ))
        process.exit(1)
    }
}

checkNodeVersion(wantedNodeVersion, 'fv-cli')

// 定义版本号
program
    .version(`${chalk.green(`fv-cli ${require('../package').version}`)}`)
    .usage('<command> [options]')

// 定义create指令
program
    .command('create <app-name>')
    .description('使用fv-cli创建一个新的项目')
    .action((name, cmd) => {
        // console.log(name)
    })


// 定义错误指令提示信息

// 缺少参数
programErrorMessages('missingArgument', argName => {
    return `缺少参数 ${chalk.yellow(`<${argName}>`)}`
})

programErrorMessages('unknownCommand', () => {
    
})





program.parse(args)





