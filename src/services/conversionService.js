import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { createWorker } from 'tesseract.js';
import { marked } from 'marked';
import { convert } from 'html-to-text';

// 初始化 PDF.js
const PDFJS = pdfjsLib;
const workerUrl = new URL('../../node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url);
PDFJS.GlobalWorkerOptions.workerSrc = workerUrl.href;

// PDF 转换函数
async function convertPDF(file, onProgress) {
  try {
    console.log('开始转换 PDF:', file.name);
    
    // 读取文件内容
    const fileReader = new FileReader();
    const arrayBuffer = await new Promise((resolve, reject) => {
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(new Error('文件读取失败'));
      fileReader.readAsArrayBuffer(file);
    });

    console.log('文件读取完成，开始加载 PDF');

    // 加载 PDF 文档
    const loadingTask = PDFJS.getDocument({
      data: arrayBuffer,
      cMapUrl: 'https://unpkg.com/pdfjs-dist@4.8.69/cmaps/',
      cMapPacked: true,
    });

    // 监听加载进度
    loadingTask.onProgress = ({ loaded, total }) => {
      if (total && loaded < total) {
        onProgress(Math.round((loaded / total) * 50));
      }
    };

    const pdf = await loadingTask.promise;
    console.log('PDF 加载完成，页数:', pdf.numPages);
    
    let text = '';
    const numPages = pdf.numPages;

    // 提取每页文本
    for (let i = 1; i <= numPages; i++) {
      try {
        console.log(`开始处理第 ${i} 页`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent({
          normalizeWhitespace: true,
          disableCombineTextItems: false,
        });

        const pageText = textContent.items
          .map(item => item.str)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (pageText) {
          text += `--- 第 ${i} 页 ---\n${pageText}\n\n`;
        }

        // 更新进度
        onProgress(50 + Math.round((i / numPages) * 50));
        console.log(`第 ${i} 页处理完成`);
        
      } catch (pageError) {
        console.error(`提取第 ${i} 页文本时出错:`, pageError);
        text += `--- 第 ${i} 页 (提取失败) ---\n\n`;
      }
    }

    if (!text.trim()) {
      throw new Error('未能从 PDF 中提取到任何文本');
    }

    console.log('PDF 转换完成');
    return text.trim();
  } catch (error) {
    console.error('PDF 转换错误:', error);
    throw new Error(`PDF 转换失败: ${error.message}`);
  }
}

// Word 文档转换函数
async function convertWord(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

// Excel 转换函数
async function convertExcel(file) {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer);
  let text = '';
  
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    text += `Sheet: ${sheetName}\n`;
    text += XLSX.utils.sheet_to_txt(sheet) + '\n\n';
  });
  
  return text;
}

// 图片 OCR 转换函数
async function convertImage(file, onProgress) {
  const worker = await createWorker();
  await worker.loadLanguage('eng+chi_sim');
  await worker.initialize('eng+chi_sim');
  
  const { data: { text } } = await worker.recognize(file, {
    progress: progress => onProgress(Math.round(progress * 100))
  });
  
  await worker.terminate();
  return text;
}

// Markdown 转换函数
function convertMarkdown(text) {
  return marked.parse(text);
}

// HTML 转换函数
function convertHTML(html) {
  return convert(html, {
    wordwrap: 130,
    preserveNewlines: true,
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: 'a', options: { hideLinkHrefIfSameAsText: true } }
    ]
  });
}

// 主转换函数
export const convertFile = async (file, onProgress = () => {}) => {
  try {
    let text = '';
    const fileType = file.type;

    switch (fileType) {
      case 'application/pdf':
        text = await convertPDF(file, onProgress);
        break;
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        text = await convertWord(file);
        onProgress(100);
        break;
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        text = await convertExcel(file);
        onProgress(100);
        break;
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        text = await convertImage(file, onProgress);
        break;
      case 'text/html':
        const reader = new FileReader();
        text = await new Promise((resolve) => {
          reader.onload = (e) => resolve(convertHTML(e.target.result));
          reader.readAsText(file);
        });
        onProgress(100);
        break;
      case 'text/markdown':
        const mdReader = new FileReader();
        text = await new Promise((resolve) => {
          mdReader.onload = (e) => resolve(convertMarkdown(e.target.result));
          mdReader.readAsText(file);
        });
        onProgress(100);
        break;
      default:
        throw new Error(`不支持的文件类型: ${fileType}`);
    }

    return {
      success: true,
      text,
      error: null
    };
  } catch (error) {
    console.error('文件转换错误:', error);
    return {
      success: false,
      text: null,
      error: error.message
    };
  }
};
