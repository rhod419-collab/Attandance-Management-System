# Developer Cheat Sheet - Data Access & Management

## Quick Reference

### Import DataManager
```html
<script src="assets/js/dataManager.js"></script>
```

### Common Operations

#### GET Operations
```javascript
// Get collections
DataManager.getUsers()              // All users
DataManager.getStudents()           // All students
DataManager.getTeachers()           // All teachers
DataManager.getCourses()            // All courses
DataManager.getClasses()            // All classes
DataManager.getEnrollments()        // All enrollments
DataManager.getAttendance()         // All attendance records
DataManager.getSettings()           // System settings

// Get by ID
DataManager.getStudentById('STU001')
DataManager.getTeacherById('TCH001')
DataManager.getClassById('CL001')
DataManager.getCourseById('CS101')

// Get related data
DataManager.getClassesByTeacher('TCH001')      // Classes taught by teacher
DataManager.getClassesByCourse('CS101')        // All classes of a course
DataManager.getStudentsInClass('CL001')        // Students in a class
DataManager.getClassesByStudent('STU001')      // Classes student is enrolled in
DataManager.getAttendanceByStudent('STU001')   // Attendance records for student
DataManager.getAttendanceByClass('CL001')      // Attendance for class
DataManager.getAttendanceByDate('2025-01-15')  // Records for specific date

// Calculate
DataManager.getAttendancePercentage('STU001')  // Returns 0-100
DataManager.getStatistics()                     // Get summary stats
```

#### ADD Operations
```javascript
// Add new records
DataManager.addStudent({
    id: 'STU005',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '03001234567',
    department: 'Computer Science',
    enrollmentDate: '2025-01-20',
    gpa: 3.5
})

DataManager.addTeacher({
    id: 'TCH004',
    name: 'Dr. John Smith',
    email: 'john.smith@example.com',
    phone: '03211234567',
    department: 'Computer Science',
    qualification: 'PhD in CS',
    joiningDate: '2024-01-15'
})

DataManager.addCourse({
    id: 'CS201',
    name: 'Advanced Programming',
    code: 'CS201',
    credits: 3,
    department: 'Computer Science',
    description: 'Advanced programming concepts'
})

DataManager.addClass({
    id: 'CL005',
    name: 'Class E',
    course: 'CS101',
    courseCode: 'CS101',
    teacher: 'TCH001',
    teacherName: 'Dr. Muhammad Hassan',
    schedule: 'Mon-Wed 1:00 PM',
    room: 'Room 301',
    capacity: 30
})

DataManager.addAttendance({
    id: 'ATT007',
    studentId: 'STU001',
    classId: 'CL001',
    date: '2025-01-20',
    status: 'present',
    time: '09:05'
})
```

#### UPDATE Operations
```javascript
DataManager.updateStudent('STU001', {
    gpa: 3.9,
    phone: '03009999999'
})

DataManager.updateTeacher('TCH001', {
    department: 'Information Technology'
})

DataManager.updateSettings({
    academicYear: '2025-2026',
    semester: 'Fall'
})
```

#### DELETE Operations
```javascript
DataManager.deleteStudent('STU005')
DataManager.deleteTeacher('TCH004')
DataManager.deleteClass('CL005')
```

#### UTILITY Operations
```javascript
DataManager.exportData()              // Export all data as JSON
DataManager.clearAllData()            // Clear everything
DataManager.generateId('STU')         // Generate: STU1706123456789123
DataManager.getStatistics()           // Get counts of all collections
```

## Sample Data Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@university.edu | admin123 |
| Teacher 1 | teacher1@university.edu | teacher123 |
| Teacher 2 | teacher2@university.edu | teacher123 |
| Teacher 3 | teacher3@university.edu | teacher123 |
| Student 1 | student1@university.edu | student123 |
| Student 2 | student2@university.edu | student123 |
| Student 3 | student3@university.edu | student123 |
| Student 4 | student4@university.edu | student123 |

## Data Models

### Student
```javascript
{
    id: "STU001",
    name: "Ahmed Ali",
    email: "student1@university.edu",
    phone: "03001234567",
    department: "Computer Science",
    enrollmentDate: "2023-01-15",
    gpa: 3.8
}
```

### Teacher
```javascript
{
    id: "TCH001",
    name: "Dr. Muhammad Hassan",
    email: "teacher1@university.edu",
    phone: "03211234567",
    department: "Computer Science",
    qualification: "PhD in Computer Science",
    joiningDate: "2020-01-10"
}
```

### Course
```javascript
{
    id: "CS101",
    name: "Programming Fundamentals",
    code: "CS101",
    credits: 3,
    department: "Computer Science",
    description: "Introduction to programming concepts"
}
```

### Class
```javascript
{
    id: "CL001",
    name: "Class A",
    course: "CS101",
    courseCode: "CS101",
    teacher: "TCH001",
    teacherName: "Dr. Muhammad Hassan",
    schedule: "Mon-Wed-Fri 9:00 AM",
    room: "Room 101",
    capacity: 30
}
```

### Enrollment
```javascript
{
    id: "ENR001",
    studentId: "STU001",
    classId: "CL001",
    enrollmentDate: "2025-01-10",
    status: "active"
}
```

### Attendance
```javascript
{
    id: "ATT001",
    studentId: "STU001",
    classId: "CL001",
    date: "2025-01-15",
    status: "present",     // or "absent"
    time: "09:05"
}
```

### Settings
```javascript
{
    schoolName: "University of Excellence",
    schoolCode: "UOE001",
    academicYear: "2024-2025",
    semester: "Spring",
    attendanceThreshold: 75,
    sessionStartTime: "09:00",
    sessionEndTime: "17:00"
}
```

## Common Patterns

### Display list of students
```javascript
const students = DataManager.getStudents();
students.forEach(student => {
    console.log(`${student.id}: ${student.name} - ${student.email}`);
});
```

### Find students in a department
```javascript
const csStudents = DataManager.getStudents()
    .filter(s => s.department === 'Computer Science');
```

### Get attendance summary for a class
```javascript
const classAttendance = DataManager.getAttendanceByClass('CL001');
const presentCount = classAttendance.filter(a => a.status === 'present').length;
console.log(`Present: ${presentCount} out of ${classAttendance.length}`);
```

### Check if student is enrolled in class
```javascript
const classes = DataManager.getClassesByStudent('STU001');
const enrolledInCS101 = classes.some(c => c.course === 'CS101');
```

### Get teacher's class schedule
```javascript
const teacherClasses = DataManager.getClassesByTeacher('TCH001');
teacherClasses.forEach(cls => {
    console.log(`${cls.name}: ${cls.schedule} in ${cls.room}`);
});
```

### Calculate class attendance rate
```javascript
function getClassAttendanceRate(classId) {
    const attendance = DataManager.getAttendanceByClass(classId);
    if (attendance.length === 0) return 0;
    
    const dates = [...new Set(attendance.map(a => a.date))];
    const totalExpected = DataManager.getStudentsInClass(classId).length * dates.length;
    const totalPresent = attendance.filter(a => a.status === 'present').length;
    
    return Math.round((totalPresent / totalExpected) * 100);
}
```

### Add student and enroll in class
```javascript
const newStudent = DataManager.addStudent({
    id: 'STU005',
    name: 'New Student',
    email: 'new@example.com',
    phone: '03001234567',
    department: 'IT',
    enrollmentDate: new Date().toISOString().split('T')[0],
    gpa: 0
});

const enrollment = DataManager.getEnrollments();
enrollment.push({
    id: DataManager.generateId('ENR'),
    studentId: newStudent.id,
    classId: 'CL001',
    enrollmentDate: new Date().toISOString().split('T')[0],
    status: 'active'
});
```

## Debugging Tips

### Check all stored keys
```javascript
Object.keys(localStorage)
```

### View all data in console
```javascript
console.table(DataManager.getStudents())
console.table(DataManager.getTeachers())
console.table(DataManager.getClasses())
```

### Debug student attendance
```javascript
const studentId = 'STU001';
console.log(DataManager.getAttendanceByStudent(studentId));
console.log(`Attendance %: ${DataManager.getAttendancePercentage(studentId)}%`);
```

### Check data consistency
```javascript
const stats = DataManager.getStatistics();
console.table(stats);
```

### Reset to fresh data
```javascript
localStorage.clear();
location.reload();
```

## localStorage Structure
```
localStorage {
  registeredUsers: "[{...}, {...}]",
  students: "[{...}, {...}]",
  teachers: "[{...}, {...}]",
  courses: "[{...}, {...}]",
  classes: "[{...}, {...}]",
  enrollments: "[{...}, {...}]",
  attendance: "[{...}, {...}]",
  settings: "{...}",
  sampleDataInitialized: "true"
}
```

## Performance Tips

1. Cache frequently used data:
```javascript
const students = DataManager.getStudents();
```

2. Use filtering for large datasets:
```javascript
const csStudents = students.filter(s => s.department === 'CS');
```

3. Avoid redundant calls:
```javascript
// ❌ Bad
for (let i = 0; i < 100; i++) {
    DataManager.getStudents();
}

// ✅ Good
const students = DataManager.getStudents();
for (let i = 0; i < 100; i++) {
    // Use students variable
}
```

---

**Ready to code!** Use these snippets and patterns to quickly build features.
