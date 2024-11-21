const fs = require('fs');
const path = require('path');

// 源文件路径
const workerSrc = path.resolve(
  __dirname,
  '../node_modules/pdfjs-dist/build/pdf.worker.min.mjs'
);

// 目标文件路径
const workerDest = path.resolve(
  __dirname,
  '../public/pdf.worker.min.mjs'
);

// 确保目标目录存在
const destDir = path.dirname(workerDest);
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 复制文件
try {
  fs.copyFileSync(workerSrc, workerDest);
  console.log('Worker file copied successfully!');
} catch (error) {
  console.error('Error copying worker file:', error);
  process.exit(1);
}
