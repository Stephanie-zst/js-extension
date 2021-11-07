class VscodeWorker {
  constructor(_vscode) { //构造函数，传入vscode对象
    this.vscode = _vscode;
  }
  
  // 注册指令
  registerCommand (commandId, callback) {
    return this.vscode.commands.registerCommand(commandId, callback);
  }

  // info信息
  showInfoMessage (msg = '') {
    this.vscode.window.showInformationMessage(msg);
  }
  
  // 错误信息
  showErrorMessage (msg) {
    this.vscode.window.showErrorMessage(msg);
  }

  // 状态栏提示信息
  setStatusBarMessage (msg = '欢迎━(*｀∀´*)ノ亻!', duration = 5000) {
    this.vscode.window.setStatusBarMessage(msg, duration);
  }

  // 用户输入文件夹名称
  async showInputBox(options = {
    password: false, // 输入内容是否是密码
    ignoreFocusOut: true, // 默认false 设置为true时鼠标点击别的地方输入框不会消失
    placeHolder: '请输入文件名？', // 在输入框内的提示信息
    prompt: '请输入文件名', // 在输入框下方的提示信息
    validateInput: (text) => {
      if (!text) return '命名不合法'
      return null
    }
  }) {
    return await this.vscode.window.showInputBox(options)
  }

  // 用户选择模板组件
  async showQuickPick(options = {
    title: '选择模板组件',
    placeHolder: '搜索模板组件',
    canPickMany: true,
    ignoreFocusOut: true,
  }) {
    const { TEMPLATE_LIST } = require('../util/constant');
    const res = await this.vscode.window.showQuickPick(TEMPLATE_LIST, options)
    if(res.length) return res
    this.showErrorMessage('创建失败！没有选择模板组件！')
    return
  }

  // 打开本地文件
  async showOpenDialog(options = {}) {
    return await this.vscode.window.showOpenDialog(options)
  }

  // 替换当前编辑器全部内容
  replaceTextEditor () {
    this.vscode.window.activeTextEditor.edit(editBuilder => {
      const end = new this.vscode.Position(this.vscode.window.activeTextEditor.document.lineCount + 1, 0);
      const range = new this.vscode.Range(new this.vscode.Position(0, 0), end)
      const text = '新替换的内容';
      editBuilder.replace(range, text);
    });
  }

  // 打开文件并选中某段文字
  activeText (path, options = {}) {
    // path = '/Users/stephanie/Desktop/my/study-result/vscode插件/text/test.js'
    // options = {
    //   // 选中第2行第20列 -> 第2行第101列
    //   selection: new this.vscode.Range(new this.vscode.Position(1, 19), new this.vscode.Position(1, 100)),
    //   // 是否预览，默认true，预览的意思是下次再打开文件是否会替换当前文件
    //   preview: false,
    //   // 显示在第二个编辑器
    //   viewColumn: this.vscode.ViewColumn.Two
    // };
    if (!path) return this.showErrorMessage("打开文件的路径错误")
    this.vscode.window.showTextDocument(this.vscode.Uri.file(path), options);
  }

}

module.exports = VscodeWorker;