import React, { useState, useCallback } from 'react';
import { isSupportedFileType, formatFileSize } from '../utils/fileUtils';
import { convertFile } from '../services/conversionService';
import ConversionProgress from './ConversionProgress';

const FileUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [errors, setErrors] = useState({});
  const [converting, setConverting] = useState({});

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    await processFiles(droppedFiles);
  };

  const handleFileInput = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    await processFiles(selectedFiles);
  };

  const downloadText = (text, fileName) => {
    console.log('准备下载文件:', fileName);
    try {
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.txt`;
      document.body.appendChild(a);
      console.log('触发下载...');
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('下载已触发');
    } catch (error) {
      console.error('下载文件时出错:', error);
      setErrors(prev => ({
        ...prev,
        [fileName]: `下载失败: ${error.message}`
      }));
    }
  };

  const processFiles = async (newFiles) => {
    console.log('开始处理文件:', newFiles.map(f => f.name));
    const validFiles = newFiles.filter(file => isSupportedFileType(file));
    
    if (validFiles.length === 0) {
      console.log('没有有效的文件');
      setErrors(prev => ({
        ...prev,
        general: '请选择支持的文件格式'
      }));
      return;
    }

    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    
    for (const file of validFiles) {
      console.log('处理文件:', file.name);
      try {
        setConverting(prev => ({ ...prev, [file.name]: true }));
        setErrors(prev => ({ ...prev, [file.name]: null }));
        
        const onProgress = (percent) => {
          console.log(`文件 ${file.name} 转换进度: ${percent}%`);
          setProgress(prev => ({
            ...prev,
            [file.name]: percent
          }));
        };

        console.log('开始转换文件:', file.name);
        const result = await convertFile(file, onProgress);
        console.log('文件转换完成:', file.name);
        
        if (result.success && result.text) {
          console.log(`文件 ${file.name} 转换成功，文本长度: ${result.text.length}`);
          downloadText(result.text, file.name);
        } else {
          throw new Error(result.error || '转换结果为空');
        }
      } catch (err) {
        console.error(`处理文件 ${file.name} 时出错:`, err);
        setErrors(prev => ({
          ...prev,
          [file.name]: `转换失败: ${err.message}`
        }));
      } finally {
        setConverting(prev => ({ ...prev, [file.name]: false }));
      }
    }
  };

  const removeFile = useCallback((fileName) => {
    console.log('移除文件:', fileName);
    setFiles(prev => prev.filter(f => f.name !== fileName));
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileName];
      return newProgress;
    });
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fileName];
      return newErrors;
    });
    setConverting(prev => {
      const newConverting = { ...prev };
      delete newConverting[fileName];
      return newConverting;
    });
  }, []);

  return (
    <div className="space-y-4">
      <div 
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="fileInput"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.html,.md,.markdown"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <div className="text-lg mb-2">
            拖拽文件到这里或点击选择文件
          </div>
          <div className="text-sm text-gray-500">
            支持 PDF、Word、Excel、图片等格式
          </div>
        </label>
      </div>

      {errors.general && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg">
          {errors.general}
        </div>
      )}

      {files.map(file => (
        <div key={file.name} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="font-medium">{file.name}</div>
              <div className="text-sm text-gray-500">{formatFileSize(file.size)}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {converting[file.name] ? '正在转换...' : 
                 progress[file.name] === 100 ? '转换完成' : ''}
              </div>
              <button
                onClick={() => removeFile(file.name)}
                className="text-red-500 hover:text-red-700"
              >
                删除
              </button>
            </div>
          </div>
          
          {errors[file.name] ? (
            <div className="text-red-500 text-sm mt-2">
              {errors[file.name]}
            </div>
          ) : (
            <ConversionProgress 
              progress={progress[file.name] || 0} 
              fileName={file.name}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FileUploader;
