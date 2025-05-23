# CodEngine - Interactive Online Judge Platform

A modern, interactive online judge platform that leverages the CodeChef API to provide a seamless coding experience.

## 🚀 Features

- 📱 Responsive and intuitive user interface
- 🔐 Secure authentication using CodeChef API
- 🔍 Advanced contest search functionality
- 📚 Comprehensive problem statements
- 📝 Integrated code editor with syntax highlighting
- 🔄 Real-time code execution and output
- 🏆 Contest participation and problem solving

## 📋 Project Architecture

```mermaid
graph TD
    A[Frontend (React)] --> B[Authentication Module]
    A --> C[Contest Search Module]
    A --> D[Problem Display Module]
    A --> E[Code Editor Module]
    
    B --> F[CodeChef API Integration]
    C --> F
    D --> F
    E --> G[Execution Engine]
    
    F[CodeChef API Integration] --> H[User Authentication]
    F --> I[Contest Data]
    F --> J[Problem Data]
    
    G[Execution Engine] --> K[Code Execution]
    G --> L[Output Processing]
```

## 📸 Screenshots

### Home Page
![Home Page](Images/front-view.png)

### Authentication
![Authentication](Images/Login-page.png)

### Contest Search
![Contest Search](Images/Search-page.png)

### Contest Page
![Contest Page](Images/Contest-page.png)

### Problem Statement
![Problem Statement](Images/Problem-page.png)

### Code Editor
![Code Editor](Images/Code-page.png)

### Text Editor
![Text Editor](Images/Text-editor.png)

### Input Page
![Input Page](Images/Input-page.png)

### Run Page
![Run Page](Images/Run-page.png)

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js
- **API**: CodeChef API
- **UI Components**: Modern CSS/HTML
- **Code Editor**: Custom implementation with syntax highlighting

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/CodEngine.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your CodeChef API credentials
```

4. Start the development server:
```bash
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

<br/>
Happy Coding!!!
