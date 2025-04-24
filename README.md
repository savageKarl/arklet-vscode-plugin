# Arklet Plugin

这是一个 VSCode 插件，它允许你通过右键菜单使用 tsx 执行 TypeScript/JavaScript 文件。

## 功能

- 在文件资源管理器中右键点击文件
- 选择 "Arklet: Execute with TSX" 选项
- 插件会使用 tsx 命令执行选中的文件

## 要求

- VSCode 1.80.0 或更高版本
- Node.js 和 pnpm 已安装
- tsx 已全局安装 (`pnpm install -g tsx`)

## 安装步骤

1. 克隆此仓库
2. 运行 `pnpm install` 安装依赖
3. 在 VSCode 中按 F5 启动调试
4. 在新的 VSCode 窗口中测试插件

## 使用方法

1. 在 VSCode 的文件资源管理器中右键点击任意文件
2. 在上下文菜单中选择 "Arklet: Execute with TSX"
3. 插件会执行该文件并显示输出结果

## 注意事项

- 确保已全局安装 tsx (`pnpm install -g tsx`)
- 确保选择的文件是可执行的 TypeScript/JavaScript 文件 