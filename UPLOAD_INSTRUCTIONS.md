# 上传到 GitHub 仓库指南

请按照以下步骤将项目上传到 GitHub 仓库：

## 1. 初始化 Git 仓库（如果尚未初始化）

```bash
git init
```

## 2. 添加远程仓库

```bash
git remote add origin git@github.com:savageKarl/arklet-vscode-plugin.git
```

## 3. 添加所有文件到暂存区

```bash
git add .
```

## 4. 提交更改

```bash
git commit -m "初始提交：Arklet VSCode 插件"
```

## 5. 推送到 GitHub

```bash
git push -u origin main
```

如果您使用的是主分支名为 `master` 而不是 `main`，请使用：

```bash
git push -u origin master
```

## 注意事项

- 确保您已经在 GitHub 上创建了仓库 `savageKarl/arklet-vscode-plugin`
- 确保您的 SSH 密钥已添加到 GitHub 账户
- 如果遇到权限问题，请检查您的 SSH 配置或使用 HTTPS URL 替代 