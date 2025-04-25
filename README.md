# Arklet Plugin

这是一个 VSCode 插件，它允许你通过右键菜单使用 tsx 执行 TypeScript/JavaScript 文件。

## 功能

- 在文件资源管理器中右键点击 `.ts` 或 `.js` 文件
- 选择 "Run with Arklet" 选项
- 插件会使用 tsx 命令执行选中的文件
- 详细的执行信息会显示在输出面板中
- 如果生成了 response.json 文件，会显示其大小

## 使用要求

- VSCode 1.80.0 或更高版本
- Node.js 和 pnpm 已安装
- tsx 已全局安装 (`pnpm install -g tsx`)
- **重要**: 项目根目录下的 `package.json` 文件必须包含 `"arklet": true` 字段

## 项目配置

要启用插件功能，您需要在项目的 `package.json` 中添加以下配置：

```json
{
  "name": "your-project",
  "version": "1.0.0",
  // 其他配置...
  "arklet": true
}
```

如果项目中没有添加 `"arklet": true` 配置，右键菜单中不会显示 "Run with Arklet" 选项。

## 安装步骤

1. 克隆此仓库
2. 运行 `pnpm install` 安装依赖
3. 在 VSCode 中按 F5 启动调试
4. 在新的 VSCode 窗口中测试插件

## 使用方法

1. 打开一个包含正确配置的项目（package.json 中有 `"arklet": true`）
2. 在 VSCode 的文件资源管理器中右键点击 `.ts` 或 `.js` 文件
3. 在上下文菜单中选择 "Run with Arklet"
4. 执行结果将显示在底部的输出面板中
5. 如果执行成功并生成了 response.json 文件，将显示文件大小

## 输出说明

执行文件时，插件会：

1. 在输出面板中显示详细信息，包括：
   - 执行的命令
   - 标准输出
   - 错误输出（如果有）
   - 生成的文件信息

2. 在通知中显示简要信息：
   - 执行成功或失败
   - 如果生成了 response.json 文件，会显示其大小

## 注意事项

- 确保已全局安装 tsx (`pnpm install -g tsx`)
- 确保选择的文件是可执行的 TypeScript/JavaScript 文件
- 确保项目的 package.json 中包含 `"arklet": true` 配置
- 如果修改了 package.json 文件，插件会自动检测变化并更新功能状态

## 疑难解答

如果插件不显示或不工作：

1. 检查项目根目录下是否有 package.json 文件
2. 确认 package.json 中包含 `"arklet": true` 字段
3. 确保全局安装了 tsx
4. 查看 VSCode 输出面板中的 "Arklet" 通道获取详细日志 