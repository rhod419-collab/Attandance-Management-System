// Authentication Script

// Initialize sample data on first load
function initializeSampleData() {
    if (!localStorage.getItem('sampleDataInitialized')) {
        const sampleData = {
            "registeredUsers": [
                {
                    "id": "USR001",
                    "fullName": "Admin User",
                    "email": "admin@university.edu",
                    "password": "admin123",
                    "role": "admin"
                },
                {
                    "id": "USR002",
                    "fullName": "Ahmed Ali",
                    "email": "student1@university.edu",
                    "password": "student123",
                    "role": "student",
                    "studentId": "STU001",
                    "department": "Computer Science"
                },
                {
                    "id": "USR003",
                    "fullName": "Fatima Khan",
                    "email": "student2@university.edu",
                    "password": "student123",
                    "role": "student",
                    "studentId": "STU002",
                    "department": "Computer Science"
                },
                {
                    "id": "USR004",
                    "fullName": "Hassan Raza",
                    "email": "student3@university.edu",
                    "password": "student123",
                    "role": "student",
                    "studentId": "STU003",
                    "department": "Information Technology"
                },
                {
                    "id": "USR005",
                    "fullName": "Ayaan Ahmed",
                    "email": "student4@university.edu",
                    "password": "student123",
                    "role": "student",
                    "studentId": "STU004",
                    "department": "Information Technology"
                },
                {
                    "id": "USR006",
                    "fullName": "Dr. Muhammad Hassan",
                    "email": "teacher1@university.edu",
                    "password": "teacher123",
                    "role": "teacher",
                    "teacherId": "TCH001",
                    "department": "Computer Science"
                },
                {
                    "id": "USR007",
                    "fullName": "Prof. Ayesha Ahmed",
                    "email": "teacher2@university.edu",
                    "password": "teacher123",
                    "role": "teacher",
                    "teacherId": "TCH002",
                    "department": "Information Technology"
                },
                {
                    "id": "USR008",
                    "fullName": "Dr. Ali Khan",
                    "email": "teacher3@university.edu",
                    "password": "teacher123",
                    "role": "teacher",
                    "teacherId": "TCH003",
                    "department": "Computer Science"
                }
            ],
            "students": [
                {
                    "id": "STU001",
                    "name": "Ahmed Ali",
                    "email": "student1@university.edu",
                    "phone": "03001234567",
                    "department": "Computer Science",
                    "enrollmentDate": "2023-01-15",
                    "gpa": 3.8
                },
                {
                    "id": "STU002",
                    "name": "Fatima Khan",
                    "email": "student2@university.edu",
                    "phone": "03009876543",
                    "department": "Computer Science",
                    "enrollmentDate": "2023-01-15",
                    "gpa": 3.9
                },
                {
                    "id": "STU003",
                    "name": "Hassan Raza",
                    "email": "student3@university.edu",
                    "phone": "03005551234",
                    "department": "Information Technology",
                    "enrollmentDate": "2023-02-01",
                    "gpa": 3.6
                },
                {
                    "id": "STU004",
                    "name": "Ayaan Ahmed",
                    "email": "student4@university.edu",
                    "phone": "03004445678",
                    "department": "Information Technology",
                    "enrollmentDate": "2023-02-01",
                    "gpa": 3.7
                }
            ],
            "teachers": [
                {
                    "id": "TCH001",
                    "name": "Dr. Muhammad Hassan",
                    "email": "teacher1@university.edu",
                    "phone": "03211234567",
                    "department": "Computer Science",
                    "qualification": "PhD in Computer Science",
                    "joiningDate": "2020-01-10"
                },
                {
                    "id": "TCH002",
                    "name": "Prof. Ayesha Ahmed",
                    "email": "teacher2@university.edu",
                    "phone": "03219876543",
                    "department": "Information Technology",
                    "qualification": "MS in Information Technology",
                    "joiningDate": "2021-03-15"
                },
                {
                    "id": "TCH003",
                    "name": "Dr. Ali Khan",
                    "email": "teacher3@university.edu",
                    "phone": "03215551234",
                    "department": "Computer Science",
                    "qualification": "PhD in Software Engineering",
                    "joiningDate": "2019-06-01"
                }
            ],
            "courses": [
                {
                    "id": "CS101",
                    "name": "Programming Fundamentals",
                    "code": "CS101",
                    "credits": 3,
                    "department": "Computer Science",
                    "description": "Introduction to programming concepts and basic algorithms"
                },
                {
                    "id": "CS102",
                    "name": "Data Structures",
                    "code": "CS102",
                    "credits": 3,
                    "department": "Computer Science",
                    "description": "Study of data structures like arrays, linked lists, trees, and graphs"
                },
                {
                    "id": "IT102",
                    "name": "Web Development",
                    "code": "IT102",
                    "credits": 3,
                    "department": "Information Technology",
                    "description": "Frontend and backend web development with HTML, CSS, and JavaScript"
                },
                {
                    "id": "IT103",
                    "name": "Database Management",
                    "code": "IT103",
                    "credits": 3,
                    "department": "Information Technology",
                    "description": "SQL and database design principles"
                }
            ],
            "classes": [
                {
                    "id": "CL001",
                    "name": "Class A",
                    "course": "CS101",
                    "courseCode": "CS101",
                    "teacher": "TCH001",
                    "teacherName": "Dr. Muhammad Hassan",
                    "schedule": "Mon-Wed-Fri 9:00 AM",
                    "room": "Room 101",
                    "capacity": 30
                },
                {
                    "id": "CL002",
                    "name": "Class B",
                    "course": "IT102",
                    "courseCode": "IT102",
                    "teacher": "TCH002",
                    "teacherName": "Prof. Ayesha Ahmed",
                    "schedule": "Tue-Thu 2:00 PM",
                    "room": "Room 202",
                    "capacity": 25
                },
                {
                    "id": "CL003",
                    "name": "Class C",
                    "course": "CS102",
                    "courseCode": "CS102",
                    "teacher": "TCH003",
                    "teacherName": "Dr. Ali Khan",
                    "schedule": "Mon-Wed 11:00 AM",
                    "room": "Room 105",
                    "capacity": 28
                },
                {
                    "id": "CL004",
                    "name": "Class D",
                    "course": "IT103",
                    "courseCode": "IT103",
                    "teacher": "TCH001",
                    "teacherName": "Dr. Muhammad Hassan",
                    "schedule": "Tue-Thu 4:00 PM",
                    "room": "Room 203",
                    "capacity": 22
                }
            ],
            "enrollments": [
                {
                    "id": "ENR001",
                    "studentId": "STU001",
                    "classId": "CL001",
                    "enrollmentDate": "2025-01-10",
                    "status": "active"
                },
                {
                    "id": "ENR002",
                    "studentId": "STU002",
                    "classId": "CL001",
                    "enrollmentDate": "2025-01-10",
                    "status": "active"
                },
                {
                    "id": "ENR003",
                    "studentId": "STU003",
                    "classId": "CL002",
                    "enrollmentDate": "2025-01-10",
                    "status": "active"
                },
                {
                    "id": "ENR004",
                    "studentId": "STU004",
                    "classId": "CL002",
                    "enrollmentDate": "2025-01-10",
                    "status": "active"
                },
                {
                    "id": "ENR005",
                    "studentId": "STU001",
                    "classId": "CL003",
                    "enrollmentDate": "2025-01-10",
                    "status": "active"
                },
                {
                    "id": "ENR006",
                    "studentId": "STU003",
                    "classId": "CL004",
                    "enrollmentDate": "2025-01-10",
                    "status": "active"
                }
            ],
            "attendance": [
                {
                    "id": "ATT001",
                    "studentId": "STU001",
                    "classId": "CL001",
                    "date": "2025-01-15",
                    "status": "present",
                    "time": "09:05"
                },
                {
                    "id": "ATT002",
                    "studentId": "STU002",
                    "classId": "CL001",
                    "date": "2025-01-15",
                    "status": "present",
                    "time": "09:10"
                },
                {
                    "id": "ATT003",
                    "studentId": "STU001",
                    "classId": "CL001",
                    "date": "2025-01-17",
                    "status": "absent",
                    "time": null
                },
                {
                    "id": "ATT004",
                    "studentId": "STU002",
                    "classId": "CL001",
                    "date": "2025-01-17",
                    "status": "present",
                    "time": "09:08"
                },
                {
                    "id": "ATT005",
                    "studentId": "STU003",
                    "classId": "CL002",
                    "date": "2025-01-16",
                    "status": "present",
                    "time": "14:05"
                },
                {
                    "id": "ATT006",
                    "studentId": "STU004",
                    "classId": "CL002",
                    "date": "2025-01-16",
                    "status": "present",
                    "time": "14:03"
                }
            ],
            "settings": {
                "schoolName": "University of Excellence",
                "schoolCode": "UOE001",
                "academicYear": "2024-2025",
                "semester": "Spring",
                "attendanceThreshold": 75,
                "sessionStartTime": "09:00",
                "sessionEndTime": "17:00"
            }
        };

        // Store all data in localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(sampleData.registeredUsers));
        localStorage.setItem('students', JSON.stringify(sampleData.students));
        localStorage.setItem('teachers', JSON.stringify(sampleData.teachers));
        localStorage.setItem('courses', JSON.stringify(sampleData.courses));
        localStorage.setItem('classes', JSON.stringify(sampleData.classes));
        localStorage.setItem('enrollments', JSON.stringify(sampleData.enrollments));
        localStorage.setItem('attendance', JSON.stringify(sampleData.attendance));
        localStorage.setItem('settings', JSON.stringify(sampleData.settings));
        localStorage.setItem('sampleDataInitialized', 'true');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sample data
    initializeSampleData();
    
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Check if user is already logged in
    checkLoginStatus();
});

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Validate inputs
    if (!email || !password || !role) {
        showAlert('Please fill all fields', 'error');
        return;
    }

    // Check registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => u.email === email && u.password === password && u.role === role);

    if (!user) {
        showAlert('Invalid credentials. Check the demo credentials displayed on screen.', 'error');
        return;
    }
    
    // Store user data in localStorage
    const userData = {
        id: user.id,
        email: email,
        fullName: user.fullName,
        role: role,
        loginTime: new Date().toISOString()
    };
    
    // Add additional fields if available
    if (user.studentId) userData.studentId = user.studentId;
    if (user.teacherId) userData.teacherId = user.teacherId;
    if (user.department) userData.department = user.department;
    
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('loggedIn', 'true');
    
    // Show success message
    showAlert('Login successful! Redirecting...', 'success');
    
    // Redirect based on role
    setTimeout(() => {
        switch(role) {
            case 'admin':
                window.location.href = 'src/admin/dashboard.html';
                break;
            case 'teacher':
                window.location.href = 'src/teacher/dashboard.html';
                break;
            case 'student':
                window.location.href = 'src/student/dashboard.html';
                break;
            default:
                showAlert('Invalid role selected', 'error');
        }
    }, 1500);
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    // If on a dashboard page and not logged in, redirect to login
    if (!isLoggedIn && window.location.pathname.includes('dashboard.html')) {
        window.location.href = '../../index.html';
    }
}

function logout() {
    // Show confirmation
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        localStorage.removeItem('loggedIn');
        
        // Show logout message
        showAlert('Logging out...', 'info');
        
        // Redirect to login page with a simple relative path
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 500);
    }
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at the beginning of the body
    const firstElement = document.body.firstChild;
    document.body.insertBefore(alertDiv, firstElement);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Format current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const elements = document.querySelectorAll('#currentTime');
    elements.forEach(el => {
        el.textContent = timeString;
    });
}

// Update time every second
setInterval(updateTime, 1000);
