#! /usr/bin/env node
// program用于提供命令行的创建
const program = require('commander')
// minimist用于处理node的参数
const minimist = require('minimist')
const { args } = require('commander')

// 将中划线，改成小驼峰式写法
function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// 处理参数，返回obj
function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''))
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}



program
    .command('create <app-name>')
    .description('通过fv-cli创建一个新的项目')
    .option('-f, --force', '如果目标文件已经存在，强制覆盖这个文件夹')
    .action((name, cmd) => {
        let argv = minimist(process.argv.slice(3))
        console.log(argv)
        console.log(cmd.options)
        // console.log(name)
        console.log(cleanArgs(cmd))
    })

program.parse(process.argv)
