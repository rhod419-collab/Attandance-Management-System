# Attendance Management System - Sample Data Documentation

## Overview
This system now includes comprehensive static JSON data that is automatically initialized in the browser's localStorage on first load. This allows you to test and use the system without a backend database.

## Sample Data Included

### 1. Users (8 Users)
#### Admin
- **Email:** admin@university.edu
- **Password:** admin123
- **Role:** Admin

#### Teachers (3 Teachers)
1. **Dr. Muhammad Hassan**
   - Email: teacher1@university.edu
   - Password: teacher123
   - Department: Computer Science
   - ID: TCH001

2. **Prof. Ayesha Ahmed**
   - Email: teacher2@university.edu
   - Password: teacher123
   - Department: Information Technology
   - ID: TCH002

3. **Dr. Ali Khan**
   - Email: teacher3@university.edu
   - Password: teacher123
   - Department: Computer Science
   - ID: TCH003

#### Students (4 Students)
1. **Ahmed Ali**
   - Email: student1@university.edu
   - Password: student123
   - Department: Computer Science
   - ID: STU001
   - GPA: 3.8

2. **Fatima Khan**
   - Email: student2@university.edu
   - Password: student123
   - Department: Computer Science
   - ID: STU002
   - GPA: 3.9

3. **Hassan Raza**
   - Email: student3@university.edu
   - Password: student123
   - Department: Information Technology
   - ID: STU003
   - GPA: 3.6

4. **Ayaan Ahmed**
   - Email: student4@university.edu
   - Password: student123
   - Department: Information Technology
   - ID: STU004
   - GPA: 3.7

### 2. Students Data (4 Records)
- Complete student information with enrollment dates and GPAs
- All students from Computer Science and Information Technology departments

### 3. Teachers Data (3 Records)
- Teacher information with qualifications and joining dates
- Departments: Computer Science and Information Technology

### 4. Courses (4 Courses)
1. **Programming Fundamentals** (CS101)
   - Credits: 3
   - Department: Computer Science

2. **Data Structures** (CS102)
   - Credits: 3
   - Department: Computer Science

3. **Web Development** (IT102)
   - Credits: 3
   - Department: Information Technology

4. **Database Management** (IT103)
   - Credits: 3
   - Department: Information Technology

### 5. Classes (4 Classes)
- Class A: CS101, Mon-Wed-Fri 9:00 AM, Room 101
- Class B: IT102, Tue-Thu 2:00 PM, Room 202
- Class C: CS102, Mon-Wed 11:00 AM, Room 105
- Class D: IT103, Tue-Thu 4:00 PM, Room 203

### 6. Enrollments (6 Enrollment Records)
- Links students to their classes
- All enrollments are active

### 7. Attendance Records (6 Records)
- Sample attendance data with dates and times
- Mix of present and absent statuses

### 8. Settings
- School Name: University of Excellence
- Academic Year: 2024-2025
- Semester: Spring
- Attendance Threshold: 75%
- Session Time: 09:00 to 17:00

## How to Use

### First Time Setup
1. Open the application in your browser
2. The system will automatically initialize all sample data in localStorage
3. A flag `sampleDataInitialized` will be set to prevent re-initialization

### Login
1. Go to the login page (index.html)
2. Select a role (Admin, Teacher, or Student)
3. Use any of the credentials above
4. Click Login

### Access Data from JavaScript
All data is stored in localStorage with the following keys:
```javascript
// Get users
const users = JSON.parse(localStorage.getItem('registeredUsers'));

// Get students
const students = JSON.parse(localStorage.getItem('students'));

// Get teachers
const teachers = JSON.parse(localStorage.getItem('teachers'));

// Get courses
const courses = JSON.parse(localStorage.getItem('courses'));

// Get classes
const classes = JSON.parse(localStorage.getItem('classes'));

// Get enrollments
const enrollments = JSON.parse(localStorage.getItem('enrollments'));

// Get attendance
const attendance = JSON.parse(localStorage.getItem('attendance'));

// Get settings
const settings = JSON.parse(localStorage.getItem('settings'));
```

## Data File Location
The master JSON data file is located at:
```
attendance-management-system/data/sampleData.json
```

## Adding New Data

To add new data:

1. **Via Registration Form:**
   - Use the registration modal on the login page
   - New users will be added to localStorage

2. **Via Admin Dashboard:**
   - After logging in as admin, use the dashboard forms to add:
     - Students
     - Teachers
     - Courses
     - Classes

3. **Via JavaScript Console:**
   ```javascript
   // Get current data
   const students = JSON.parse(localStorage.getItem('students'));
   
   // Add new student
   students.push({
       id: 'STU005',
       name: 'New Student',
       email: 'newstudent@university.edu',
       phone: '03001234567',
       department: 'Computer Science',
       enrollmentDate: '2025-01-20',
       gpa: 3.5
   });
   
   // Save back to localStorage
   localStorage.setItem('students', JSON.stringify(students));
   ```

## Clear All Data
To reset the system and reinitialize sample data:
```javascript
localStorage.clear();
location.reload();
```

## Test Scenarios

### As Admin
- View all students, teachers, courses, and classes
- Add/Edit/Delete records
- Generate reports
- Configure system settings

### As Teacher
- View assigned classes and students
- Take attendance
- View attendance reports

### As Student
- View enrolled courses
- Check attendance records
- View personal attendance percentage

## Notes
- All data is stored locally in the browser (localStorage)
- Data will persist until the browser cache is cleared
- Using private/incognito mode will reset data on browser close
- For production use, integrate with a backend database
