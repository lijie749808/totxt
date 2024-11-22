# ToTxt

[English](README.md) | [简体中文](README.zh-CN.md)

A modern web application for file-to-text conversion, with a focus on efficient PDF text extraction.

## Features

- PDF Text Extraction
  - Efficient text extraction using PDF.js
  - Multi-page document support
  - Page numbering and formatting
  - Real-time conversion progress tracking

- Additional File Format Support (Coming Soon)
  - Microsoft Word documents (.docx)
  - Excel spreadsheets (.xlsx)
  - Images (with OCR support)
  - Markdown files

## Project Structure

```
totxt/
├── public/              # Static files
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/      # React components
│   │   ├── FileUploader.js
│   │   └── ConversionProgress.js
│   ├── layouts/         # Layout components
│   │   ├── MainLayout.js
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── pages/          # Page components
│   │   ├── Home.js     # Homepage
│   │   ├── Features.js # Features page
│   │   ├── Docs.js     # Documentation
│   │   └── User/       # User-related pages
│   ├── services/       # Business logic
│   │   └── conversionService.js
│   ├── styles/         # CSS styles
│   │   └── custom.css
│   ├── utils/          # Utility functions
│   │   └── fileUtils.js
│   └── workers/        # Web Workers
│       └── pdf.worker.js
└── scripts/            # Build scripts
    └── copy-worker.js
```

## Core Modules

### 1. Layout Components
- **Navbar**
  * Logo and branding
  * Navigation menu
  * Theme switcher (light/dark)
  * Language selector
  * User menu/login button
- **Footer**
  * Copyright information
  * Social media links
  * Contact information

### 2. Main Features
- **Homepage**
  * Feature highlights
  * Quick start guide
  * Usage statistics
- **Features Page**
  * File conversion interface
  * Conversion history
  * Batch processing
- **Documentation Center**
  * User guide
  * API documentation
  * FAQ

### 3. User System (Coming Soon)
- **Authentication**
  * Login/Registration
  * OAuth integration
  * Password reset
- **User Center**
  * Profile management
  * Usage history
  * Settings

### 4. Supporting Features
- Search functionality
- Notification system
- Help center
- Error pages (404, 500)

## Tech Stack

- Frontend Framework: React
- UI Framework: Chakra UI
- PDF Processing: PDF.js
- Document Processing:
  - Mammoth.js (Word)
  - XLSX.js (Excel)
  - Tesseract.js (OCR)

## Quick Start

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

The application will run on `http://localhost:3000`.

## Contributing

Pull requests are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering engine
- [Chakra UI](https://chakra-ui.com/) - UI component library
- [Create React App](https://create-react-app.dev/) - React application scaffolding
