# Quick Start Guide - Sample Credentials

## Login Credentials

### ADMIN
```
Email: admin@university.edu
Password: admin123
Role: Admin
```

### TEACHERS
```
Teacher 1:
Email: teacher1@university.edu
Password: teacher123

Teacher 2:
Email: teacher2@university.edu
Password: teacher123

Teacher 3:
Email: teacher3@university.edu
Password: teacher123
```

### STUDENTS
```
Student 1:
Email: student1@university.edu
Password: student123

Student 2:
Email: student2@university.edu
Password: student123

Student 3:
Email: student3@university.edu
Password: student123

Student 4:
Email: student4@university.edu
Password: student123
```

## Available Data

### Students (4)
- Ahmed Ali (STU001) - GPA: 3.8
- Fatima Khan (STU002) - GPA: 3.9
- Hassan Raza (STU003) - GPA: 3.6
- Ayaan Ahmed (STU004) - GPA: 3.7

### Teachers (3)
- Dr. Muhammad Hassan (TCH001) - Computer Science
- Prof. Ayesha Ahmed (TCH002) - Information Technology
- Dr. Ali Khan (TCH003) - Computer Science

### Courses (4)
- Programming Fundamentals (CS101)
- Data Structures (CS102)
- Web Development (IT102)
- Database Management (IT103)

### Classes (4)
- Class A (CS101) - Mon-Wed-Fri 9:00 AM
- Class B (IT102) - Tue-Thu 2:00 PM
- Class C (CS102) - Mon-Wed 11:00 AM
- Class D (IT103) - Tue-Thu 4:00 PM

### Sample Attendance Records (6)
- Multiple records for testing attendance tracking
- Mix of present and absent statuses

## System Features

1. **User Authentication**
   - Login with email, password, and role
   - Registration for new students/teachers

2. **Admin Dashboard**
   - Manage students, teachers, courses, and classes
   - View system statistics
   - Generate reports
   - Configure settings

3. **Teacher Dashboard**
   - View assigned classes
   - Take attendance
   - View attendance reports

4. **Student Dashboard**
   - View enrolled courses
   - Check personal attendance
   - View attendance reports

## Technical Details

- **Storage:** Browser localStorage
- **Data Format:** JSON
- **Initialization:** Automatic on first page load
- **No Backend Required:** All static data operations

## Reset Data

To reset to fresh sample data:
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Run: `localStorage.clear(); location.reload();`

## File Structure

```
attendance-management-system/
├── index.html                    (Login Page)
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── dashboard.css
│   └── js/
│       ├── auth.js              (Authentication with sample data)
│       ├── admin.js
│       ├── student.js
│       └── teacher.js
├── src/
│   ├── admin/dashboard.html
│   ├── student/dashboard.html
│   └── teacher/dashboard.html
├── data/
│   └── sampleData.json          (Master data file)
└── DATA_README.md               (Full documentation)
```

## Notes
- All usernames are emails
- All passwords are easy (change in production!)
- Data persists in browser until cache is cleared
- Use Incognito Mode to test fresh data state
