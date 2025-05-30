# 🔐 Secure Note Taking Application

A full-stack secure note-taking application featuring **JWT authentication**, **role-based access control**, and an intuitive **React frontend**. Built with Spring Boot backend and modern web technologies to provide a safe and efficient way to organize and manage personal notes.

## 🌟 Features

### 🔒 Security Features
- **JWT Authentication**: Secure token-based authentication system
- **Role-Based Access Control**: Multi-level user permissions (ADMIN, EDITOR, VIEWER)
- **Secure Session Management**: HTTP-only cookies with CSRF protection
- **Password Encryption**: BCrypt hashing for secure password storage
- **Protected Routes**: Frontend and backend route protection

### 📁 Note Organization
- **Folder Management**: Organize notes in custom folders
- **Hierarchical Structure**: Nested folder organization
- **Search & Filter**: Advanced note discovery capabilities
- **Pagination**: Efficient handling of large note collections
- **Sorting Options**: Customizable sorting by title, date, etc.

### ✏️ Note Management
- **Rich Text Support**: Create and edit formatted notes
- **Real-time Updates**: Live note editing and saving
- **Version Control**: Track note modifications with timestamps
- **Bulk Operations**: Multiple note selection and actions
- **Note Templates**: Pre-defined note structures

### 🎨 User Experience
- **Modern UI**: Clean, responsive React interface
- **Dark Theme**: Eye-friendly dark mode design
- **Mobile Responsive**: Optimized for all device sizes
- **Toast Notifications**: Real-time user feedback
- **Smooth Animations**: Enhanced user interactions

## 🛠️ Technology Stack

### Backend (Java - 47%)
- **Spring Boot** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **JWT (JSON Web Tokens)** - Secure authentication
- **Hibernate** - ORM mapping
- **MySQL/PostgreSQL** - Database storage
- **Bean Validation** - Input validation
- **Lombok** - Code generation

### Frontend (JavaScript - 42.5%)
- **React** - Component-based UI library
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API calls
- **React Context** - State management
- **React Toastify** - Notification system
- **JS Cookie** - Cookie management

### Styling (CSS - 9.1%, HTML - 1.4%)
- **Styled Components** - Modern CSS-in-JS
- **Responsive Design** - Mobile-first approach
- **Custom Themes** - Configurable design system
- **Bootstrap Integration** - Component styling

## 🚀 Getting Started

### Prerequisites

**Backend Requirements:**
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+ or PostgreSQL 12+

**Frontend Requirements:**
- Node.js 16+ and npm 8+
- Modern web browser

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ziyadhussain23/Secure-Note-Taking-Application.git
   cd Secure-Note-Taking-Application
   ```

2. **Configure Database**
   ```properties
   # src/main/resources/application.properties
   spring.datasource.url=jdbc:mysql://localhost:3306/secure_notes_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   
   # JWT Configuration
   app.jwtSecret=mySecretKey
   app.jwtExpirationMs=86400000
   ```

3. **Build and Run Backend**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   Backend will run on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd secure-note-taking-application-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   # Create .env file
   REACT_APP_API_URL=http://localhost:8080/note
   ```

4. **Start Frontend**
   ```bash
   npm start
   ```

   Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
Secure-Note-Taking-Application/
├── src/main/java/com/ziyad/securenotetakingapplication/
│   ├── config/                     # Configuration classes
│   │   ├── AppRole.java           # User roles enum
│   │   ├── AppConstants.java      # Application constants
│   │   └── SecurityConfig.java    # Spring Security configuration
│   ├── controller/                # REST API Controllers
│   │   ├── AuthController.java    # Authentication endpoints
│   │   ├── NoteController.java    # Note management endpoints
│   │   └── FolderController.java  # Folder management endpoints
│   ├── model/                     # JPA Entity classes
│   │   ├── User.java             # User entity
│   │   ├── Note.java             # Note entity
│   │   ├── Folder.java           # Folder entity
│   │   └── Role.java             # Role entity
│   ├── repository/               # JPA Repositories
│   │   ├── UserRepository.java   
│   │   ├── NoteRepository.java   
│   │   ├── FolderRepository.java 
│   │   └── RoleRepository.java   
│   ├── service/                  # Business logic layer
│   │   ├── NoteService.java      
│   │   ├── FolderService.java    
│   │   └── UserService.java      
│   ├── security/                 # Security components
│   │   ├── jwt/                  # JWT utilities
│   │   ├── services/             # Security services
│   │   ├── request/              # Request DTOs
│   │   └── response/             # Response DTOs
│   ├── payload/                  # Data Transfer Objects
│   │   ├── NoteDTO.java          
│   │   ├── FolderDTO.java        
│   │   └── UserDTO.java          
│   └── exceptions/               # Custom exceptions
│
├── secure-note-taking-application-frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── Auth/            # Authentication components
│   │   │   ├── Folder/          # Folder management components
│   │   │   ├── Note/            # Note management components
│   │   │   ├── Navigation/      # Navigation components
│   │   │   └── Routes/          # Route configuration
│   │   ├── context/             # React Context providers
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── services/            # API service functions
│   │   │   ├── authService.js   # Authentication API calls
│   │   │   ├── noteService.js   # Note API calls
│   │   │   └── folderService.js # Folder API calls
│   │   ├── styles/              # Styling and themes
│   │   │   ├── GlobalStyles.js  # Global CSS styles
│   │   │   └── theme.js         # Theme configuration
│   │   └── App.js               # Main application component
│   ├── public/                  # Static assets
│   └── package.json             # Dependencies and scripts
│
├── pom.xml                      # Maven configuration
└── README.md
```

## 🔧 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/note/auth/login` | User login | Public |
| POST | `/note/auth/signup` | User registration | Public |
| POST | `/note/auth/logout` | User logout | Authenticated |

### Folder Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/note/folder/get` | Get all folders (paginated) | Authenticated |
| GET | `/note/folder/{folderId}` | Get specific folder | Authenticated |
| POST | `/note/folder/create` | Create new folder | Authenticated |
| PUT | `/note/folder/update/{folderId}` | Update folder | Authenticated |
| DELETE | `/note/folder/delete/{folderId}` | Delete folder | Authenticated |

### Note Management
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/note/{folderId}/notes` | Get notes in folder (paginated) | Authenticated |
| GET | `/note/note/{noteId}` | Get specific note | Authenticated |
| POST | `/note/{folderId}/note/create` | Create note in folder | Authenticated |
| PUT | `/note/{folderId}/note/update/{noteId}` | Update note | Authenticated |
| DELETE | `/note/{folderId}/note/delete/{noteId}` | Delete note | Authenticated |

## 🗃️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Folders Table
```sql
CREATE TABLE folders (
    folder_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    folder_name VARCHAR(100) NOT NULL,
    user_id BIGINT NOT NULL,
    folder_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    folder_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    UNIQUE KEY unique_folder_per_user (folder_name, user_id)
);
```

### Notes Table
```sql
CREATE TABLE notes (
    note_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    note_title VARCHAR(200) NOT NULL,
    note_content MEDIUMTEXT NOT NULL,
    folder_id BIGINT NOT NULL,
    note_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    note_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE,
    UNIQUE KEY unique_note_per_folder (note_title, folder_id)
);
```

## 🔐 Security Features

### JWT Implementation
- **Token Generation**: Secure JWT tokens with expiration
- **Cookie Storage**: HTTP-only cookies for XSS protection
- **Refresh Mechanism**: Automatic token refresh handling
- **Blacklist Support**: Token invalidation on logout

### Role-Based Access Control
```java
public enum AppRole {
    ROLE_ADMIN,    // Full system access
    ROLE_EDITOR,   // Create, edit, delete notes
    ROLE_VIEWER    // Read-only access
}
```

### Security Headers
- CSRF Protection
- XSS Prevention
- Content Security Policy
- Secure Cookie Configuration

## 🎨 Frontend Features

### Styled Components Theme
```javascript
export const theme = {
    colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        accent: 'rgba(0, 255, 255, 0.05)',
        background: 'rgba(30, 41, 59, 0.95)'
    },
    // ... more theme configuration
};
```

### Authentication Context
```javascript
const AuthContext = createContext({
    isAuthenticated: false,
    login: async () => {},
    logout: async () => {}
});
```

## 🧪 Testing

### Backend Testing
```bash
mvn test
```

### Frontend Testing
```bash
cd secure-note-taking-application-frontend
npm test
```

## 📱 Mobile Responsiveness

- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Touch-Friendly**: Mobile-optimized interactions
- **Progressive Web App**: PWA capabilities for mobile installation

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues & Limitations

- Search results may be incomplete due to API limitations
- For complete code exploration: [View on GitHub](https://github.com/ziyadhussain23/Secure-Note-Taking-Application/search?type=code)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ziyad Hussain**
- GitHub: [@ziyadhussain23](https://github.com/ziyadhussain23)
- Project Link: [Secure Note Taking Application](https://github.com/ziyadhussain23/Secure-Note-Taking-Application)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React community for the amazing ecosystem
- JWT.io for token specification
- All contributors who helped improve this project

## 🚀 Deployment

### Backend Deployment
```bash
# Build production JAR
mvn clean package -DskipTests

# Run production build
java -jar target/secure-note-taking-application-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Serve static files
npx serve -s build
```

## ⚡ Performance Optimizations

- **Pagination**: Efficient data loading for large datasets
- **Lazy Loading**: Components loaded on demand
- **Database Indexing**: Optimized queries for better performance
- **Caching**: Strategic caching implementation
- **Bundle Optimization**: Minimized JavaScript bundles

---

*Last updated: May 30, 2025*

**Note**: This application demonstrates modern full-stack development practices with emphasis on security, user experience, and maintainable code architecture.
