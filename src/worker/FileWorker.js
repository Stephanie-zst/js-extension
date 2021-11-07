const fs = require('fs');
const path = require('path');

class FileWorker {
  constructor({ destPath, folderName, templates, vscodeWorker }) {
    this.destPath = destPath; // 创建文件夹父目录pwd
    this.folderName = folderName; // 文件夹名称
    this.templates = templates; // 选择的模板文件
    this.vscodeWorker = vscodeWorker; // vscodeWorker实例
    this.newDir = '' // 创建文件夹pwd
  }

  /**
   * 创建文件夹
   */
  createFolder () {
    // 判断当前位置是文件夹 or 文件
    // 文件夹 -> 文件夹pwd
    // 文件 -> 文件父目录pwd
    const temp = fs.statSync(this.destPath);
    const destDir = temp.isDirectory() ? this.destPath : path.dirname(this.destPath)
    this.newDir = path.join(destDir, this.folderName)

    fs.mkdir(this.newDir, (err) => {
      if (err) {
        console.log('err => :', err)
        return this.vscodeWorker.showInfoMessage(err)
      }
      this.findTemplate()
      return this.vscodeWorker.showInfoMessage('创建目录成功')
    });
  }

  /**
   * 查找选择的模板文件
   */
  findTemplate () {
    this.templates.forEach(folder => {
      const copiedPath = path.resolve(__dirname, '..', `template/${folder}`)
      console.log('copiedPath => :', copiedPath)
      // this.copyFile(copiedPath, this.newDir, this.vscodeWorker)
    })
  }

  /**
   * 从模板拷贝文件到目标文件夹
   * @param { copiedDir: string } 被复制文件的地址
   * @param { resultDir: string } 放置复制文件的地址
   */
  copyFile (copiedDir, resultDir) {
    var files = fs.readdirSync(copiedDir);
    files.forEach((file) => {
      const filePath = path.join(copiedDir, file);
      const temp = fs.statSync(filePath);
      if (temp.isFile()) { // 是文件
        const dest = path.join(resultDir, file)
        fs.copyFile(filePath, dest, (err) => {
          if (!err) this.vscodeWorker.showInfoMessage(`创建 ${file} 文件成功`)
          return this.vscodeWorker.showErrorMessage(err)
        });
      }
    });
  }
}

module.exports = FileWorker;