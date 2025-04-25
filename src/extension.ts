import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
    // 检查工作区是否存在并获取根目录
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        // 没有打开的工作区，禁用插件功能
        vscode.commands.executeCommand('setContext', 'arkletEnabled', false);
        return;
    }

    // 检查每个工作区文件夹
    let arkletEnabled = false;
    for (const folder of workspaceFolders) {
        const packageJsonPath = path.join(folder.uri.fsPath, 'package.json');
        
        try {
            if (fs.existsSync(packageJsonPath)) {
                const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
                const packageJson = JSON.parse(packageJsonContent);
                
                if (packageJson.arklet === true) {
                    arkletEnabled = true;
                    break;
                }
            }
        } catch (error) {
            console.error('检查 package.json 时出错:', error);
        }
    }

    // 设置上下文变量，控制菜单项是否显示
    vscode.commands.executeCommand('setContext', 'arkletEnabled', arkletEnabled);

    // 如果不符合条件，不注册命令
    if (!arkletEnabled) {
        return;
    }

    // 注册命令
    let disposable = vscode.commands.registerCommand('arklet-plugin.executeWithTsx', (fileUri: vscode.Uri) => {
        if (!fileUri) {
            vscode.window.showErrorMessage('请在 .ts 或 .js 文件上右键选择 Arklet 选项');
            return;
        }

        const filePath = fileUri.fsPath;
        const fileExt = path.extname(filePath);
        const fileDir = path.dirname(filePath);
        const fileName = path.basename(filePath);
        
        if (fileExt !== '.ts' && fileExt !== '.js') {
            vscode.window.showErrorMessage('只支持执行 .ts 或 .js 文件');
            return;
        }

        // 创建输出通道，用于显示详细信息
        const outputChannel = vscode.window.createOutputChannel('Arklet');
        outputChannel.show();
        outputChannel.appendLine(`开始执行文件: ${filePath}\n`);
        
        // 检查 tsx 是否安装
        exec('tsx --version', (error: any) => {
            if (error) {
                vscode.window.showErrorMessage('未检测到 tsx 命令，请确保已全局安装：pnpm install -g tsx');
                return;
            }
            
            // 在文件目录下执行 tsx 命令
            const command = `cd "${fileDir}" && tsx "${filePath}"`;
            outputChannel.appendLine(`执行命令: ${command}\n`);
            
            exec(command, { cwd: fileDir }, (error: any, stdout: string, stderr: string) => {
                if (error) {
                    outputChannel.appendLine(`执行错误: ${error.message}\n`);
                    vscode.window.showErrorMessage(`执行失败: ${fileName}`);
                    return;
                }
                
                if (stderr) {
                    outputChannel.appendLine(`错误输出: ${stderr}\n`);
                }
                
                if (stdout) {
                    outputChannel.appendLine(`标准输出:\n${stdout}\n`);
                }
                
                // 检查是否创建了 response.json 文件
                const responseFilePath = path.join(fileDir, 'response.json');
                let resultMessage = `执行成功: ${fileName}`;
                
                try {
                    if (fs.existsSync(responseFilePath)) {
                        const stats = fs.statSync(responseFilePath);
                        const fileSizeKB = Math.round(stats.size / 1024 * 10) / 10;
                        
                        resultMessage += ` (已生成 response.json, ${fileSizeKB}KB)`;
                        outputChannel.appendLine(`已创建文件: ${responseFilePath} (${fileSizeKB}KB)\n`);
                    }
                } catch (err) {
                    // 忽略文件检查错误
                }
                
                vscode.window.showInformationMessage(resultMessage);
            });
        });
    });

    // 监听工作区变化，重新检查条件
    const fileSystemWatcher = vscode.workspace.createFileSystemWatcher('**/package.json');
    
    fileSystemWatcher.onDidChange(async () => {
        await checkArkletEnabled();
    });
    
    fileSystemWatcher.onDidCreate(async () => {
        await checkArkletEnabled();
    });
    
    fileSystemWatcher.onDidDelete(async () => {
        await checkArkletEnabled();
    });
    
    // 检查工作区中的 package.json 是否包含 arklet: true
    async function checkArkletEnabled() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.commands.executeCommand('setContext', 'arkletEnabled', false);
            return;
        }
        
        let enabled = false;
        for (const folder of workspaceFolders) {
            const packageJsonPath = path.join(folder.uri.fsPath, 'package.json');
            
            try {
                if (fs.existsSync(packageJsonPath)) {
                    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
                    const packageJson = JSON.parse(packageJsonContent);
                    
                    if (packageJson.arklet === true) {
                        enabled = true;
                        break;
                    }
                }
            } catch (error) {
                console.error('检查 package.json 时出错:', error);
            }
        }
        
        vscode.commands.executeCommand('setContext', 'arkletEnabled', enabled);
    }
    
    // 将资源释放添加到上下文中
    context.subscriptions.push(disposable, fileSystemWatcher);
}

export function deactivate() {} 