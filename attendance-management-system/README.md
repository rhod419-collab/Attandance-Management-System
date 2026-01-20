# University Attendance Management System

## Project Overview
A comprehensive web-based attendance management system for universities with separate modules for administrators, teachers, and students.

## 📋 Main Modules

### 👨‍💼 Admin Module
- **Manage Students**: Add, edit, delete, and view all students
- **Manage Teachers**: Add, edit, delete, and view all teachers
- **Create Courses**: Manage courses and curriculum
- **Create Classes**: Set up classes and assign teachers
- **View Attendance Reports**: Generate comprehensive attendance reports for all classes and students

### 👩‍🏫 Teacher Module
- **Mark Attendance**: Daily attendance marking for classes
- **View Class Attendance**: Check attendance records for specific classes
- **Generate Reports**: Create detailed attendance reports for individual classes and students

### 🎓 Student Module
- **View Personal Attendance**: Check individual attendance records
- **Check Subject-wise Reports**: View attendance breakdown by subject
- **Profile Management**: View and manage personal information

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: Dynamic functionality and interactivity

### Backend (Ready for Implementation)
- **PHP/Node.js**: Server-side processing
- **MySQL**: Relational database management

### Database
- **MySQL**: Complete schema with proper relationships and indexing

## 🧾 Key Features

### Security
- Secure login system with role-based authentication
- Password-protected access for all modules
- Session management with automatic logout

### Attendance Management
- Daily attendance marking with multiple status options (Present, Absent, Leave)
- Automatic percentage calculation
- Date-wise attendance tracking
- Bulk attendance operations

### Reporting
- Student-wise attendance reports
- Class-wise attendance reports
- Subject-wise attendance breakdown
- Monthly and yearly attendance analysis
- Export ready report format

### User Management
- Role-based access control (Admin, Teacher, Student)
- User profile management
- Email verification
- Password reset functionality

### Dashboard Features
- Real-time statistics and overview
- Quick access to common actions
- Visual representation of data
- Responsive design for all devices

## 📁 Project Structure

```
attendance-management-system/
├── index.html                    # Login page
├── assets/
│   ├── css/
│   │   ├── style.css            # Login page styles
│   │   └── dashboard.css        # Dashboard styles
│   └── js/
│       ├── auth.js              # Authentication logic
│       ├── admin.js             # Admin dashboard functionality
│       ├── teacher.js           # Teacher dashboard functionality
│       └── student.js           # Student dashboard functionality
├── src/
│   ├── admin/
│   │   └── dashboard.html       # Admin dashboard
│   ├── teacher/
│   │   └── dashboard.html       # Teacher dashboard
│   └── student/
│       └── dashboard.html       # Student dashboard
├── db/
│   └── database_schema.sql      # MySQL database schema
├── public/                       # Static files (images, documents)
└── README.md                     # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- MySQL 5.7 or higher
- PHP 7.4+ or Node.js 12+ (for backend)
- Web server (Apache, Nginx)

### Installation Steps

1. **Clone/Download the project**
   ```bash
   cd attendance-management-system
   ```

2. **Set up the database**
   - Import the database schema from `db/database_schema.sql`
   - Create a new database in MySQL
   - Run the SQL script to create all tables

3. **Configure the backend** (when implementing backend)
   - Create a config file with database credentials
   - Set up the server-side API endpoints

4. **Open the application**
   - Open `index.html` in your web browser
   - Or deploy to your web server

### Default Credentials (Demo Mode)

**Admin Login**
- Email: 
- Password: admin123
- Role: Admin

**Teacher Login**
- Email: teacher1@university.edu
- Password: teacher123
- Role: Teacher

**Student Login**
- Email: student1@university.edu
- Password: student123
- Role: Student

> Note: In demo mode, data is stored in browser's localStorage

## 📊 Database Schema

### Tables
- **users**: User authentication and role management
- **students**: Student information and profiles
- **teachers**: Teacher information and details
- **courses**: Course catalog and details
- **classes**: Class schedules and information
- **class_enrollments**: Student enrollment tracking
- **attendance**: Daily attendance records
- **attendance_summary**: Aggregated attendance data
- **admins**: Administrator accounts
- **reports**: Generated reports

## 🎯 Usage Guide

### For Admins
1. Login with admin credentials
2. Navigate to Dashboard for overview
3. Use "Manage Students" to add/edit students
4. Use "Manage Teachers" to manage faculty
5. Create courses and classes
6. Generate attendance reports

### For Teachers
1. Login with teacher credentials
2. Select class from dropdown
3. Choose date for attendance
4. Mark attendance (Present/Absent/Leave)
5. Submit attendance records
6. Generate class-wise reports

### For Students
1. Login with student credentials
2. View personal attendance in "My Attendance"
3. Check subject-wise reports
4. Download attendance certificate
5. Manage profile information

## 🔒 Security Features

- Password hashing and encryption
- SQL injection prevention
- XSS (Cross-Site Scripting) protection
- CSRF (Cross-Site Request Forgery) tokens
- Role-based access control
- Session timeout and management

## 📈 Performance Optimization

- Database indexing on frequently queried columns
- Attendance summary table for faster reporting
- Frontend caching strategies
- Lazy loading of data
- Optimized database queries

## 🐛 Known Issues & Limitations

### Current Demo Mode Limitations
- Data is stored in browser localStorage (not persistent)
- Backend API not yet implemented
- Real email notifications not configured
- Export features in development

### Future Improvements
- Mobile app development
- SMS notifications for attendance
- Integration with student information system
- Advanced analytics and dashboards
- Multi-language support
- Biometric attendance integration

## 🤝 Contributing

To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open-source and available for educational purposes.

## 📧 Contact & Support

For support or queries:
- Email: support@university.edu
- Website: www.university.edu
- Help Portal: help.university.edu

## 🎓 Acknowledgments

This system was developed to streamline attendance management in educational institutions. Special thanks to all contributors and testers.

## 📚 Additional Resources

- [HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Last Updated**: January 2024
**Version**: 1.0.0
**Status**: Active Development
