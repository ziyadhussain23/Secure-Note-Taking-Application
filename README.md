# Secure Note Taking Application

This document serves as the complete guide for both the backend and frontend components of the Secure Note Taking Application. Follow the sections below to understand how each part works and how to get the application up and running.

----

## Backend

### Overview

The backend is built with Java and Spring Boot to provide a robust and secure API for managing user data and notes. It handles user authentication, note management (create, read, update, and delete), and ensures that all data is securely stored and transmitted.

### Key Features

1. **User Management**  
   - Registration, login, and session handling.  
   - Secure password storage and user validation.

2. **Note Management**  
   - CRUD operations for notes.  
   - Secure handling of note content to ensure confidentiality.

3. **Security and Encryption**  
   - Uses JWT (JSON Web Tokens) for stateless authentication.  
   - Encrypts sensitive note content both in transit and at rest.

4. **Data Persistence**  
   - Uses Hibernate for Object-Relational Mapping (ORM) with a relational database (e.g., MySQL or PostgreSQL).  
   - Database configurations are managed through Spring Boot’s application properties.

### Technologies Used

- **Java**: Main programming language.
- **Spring Boot**: For creating production-grade Spring applications.
- **Spring Security**: To handle authentication and secure endpoints.
- **JWT (JSON Web Token)**: For secure and stateless authentication.
- **Hibernate**: For ORM and database interactions.
- **Maven**: For project build and dependency management.

### Setup and Running

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/ziyadhussain23/Secure-Note-Taking-Application.git
   ```

2. **Navigate to the Backend Directory**  
   ```bash
   cd secure-note-taking-application-backend
   ```

3. **Configuration**  
   Update the `application.properties` (or `application.yml`) file with your database configuration and any other required properties.

4. **Build the Project**  
   ```bash
   mvn clean install
   ```

5. **Run the Application**  
   ```bash
   mvn spring-boot:run
   ```
   The backend server will be available at [http://localhost:8080](http://localhost:8080).

### Testing

- **Unit Tests**:  
  Run unit tests with:
  ```bash
  mvn test
  ```
- **Integration Tests**:  
  Verify that API endpoints are working as expected.

### API Endpoints

- **Authentication**:  
  Endpoints under `/api/auth/**` handle user login, registration, and token refresh.

- **Notes**:  
  Endpoints under `/api/notes/**` provide operations for creating, reading, updating, and deleting notes.

- **Users**:  
  Endpoints under `/api/users/**` manage user profiles and related functionalities.

----

## Frontend

### Overview

The frontend is built with React using Create React App. It provides a responsive and dynamic user interface that interacts with the backend API to manage secure note taking.

### Prerequisites

- Node.js and npm must be installed on your machine.

### Setup

1. **Clone the Repository**  
   If you haven't already cloned the repository:
   ```bash
   git clone https://github.com/ziyadhussain23/Secure-Note-Taking-Application.git
   ```

2. **Navigate to the Frontend Directory**  
   ```bash
   cd secure-note-taking-application-frontend
   ```

3. **Install Dependencies**  
   ```bash
   npm install
   ```

### Running the Application

1. **Start the Development Server**  
   ```bash
   npm start
   ```
   This command launches the development server and opens the app in your default browser at [http://localhost:3000](http://localhost:3000).

2. **Development Mode**  
   The app will automatically reload when changes are made and display lint errors in the browser console.

### Testing and Building

- **Running Tests**  
  To start the interactive test runner:
  ```bash
  npm test
  ```

- **Building for Production**  
  When you're ready to deploy the app:
  ```bash
  npm run build
  ```
  The optimized production build is output to the `build` folder.

### Additional Information

- **Documentation**  
  For more details, refer to the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

- **Deployment**  
  Deployment instructions are provided in the Create React App documentation.

----

This README provides a unified guide for setting up both the backend and frontend components. Follow the instructions sequentially to deploy the complete Secure Note Taking Application.
