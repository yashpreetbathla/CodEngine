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

## 📁 Project Structure

```
CodEngine/
├── src/                # Source code directory
│   ├── components/     # React components
│   │   ├── Auth/      # Authentication components
│   │   ├── Contest/   # Contest-related components
│   │   ├── Problem/   # Problem statement components
│   │   └── Editor/    # Code editor components
│   ├── pages/         # Page components
│   │   ├── Home/      # Home page
│   │   ├── Login/     # Login page
│   │   ├── Search/    # Search page
│   │   ├── Contest/   # Contest page
│   │   ├── Problem/   # Problem page
│   │   └── Code/      # Code editor page
│   ├── utils/         # Utility functions
│   ├── styles/        # CSS/SCSS files
│   └── config/        # Configuration files
├── public/            # Public assets
├── server/            # Backend server
│   ├── server.js      # Main server file
│   ├── config/        # Server configuration
│   └── routes/        # API routes
├── firebase/          # Firebase configuration
│   ├── config/        # Firebase config
│   ├── functions/     # Firebase functions
│   └── index.js       # Firebase initialization
├── Images/           # Screenshot assets
│   ├── front-view.png
│   ├── Login-page.png
│   ├── Search-page.png
│   ├── Contest-page.png
│   ├── Problem-page.png
│   ├── Code-page.png
│   ├── Text-editor.png
│   ├── Input-page.png
│   └── Run-page.png
├── package.json       # Project dependencies
├── package-lock.json  # Dependency versions
├── README.md         # Project documentation
└── .gitignore        # Git ignore rules
```

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Frontend
        UI[User Interface]
        Auth[Authentication Module]
        Search[Contest Search Module]
        Display[Problem Display Module]
        Editor[Code Editor Module]
    end

    subgraph Backend
        API[CodeChef API Integration]
        EE[Execution Engine]
        DB[Data Processing]
    end

    subgraph External
        CodeChef[CodeChef API]
        Auth0[Authentication Service]
    end

    %% Frontend Components
    UI --> Auth
    UI --> Search
    UI --> Display
    UI --> Editor

    %% API Integration
    Auth --> API
    Search --> API
    Display --> API
    Editor --> EE

    %% Backend Services
    API --> CodeChef
    API --> Auth0
    EE --> DB
    DB --> Editor

    %% Data Flow
    Auth --> UserAuth[User Authentication]
    Search --> ContestData[Contest Data]
    Display --> ProblemData[Problem Data]
    Editor --> Execution[Code Execution]
    Execution --> Output[Output Processing]

    %% Styling
    classDef frontend fill:#f9f,stroke:#333,stroke-width:2px
    classDef backend fill:#bbf,stroke:#333,stroke-width:2px
    classDef external fill:#bfb,stroke:#333,stroke-width:2px

    class UI,Auth,Search,Display,Editor frontend
    class API,EE,DB backend
    class CodeChef,Auth0 external
```

## 📸 Screenshots

### 🏠 Home Page

![Home Page](Images/front-view.png)

### 🔐 Authentication

![Authentication](Images/Login-page.png)

### 🔍 Contest Search

![Contest Search](Images/Search-page.png)

### 📋 Contest Page

![Contest Page](Images/Contest-page.png)

### 📖 Problem Statement

![Problem Statement](Images/Problem-page.png)

### 💻 Code Editor

![Code Editor](Images/Code-page.png)

### 📝 Text Editor

![Text Editor](Images/Text-editor.png)

### 📥 Input Page

![Input Page](Images/Input-page.png)

### 🔄 Run Page

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
