const fs = require('fs');
const path = require('path');

// 源文件路径
const workerPath = path.join(__dirname, 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.worker.min.js');

// 目标路径
const targetPath = path.join(__dirname, 'public', 'pdf.worker.min.js');

// 确保目标目录存在
const targetDir = path.dirname(targetPath);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 复制文件
fs.copyFileSync(workerPath, targetPath);

console.log('PDF.js worker file copied successfully!');
