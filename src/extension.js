const vscode = require('vscode');

// 注册命令
function activate(context) {
  const VscodeWorker = require('./worker/VscodeWorker');
  const vscodeWorker = new VscodeWorker(vscode);

  const disposable = vscodeWorker.registerCommand('js-extension.createTemplate', async (args = {}) => {
    vscodeWorker.setStatusBarMessage()
    if (!args.path) return
    // 用户输入文件夹名称
    const folderName = await vscodeWorker.showInputBox()
    // 用户选择模板组件
    const templates = await vscodeWorker.showQuickPick()
    if (templates) {
      const FileWorker = require('./worker/FileWorker');
      const fileWorker = new FileWorker({
        destPath: args.path,
        folderName,
        templates,
        vscodeWorker,
      });
      fileWorker.createFolder()
    }
  })
	context.subscriptions.push(disposable);
}

function deactivate() {
	console.log('your extension is now deactivate!');
}

module.exports = {
	activate,
	deactivate
}
