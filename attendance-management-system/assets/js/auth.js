// Authentication Script
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });
    }
    
    // Check if user is already logged in
    checkLoginStatus();
});

function openRegistrationModal(e) {
    e.preventDefault();
    const modal = document.getElementById('registrationModal');
    modal.classList.add('active');
}

function closeRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    modal.classList.remove('active');
    document.getElementById('registrationForm').reset();
}

function updateRegistrationFields() {
    const role = document.getElementById('regRole').value;
    const studentIdField = document.getElementById('studentIdField');
    const teacherIdField = document.getElementById('teacherIdField');
    const departmentField = document.getElementById('departmentField');

    studentIdField.style.display = role === 'student' ? 'block' : 'none';
    teacherIdField.style.display = role === 'teacher' ? 'block' : 'none';
    departmentField.style.display = role === 'teacher' ? 'block' : 'none';
}

function handleRegistration() {
    const fullName = document.getElementById('regFullName').value;
    const email = document.getElementById('regEmail').value;
    const role = document.getElementById('regRole').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validate inputs
    if (!fullName || !email || !role || !password || !confirmPassword) {
        showAlert('Please fill all required fields', 'error');
        return;
    }

    if (!agreeTerms) {
        showAlert('Please agree to the Terms & Conditions', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }

    // Password validation
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters long', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    if (existingUsers.some(u => u.email === email)) {
        showAlert('Email already registered. Please login instead.', 'error');
        return;
    }

    // Create new user object
    const newUser = {
        id: generateUserId(),
        fullName: fullName,
        email: email,
        role: role,
        password: password, // In production, this should be hashed
        registeredAt: new Date().toISOString()
    };

    // Add role-specific fields
    if (role === 'student') {
        newUser.studentId = document.getElementById('regStudentId').value;
    } else if (role === 'teacher') {
        newUser.teacherId = document.getElementById('regTeacherId').value;
        newUser.department = document.getElementById('regDepartment').value;
    }

    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    // Show success message
    showAlert('Registration successful! Please login with your credentials.', 'success');
    
    // Close modal and clear form
    setTimeout(() => {
        closeRegistrationModal();
        // Populate login form with email
        document.getElementById('email').value = email;
        document.getElementById('role').value = role;
    }, 1500);
}

function generateUserId() {
    return 'USR' + Date.now() + Math.floor(Math.random() * 1000);
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    // Validate inputs
    if (!email || !password || !role) {
        showAlert('Please fill all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email', 'error');
        return;
    }

    // Check registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = registeredUsers.find(u => u.email === email && u.password === password);

    // Also check default demo users
    const demoUsers = [
        { email: 'admin@university.edu', password: 'admin123', role: 'admin', fullName: 'Admin User' },
        { email: 'teacher1@university.edu', password: 'teacher123', role: 'teacher', fullName: 'Dr. Muhammad Hassan' },
        { email: 'student1@university.edu', password: 'student123', role: 'student', fullName: 'Ahmed Ali' }
    ];

    const demoUser = demoUsers.find(u => u.email === email && u.password === password);

    const authenticatedUser = user || demoUser;

    if (!authenticatedUser) {
        showAlert('Invalid email or password', 'error');
        return;
    }

    if (authenticatedUser.role !== role) {
        showAlert(`This account is registered as ${authenticatedUser.role}, not ${role}`, 'error');
        return;
    }
    
    // Store user data in localStorage
    const userData = {
        id: authenticatedUser.id,
        email: email,
        fullName: authenticatedUser.fullName,
        role: role,
        loginTime: new Date().toISOString()
    };
    
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

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('registrationModal');
    if (event.target === modal) {
        closeRegistrationModal();
    }
});
