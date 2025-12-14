# Smart Task Productivity Application

## Overview
The Smart Task Productivity Application is designed to help users manage their tasks efficiently. It consists of a Django backend and a React frontend, providing a seamless experience for task management.

## Project Structure
```
smarttask-productivity-app
├── code
│   ├── backend
│   │   ├── manage.py
│   │   ├── requirements.txt
│   │   ├── Dockerfile
│   │   └── backend
│   │       ├── __init__.py
│   │       ├── asgi.py
│   │       ├── settings.py
│   │       ├── urls.py
│   │       └── wsgi.py
│   └── frontend
│       ├── package.json
│       ├── vite.config.js
│       ├── index.html
│       ├── src
│       │   ├── main.jsx
│       │   ├── App.jsx
│       │   ├── index.css
│       │   └── assets
│       └── public
├── docs
│   └── architecture.md
├── erd
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.x
- Node.js and npm
- Docker (optional)

### Backend Setup
1. Navigate to the `code/backend` directory.
2. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```
3. Run the Django development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the `code/frontend` directory.
2. Install the required npm packages:
   ```
   npm install
   ```
3. Start the Vite development server:
   ```
   npm run dev
   ```

## Docker Setup
To run the application using Docker, you can use the provided `docker-compose.yml` file. Run the following command in the root directory:
```
docker-compose up
```

## Documentation
For more detailed information about the architecture and design of the application, please refer to the `docs/architecture.md` file.

## License
This project is licensed under the MIT License - see the LICENSE file for details.