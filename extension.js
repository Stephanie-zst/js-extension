const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

/**
 * 创建文件夹
 * @param { destPath: String } 目标地址
 * @param { folderName: String } 文件夹
 */
function createFolder (destPath, folderName) {
  // 判断当前位置是文件夹 or 文件
  // 文件位置向上回溯一级到文件夹目录
  const temp = fs.statSync(destPath);
  const destDir = temp.isDirectory() ? destPath : path.dirname(destPath)
  const resultPath = path.join(destDir, folderName)

  fs.mkdir(resultPath, (err) => {
    if (!err) {
      const copiedPath = path.resolve(__dirname, 'template')
      copyFile(copiedPath, resultPath)
      return console.log('创建目录成功！')
    }
    return console.log('createFolder err => :', err)
  });
}

/**
 * 从模板拷贝文件到目标文件夹
 * @param { copiedDir: String } 被复制文件的地址
 * @param { resultDir: String } 放置复制文件的地址
 */
function copyFile (copiedDir, resultDir) {
  var files = fs.readdirSync(copiedDir);
  files.forEach((file) => {
    const filePath = path.join(copiedDir, file);
    const temp = fs.statSync(filePath);
    if (temp.isFile()) { // 是文件
      const dest = path.join(resultDir, file)
      console.log('{object} => :', {filePath, dest})
      fs.copyFile(filePath, dest, (err) => {
        console.log('copyFile err => :', err)
      });
    }
  });
}

function showInput(path) {
  const inputData = {
    password: false, // 输入内容是否是密码
    ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
    placeHolder: '请输入模板文件名？', // 在输入框内的提示信息
    prompt: '请输入模板文件名', // 在输入框下方的提示信息
    validateInput: (text) => {
      if (!text) return '命名要合法'
      return null
    }
  }
  vscode.window.showInputBox(inputData).then((folderName) => {
    createFolder(path, folderName)
    // vscode.window.showQuickPick(
    //   ["111","666","222","555"],
    //   {
    //     canPickMany:true,
    //     ignoreFocusOut:true,
    //     matchOnDescription:true,
    //     matchOnDetail:true,
    //     placeHolder:'温馨提示，请选择你是哪种类型？'
    //   }
    // ).then((msg) => {
    //   console.log("用户选择：" + msg);
    //   // createFolder(name)
    // })
  });
}

// 注册命令
function activate(context) {
  // args: {
  //   "$mid":1,
  //   "fsPath":"/Users/stephanie/Desktop/my/study-result/vscode插件/text/index.text",
  //   "external":"file:///Users/stephanie/Desktop/my/study-result/vscode%E6%8F%92%E4%BB%B6/text/index.text",
  //   "path":"/Users/stephanie/Desktop/my/study-result/vscode插件/text/index.text",
  //   "scheme":"file"
  // }
	let disposable = vscode.commands.registerCommand('js-extension.helloWorld', (args) => {
		vscode.window.showInformationMessage(`当前文件(夹)路径是：${args?.path ||'空'}`);
    args?.path && showInput(args.path)
	});
	context.subscriptions.push(disposable);
}

function deactivate() {
	console.log('your extension is now deactivate!');
}

module.exports = {
	activate,
	deactivate
}
