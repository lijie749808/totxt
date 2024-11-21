import React from 'react';
import FileUploader from './components/FileUploader';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          ToTxt File Converter
        </h1>
        <FileUploader />
      </div>
    </div>
  );
}

export default App;
