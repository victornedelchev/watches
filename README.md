# 🕐 HandTime - Watch Collection Platform

A modern Angular-based web application for managing and showcasing watch collections. Built with Angular 16.2, featuring user authentication, watch management, weather integration, and world clock functionality.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Author](#-author)

## ✨ Features

### 🔐 Authentication & User Management
- User registration and login
- Profile management
- Session management with access tokens
- Route guards for protected pages

### ⌚ Watch Management
- Browse watch collections
- Add new watches to collection
- Edit watch details (with confirmation)
- Delete watches (with confirmation)
- Search and filter watches
- Like/unlike watches
- Watch details with comments
- Edit and delete comments (with confirmation)

### 🌤️ Weather Integration
- Real-time weather information
- Weather icons and conditions
- Temperature and humidity data
- Location-based weather

### 🌍 World Clock
- Multiple timezone support
- Real-time clock updates
- Global time comparison

### 🎨 User Interface
- Responsive design with Bootstrap 5
- Modern and clean UI
- FontAwesome icons
- Interactive components
- Loading states and animations

## 🛠️ Technologies Used

### Frontend

- **Angular 16.2.0** - Frontend framework
- **TypeScript 5.1.3** - Programming language
- **Bootstrap 5.2.3** - CSS framework
- **FontAwesome** - Icon library
- **RxJS** - Reactive programming
- **Luxon** - Date/time manipulation
- **Google Maps API** - Location services

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **RESTful API** - API architecture
- **JSON** - Data storage

## 📁 Project Structure

```

# Angular frontend application


 # Authentication modules
 # Core services and interfaces
 # Feature modules
 # Main pages
 # Watch management
 # Shared components
 # Static assets
 # Environment configuration

 # Node.js backend
 # JSON data files
 # Main server file


```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
# or
node server.js
```

The backend will run on `http://localhost:3030`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client/handtime
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200`

## 📖 Usage

### Getting Started

1. **Register/Login**: Create an account or log in to access full features
2. **Browse Watches**: View the watch collection on the home page
3. **Add Watches**: Use the "Add Watch" feature to contribute to the collection
4. **Interact**: Like watches, add comments, and explore details
5. **Weather**: Check current weather conditions
6. **World Clock**: View time in different timezones

### Key Features

- **Watch Management**: Full CRUD operations for watch collections
- **User Authentication**: Secure login/registration system
- **Real-time Updates**: Live weather and clock data
- **Responsive Design**: Works on desktop and mobile devices

## 🔌 API Endpoints

### Authentication
- `POST /users/register` - User registration
- `POST /users/login` - User login
- `POST /users/logout` - User logout

### Watches
- `GET /data/watches` - Get all watches
- `POST /data/watches` - Create new watch
- `GET /data/watches/:id` - Get specific watch
- `PUT /data/watches/:id` - Update watch
- `DELETE /data/watches/:id` - Delete watch

### Likes
- `GET /data/likes` - Get all likes
- `POST /data/likes` - Like a watch
- `DELETE /data/likes/:id` - Unlike a watch

### Comments
- `GET /data/comments` - Get all comments
- `POST /data/comments` - Add comment
- `PUT` /data/comments/:id - Update comment
- `DELETE /data/comments/:id` - Delete comment

## 👨‍💻 Author

**Your Name**
- GitHub: [@victornedelchev](https://github.com/victornedelchev)

⭐ **Star this repository if you found it helpful!**
