# Smart Waste Management System

A comprehensive web-based waste management solution built with **Spring Boot** and **Thymeleaf**, designed to streamline waste collection processes, manage pickup requests, handle complaints, and optimize recycling operations through an intuitive dashboard interface.

## 🌟 Features

- **User Management**: Multi-role authentication system (Admin, Citizen, Employee)
- **Pickup Request Management**: Citizens can request waste collection with quantity tracking
- **Complaint System**: Submit and track waste management complaints
- **Collection Scheduling**: Automated scheduling and route planning for waste collection
- **Recycling Centers**: Manage and locate recycling facilities
- **Waste Categories**: Classify different types of waste for proper handling
- **Dashboard Analytics**: Real-time statistics and comprehensive overview
- **Status Tracking**: Monitor progress of requests, complaints, and schedules

## 🛠️ Technologies Used

- **Backend**: Java with Spring Boot (60.7%)
  - Spring Boot Web
  - Spring Data JPA
  - Spring Security (Authentication)
  - Hibernate ORM
  - Bean Validation

- **Frontend**: HTML with Thymeleaf (39.3%)
  - Thymeleaf Template Engine
  - Bootstrap 4 CSS Framework
  - Responsive Web Design

- **Database**: JPA/Hibernate compatible (MySQL/PostgreSQL)

## 🚀 Getting Started

### Prerequisites

- **Java Development Kit (JDK)** 11 or higher
- **Maven** 3.6+
- **MySQL** or **PostgreSQL** database
- **IDE** (IntelliJ IDEA, Eclipse, or VS Code)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ziyadhussain23/Smart_Waste_Manangement_System.git
   cd Smart_Waste_Manangement_System
   ```

2. **Configure Database**
   Create a new database and update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/waste_management_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   ```

3. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:8080`
   - Sign up for a new account or login with existing credentials

## 📁 Project Structure

```
Smart_Waste_Manangement_System/
├── src/
│   ├── main/
│   │   ├── java/com/smart_waste_management_system/
│   │   │   ├── controller/           # Spring MVC Controllers
│   │   │   │   ├── ComplaintController.java
│   │   │   │   ├── PickupRequestController.java
│   │   │   │   ├── RecyclingCenterController.java
│   │   │   │   └── ...
│   │   │   ├── model/               # JPA Entity Classes
│   │   │   │   ├── User.java
│   │   │   │   ├── PickupRequest.java
│   │   │   │   ├── Complaint.java
│   │   │   │   ├── WasteCategory.java
│   │   │   │   └── ...
│   │   │   ├── repository/          # JPA Repositories
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ComplaintRepository.java
│   │   │   │   └── ...
│   │   │   ├── exception/           # Exception Handlers
│   │   │   └── SmartWasteManagementSystemApplication.java
│   │   └── resources/
│   │       ├── templates/           # Thymeleaf HTML Templates
│   │       │   ├── dashboard.html
│   │       │   ├── login.html
│   │       │   ├── signup.html
│   │       │   ├── complaint/
│   │       │   ├── request/
│   │       │   ├── schedule/
│   │       │   ├── center/
│   │       │   └── category/
│   │       └── application.properties
│   └── test/                        # Test Classes
├── target/                          # Compiled Classes
├── pom.xml                         # Maven Dependencies
└── README.md
```

## 🎯 Key Features & Usage

### 1. **User Roles**
- **Admin**: Full system access, manage all entities
- **Citizen**: Submit pickup requests and complaints
- **Employee**: Process requests and update schedules

### 2. **Pickup Request Management**
- Create new pickup requests with quantity specifications
- Select waste categories (Organic, Recyclable, Hazardous, etc.)
- Track request status (Requested → Collected)
- View all requests in organized lists

### 3. **Complaint System**
- Submit detailed complaints about waste management issues
- Track complaint status (Pending → Resolved)
- Admin/Employee resolution workflow

### 4. **Collection Scheduling**
- Create area-based collection schedules
- Date-wise planning and organization
- Status tracking (Scheduled → Completed)

### 5. **Recycling Centers**
- Manage recycling facility locations
- Contact information and details
- Easy access for citizens

## 🔧 API Endpoints & Controllers

| Controller | Base Path | Description |
|------------|-----------|-------------|
| **DashboardController** | `/dashboard` | Main dashboard and statistics |
| **ComplaintController** | `/complaints` | Complaint management |
| **PickupRequestController** | `/requests` | Pickup request handling |
| **RecyclingCenterController** | `/centers` | Recycling center management |
| **CollectionScheduleController** | `/schedules` | Collection scheduling |
| **WasteCategoryController** | `/categories` | Waste category management |

## 🗃️ Database Entities

- **User**: System users with role-based access
- **PickupRequest**: Waste collection requests
- **Complaint**: User complaints and issues
- **WasteCategory**: Classification of waste types
- **CollectionSchedule**: Scheduled collection activities
- **RecyclingCenter**: Recycling facility information

## 🔐 Authentication & Security

- **Form-based authentication** with username/password
- **Role-based access control** (RBAC)
- **Session management** for user security
- **Input validation** with Bean Validation

## 🧪 Testing

Run the test suite:
```bash
mvn test
```

## 🎨 Frontend Features

- **Responsive Design**: Bootstrap 4 for mobile-friendly interface
- **Form Validation**: Client and server-side validation
- **Dynamic Content**: Thymeleaf templating for dynamic pages
- **User-Friendly Navigation**: Intuitive dashboard and menu system

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## 🐛 Known Issues & Limitations

- Results may be incomplete due to search limitations
- For complete code exploration, visit: [GitHub Code Search](https://github.com/ziyadhussain23/Smart_Waste_Manangement_System/search?type=code)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ziyad Hussain**
- GitHub: [@ziyadhussain23](https://github.com/ziyadhussain23)

## 🏗️ Architecture

This application follows the **MVC (Model-View-Controller)** pattern:
- **Model**: JPA entities representing database tables
- **View**: Thymeleaf templates for user interface
- **Controller**: Spring Boot controllers handling HTTP requests

## 🌱 Environmental Impact

This system promotes environmental sustainability by:
- Optimizing waste collection routes
- Encouraging proper waste categorization
- Facilitating recycling through center management
- Reducing waste through efficient scheduling

---

*Last updated: May 30, 2025*
