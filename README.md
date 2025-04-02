# Secure Note Taking Application

This repository serves as the backend for the Secure Note Taking Application, while the frontend is located in the subdirectory `secure-note-taking-application-frontend`. Follow this guide to set up, run, and understand both parts of the project.

----

## Backend Overview

The backend is built with Java and Spring Boot to provide a robust and secure API for managing user data and notes. It handles user authentication, note management (create, read, update, and delete), and ensures that all data is securely stored and transmitted.

### Key Features

1. **User Management**  
   - Registration, login, and session handling.  
   - Secure password storage and user validation.

2. **Note Management**  
   - CRUD operations for notes.  
   - Handling note content securely for confidentiality.

3. **Security and Encryption**  
   - Uses JWT (JSON Web Tokens) for stateless authentication.  
   - Encrypts sensitive note data both in transit and at rest.

4. **Data Persistence**  
   - Uses Hibernate for Object-Relational Mapping (ORM) with a relational database (e.g., MySQL or PostgreSQL).  
   - Database configurations are managed via Spring Boot’s application properties.

### Technologies Used

- **Java**: Main programming language.
- **Spring Boot**: For building production-grade applications.
- **Spring Security**: To secure endpoints and manage authentication.
- **JWT (JSON Web Token)**: For stateless authentication.
- **Hibernate**: For ORM and database interactions.
- **Maven**: For project build and dependency management.

### Setup and Running the Backend

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/ziyadhussain23/Secure-Note-Taking-Application.git
   ```

2. **Configuration**  
   Update the `application.properties` (or `application.yml`) file with your database configuration and any other required properties.

3. **Build the Project**  
   Navigate to the root directory of the project and run:
   ```bash
   mvn clean install
   ```

4. **Run the Backend Application**  
   Start the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will be available at [http://localhost:8080](http://localhost:8080).

5. **Testing**  
   - **Unit Tests**  
     Run unit tests with:
     ```bash
     mvn test
     ```
   - **Integration Tests**  
     Use the provided test suite to verify that API endpoints work as expected.

### API Endpoints

- **Authentication**:  
  Endpoints under `/api/auth/**` handle user login, registration, and token refresh.

- **Notes**:  
  Endpoints under `/api/notes/**` allow for creating, reading, updating, and deleting notes.

- **Users**:  
  Endpoints under `/api/users/**` manage user profiles and related functionalities.

----

## Frontend Overview

The frontend is built with React using Create React App and is located in the `secure-note-taking-application-frontend` subdirectory. This interface interacts with the backend API to manage secure note taking.

### Prerequisites

- Node.js and npm must be installed.

### Setup

1. **Navigate to the Frontend Directory**  
   Change into the frontend directory:
   ```bash
   cd secure-note-taking-application-frontend
   ```

2. **Install Dependencies**  
   Install the required packages by running:
   ```bash
   npm install
   ```

### Running the Frontend

1. **Start the Development Server**  
   Launch the frontend with:
   ```bash
   npm start
   ```
   This will open the app in your default browser at [http://localhost:3000](http://localhost:3000).

2. **Development Mode**  
   The application will automatically reload when file changes are detected, and any lint errors will be displayed in the console.

### Testing and Building

- **Running Tests**  
  To run the test suite in interactive watch mode:
  ```bash
  npm test
  ```

- **Building for Production**  
  When you're ready to deploy the frontend:
  ```bash
  npm run build
  ```
  The optimized production build will be generated in the `build` folder.

### Additional Information

- **Documentation**  
  For more details on using Create React App, refer to the [official documentation](https://facebook.github.io/create-react-app/docs/getting-started).

- **Deployment**  
  Additional deployment instructions can be found in the Create React App documentation.

----

This unified README provides an end-to-end guide covering the backend functionality and the frontend setup located within the repository. Follow these instructions to set up and run the Secure Note Taking Application successfully.
