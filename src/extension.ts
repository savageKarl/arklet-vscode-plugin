import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('arklet-plugin.executeWithTsx', (fileUri: vscode.Uri) => {
        if (!fileUri) {
            vscode.window.showErrorMessage('请在文件上右键选择 Arklet 选项');
            return;
        }

        const filePath = fileUri.fsPath;
        
        // 执行 tsx 命令
        exec(`tsx "${filePath}"`, (error: any, stdout: string, stderr: string) => {
            if (error) {
                vscode.window.showErrorMessage(`执行错误: ${error.message}`);
                return;
            }
            
            if (stderr) {
                vscode.window.showErrorMessage(`错误输出: ${stderr}`);
                return;
            }
            
            vscode.window.showInformationMessage(`执行成功！输出: ${stdout}`);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {} 