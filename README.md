# ToTxt

A modern web application for converting various file types to text, with a primary focus on efficient PDF text extraction.

## Features

- 📄 PDF Text Extraction
  - Efficient text extraction using PDF.js
  - Support for multi-page documents
  - Page numbering and formatting
  - Progress tracking during conversion

- 📝 Additional File Support (Coming Soon)
  - Microsoft Word documents (.docx)
  - Excel spreadsheets (.xlsx)
  - Images (OCR support)
  - Markdown files

## Tech Stack

- Frontend: React
- UI Framework: Tailwind CSS
- PDF Processing: PDF.js
- Document Processing:
  - Mammoth.js (Word)
  - XLSX.js (Excel)
  - Tesseract.js (OCR)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lijie749808/totxt.git
cd totxt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Usage

1. Open the application in your web browser
2. Click the upload button or drag and drop your file
3. Wait for the conversion to complete
4. The extracted text will be displayed and ready for copying

## Development

### Project Structure

```
totxt/
├── public/
├── src/
│   ├── components/      # React components
│   ├── services/        # Business logic
│   ├── styles/          # CSS styles
│   ├── utils/           # Utility functions
│   └── workers/         # Web workers
└── scripts/             # Build scripts
```

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering engine
- [Create React App](https://create-react-app.dev/) - React application boilerplate
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
