# ToTxt

[English](README.md) | [简体中文](README.zh-CN.md)

A modern web application for file-to-text conversion, with a focus on efficient PDF text extraction and user management.

## Features

- PDF Text Extraction
  - Efficient text extraction using PDF.js
  - Multi-page document support
  - Page numbering and formatting
  - Real-time conversion progress tracking

- User Management
  - User registration and login
  - Email verification
  - Password reset functionality
  - User dashboard

- Additional File Format Support (Coming Soon)
  - Microsoft Word documents (.docx)
  - Excel spreadsheets (.xlsx)
  - Images (with OCR support)
  - Markdown files

## Project Structure

```
totxt/
├── client/             # Frontend application
│   ├── public/         # Static files
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── components/ # React components
│       ├── layouts/    # Layout components
│       ├── pages/      # Page components
│       ├── services/   # Business logic
│       ├── styles/     # CSS styles
│       ├── utils/      # Utility functions
│       └── workers/    # Web Workers
├── server/             # Backend application
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── utils/          # Utility functions
└── scripts/            # Build scripts
```

## Core Modules

### Frontend

#### 1. Layout Components
- **Navbar**
  * Logo and branding
  * Navigation menu
  * Theme switcher (light/dark)
  * User menu/login button
- **Footer**
  * Copyright information
  * Social media links

#### 2. Main Features
- **Homepage**
  * Feature highlights
  * Quick start guide
- **Features Page**
  * File conversion interface
  * Conversion history
- **Documentation Center**
  * User guide
  * API documentation
  * FAQ

#### 3. User System
- **Authentication**
  * Login/Registration
  * Email verification
  * Password reset
- **User Dashboard**
  * Profile management
  * Usage history
  * Settings

### Backend

#### 1. API Endpoints
- **Authentication**
  * User registration
  * User login
  * Email verification
  * Password reset
- **User Management**
  * Profile updates
  * Settings management

#### 2. Database
- MongoDB for user data storage
- Mongoose ODM for data modeling

## Tech Stack

### Frontend
- Framework: React
- UI Framework: Chakra UI
- PDF Processing: PDF.js
- State Management: Context API
- Routing: React Router

### Backend
- Runtime: Node.js
- Framework: Express
- Database: MongoDB
- ODM: Mongoose
- Authentication: JWT
- Email: Nodemailer

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lijie749808/totxt.git
cd totxt
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Configure environment variables:
Create a `.env` file in the server directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

4. Start the development servers:
```bash
# Start backend server (from server directory)
npm start
# Server will run on http://localhost:5000

# Start frontend development server (from client directory)
cd ../client
npm start
# Client will run on http://localhost:3000
```

## Development

### Running Tests
```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd ../server
npm test
```

### Code Style
- ESLint for code linting
- Prettier for code formatting

## Contributing

Pull requests are welcome! Please make sure to:
1. Write clear commit messages
2. Follow the existing code style
3. Add tests for new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering engine
- [Chakra UI](https://chakra-ui.com/) - UI component library
- [Create React App](https://create-react-app.dev/) - React application scaffolding
- [Express](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
