// Student Dashboard Script
let studentInfo = {};
let attendance = [];
let subjectReports = [];

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadStudentData();
    setupNavigation();
    handleInitialHash();
    updateTime();
    setInterval(updateTime, 1000);
    
    // Setup profile edit form
    const profileForm = document.getElementById('profileEditForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate();
        });
    }
});

function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'student') {
        window.location.href = '../../index.html';
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav links
            document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const target = this.getAttribute('href');
            showSection(target);
        });
    });
}

function handleInitialHash() {
    const { hash } = window.location;

    if (!hash) {
        return;
    }

    if (hash === '#logout') {
        logout();
        return;
    }

    const targetLink = document.querySelector(`.nav-menu a[href="${hash}"]`);
    if (targetLink) {
        document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
        targetLink.classList.add('active');
        showSection(hash);
    }
}

window.addEventListener('hashchange', handleInitialHash);

function showSection(target) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.querySelector(target);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function loadStudentData() {
    // Sample student data
    studentInfo = {
        name: 'Ahmed Ali',
        id: 'STU001',
        email: 'ahmed@example.com',
        course: 'Computer Science'
    };

    // Use logged-in user info when available
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (currentUser && currentUser.role === 'student') {
        studentInfo.name = currentUser.fullName || studentInfo.name;
        studentInfo.email = currentUser.email || studentInfo.email;
        studentInfo.id = currentUser.studentId || studentInfo.id;
    }

    // Allow query params to populate profile fields (useful for deep links/tests)
    const params = new URLSearchParams(window.location.search);
    studentInfo.name = params.get('name') || studentInfo.name;
    studentInfo.email = params.get('email') || studentInfo.email;
    studentInfo.phone = params.get('phone') || studentInfo.phone;
    studentInfo.address = params.get('address') || studentInfo.address;
    
    // Sample attendance records with more dates
    attendance = [
        { subject: 'CS101 - Programming', class: 'Class A', date: '2024-01-15', status: 'present' },
        { subject: 'CS101 - Programming', class: 'Class A', date: '2024-01-12', status: 'present' },
        { subject: 'CS101 - Programming', class: 'Class A', date: '2024-01-10', status: 'present' },
        { subject: 'CS101 - Programming', class: 'Class A', date: '2024-01-08', status: 'leave' },
        { subject: 'CS101 - Programming', class: 'Class A', date: '2024-01-05', status: 'present' },
        { subject: 'CS102 - Database', class: 'Class B', date: '2024-01-15', status: 'present' },
        { subject: 'CS102 - Database', class: 'Class B', date: '2024-01-12', status: 'absent' },
        { subject: 'CS102 - Database', class: 'Class B', date: '2024-01-10', status: 'present' },
        { subject: 'CS102 - Database', class: 'Class B', date: '2024-01-08', status: 'present' },
        { subject: 'IT101 - Web Dev', class: 'Class C', date: '2024-01-15', status: 'present' },
        { subject: 'IT101 - Web Dev', class: 'Class C', date: '2024-01-12', status: 'leave' },
        { subject: 'IT101 - Web Dev', class: 'Class C', date: '2024-01-10', status: 'present' },
        { subject: 'CS103 - Data Structures', class: 'Class D', date: '2024-01-15', status: 'present' },
        { subject: 'CS103 - Data Structures', class: 'Class D', date: '2024-01-12', status: 'present' }
    ];
    
    // Enhanced subject reports with dates and details
    subjectReports = [
        { 
            subject: 'CS101 - Programming Fundamentals', 
            attendance: 92, 
            present: 23, 
            absent: 2, 
            leave: 1,
            lastAttendance: '2024-01-15',
            recentDates: ['2024-01-15 (Present)', '2024-01-12 (Present)', '2024-01-08 (Leave)', '2024-01-05 (Present)']
        },
        { 
            subject: 'CS102 - Database Management', 
            attendance: 85, 
            present: 17, 
            absent: 3, 
            leave: 0,
            lastAttendance: '2024-01-15',
            recentDates: ['2024-01-15 (Present)', '2024-01-12 (Absent)', '2024-01-10 (Present)', '2024-01-08 (Present)']
        },
        { 
            subject: 'IT101 - Web Development', 
            attendance: 88, 
            present: 22, 
            absent: 1, 
            leave: 1,
            lastAttendance: '2024-01-15',
            recentDates: ['2024-01-15 (Present)', '2024-01-12 (Leave)', '2024-01-10 (Present)']
        },
        { 
            subject: 'CS103 - Data Structures', 
            attendance: 90, 
            present: 18, 
            absent: 2, 
            leave: 0,
            lastAttendance: '2024-01-15',
            recentDates: ['2024-01-15 (Present)', '2024-01-12 (Present)']
        }
    ];
    
    updateStudentStats();
    loadAttendance();
    loadSubjectReports();
    loadProfile();
    populateFilters();
}

function updateStudentStats() {
    const totalAttendance = (attendance.filter(a => a.status === 'present').length / attendance.length * 100).toFixed(0);
    const presentCount = attendance.filter(a => a.status === 'present').length;
    const absentCount = attendance.filter(a => a.status === 'absent').length;
    const leaveCount = attendance.filter(a => a.status === 'leave').length;
    
    document.getElementById('totalAttendance').textContent = totalAttendance + '%';
    document.getElementById('presentCount').textContent = presentCount;
    document.getElementById('absentCount').textContent = absentCount;
    document.getElementById('leaveCount').textContent = leaveCount;
}

function loadAttendance() {
    const tbody = document.getElementById('attendanceList');
    tbody.innerHTML = '';
    
    const uniqueSubjects = [...new Set(attendance.map(a => a.subject))];
    
    if (attendance.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No attendance records found</td></tr>';
        return;
    }
    
    uniqueSubjects.forEach(subject => {
        const subjectAttendance = attendance.filter(a => a.subject === subject);
        const presentInSubject = subjectAttendance.filter(a => a.status === 'present').length;
        const percentage = ((presentInSubject / subjectAttendance.length) * 100).toFixed(0);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject}</td>
            <td>${subjectAttendance[0].class}</td>
            <td>${subjectAttendance[subjectAttendance.length - 1].date}</td>
            <td><span style="padding: 5px 10px; border-radius: 3px; background: ${subjectAttendance[subjectAttendance.length - 1].status === 'present' ? '#d4edda' : '#f8d7da'}; color: ${subjectAttendance[subjectAttendance.length - 1].status === 'present' ? '#155724' : '#721c24'}">${subjectAttendance[subjectAttendance.length - 1].status}</span></td>
            <td><strong>${percentage}%</strong></td>
        `;
        tbody.appendChild(row);
    });
}

function loadSubjectReports() {
    const grid = document.getElementById('reportsGrid');
    grid.innerHTML = '';
    
    subjectReports.forEach(report => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.padding = '20px';
        
        const attendanceColor = report.attendance >= 80 ? '#28a745' : report.attendance >= 70 ? '#ffc107' : '#dc3545';
        
        // Create recent attendance list
        const recentList = report.recentDates.map(date => 
            `<li style="padding: 5px 0; border-bottom: 1px solid #eee;">
                <span style="font-size: 13px; color: #666;">${date}</span>
            </li>`
        ).join('');
        
        card.innerHTML = `
            <h3 style="margin-bottom: 15px; color: #333;">${report.subject}</h3>
            
            <div style="text-align: center; margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                <div style="font-size: 48px; color: ${attendanceColor}; font-weight: bold;">
                    ${report.attendance}%
                </div>
                <p style="color: #666; margin-top: 10px; font-size: 14px;">Overall Attendance</p>
            </div>
            
            <div style="margin: 20px 0;">
                <h4 style="color: #333; font-size: 14px; margin-bottom: 10px;">Attendance Summary</h4>
                <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">
                            <span style="color: #28a745; font-weight: 600;">✓ Present:</span> <strong>${report.present}</strong>
                        </td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">
                            <span style="color: #dc3545; font-weight: 600;">✗ Absent:</span> <strong>${report.absent}</strong>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;">
                            <span style="color: #ffc107; font-weight: 600;">⊘ Leave:</span> <strong>${report.leave}</strong>
                        </td>
                        <td style="padding: 8px;">
                            <span style="color: #667eea; font-weight: 600;">📅 Last:</span> <strong>${report.lastAttendance}</strong>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="margin-top: 20px;">
                <h4 style="color: #333; font-size: 14px; margin-bottom: 10px;">Recent Dates</h4>
                <ul style="list-style: none; padding: 0; margin: 0; max-height: 150px; overflow-y: auto;">
                    ${recentList}
                </ul>
            </div>
        `;
        grid.appendChild(card);
    });
}

function loadProfile() {
    document.getElementById('studentName').textContent = studentInfo.name;
    document.getElementById('studentID').textContent = studentInfo.id;
    document.getElementById('studentEmail').textContent = studentInfo.email;
    document.getElementById('studentCourse').textContent = studentInfo.course;
}

function populateFilters() {
    const subjectFilter = document.getElementById('subjectFilter');
    const subjects = [...new Set(attendance.map(a => a.subject))];
    
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectFilter.appendChild(option);
    });
}

function filterAttendance() {
    const subject = document.getElementById('subjectFilter').value;
    const month = document.getElementById('monthFilter').value;
    
    let filtered = attendance;
    
    if (subject) {
        filtered = filtered.filter(a => a.subject === subject);
    }
    
    if (month) {
        filtered = filtered.filter(a => a.date.startsWith(month));
    }
    
    displayFilteredAttendance(filtered);
}

function goToProfileSection() {
    // Remove active from all nav links
    document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
    
    // Find and activate the profile link
    const profileLink = Array.from(document.querySelectorAll('.nav-menu a')).find(a => a.getAttribute('href') === '#profile');
    if (profileLink) {
        profileLink.classList.add('active');
    }
    
    // Show profile section
    showSection('#profile');
}

function displayFilteredAttendance(filtered) {
    const tbody = document.getElementById('attendanceList');
    tbody.innerHTML = '';
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No records found</td></tr>';
        return;
    }
    
    const uniqueSubjects = [...new Set(filtered.map(a => a.subject))];
    
    uniqueSubjects.forEach(subject => {
        const subjectAttendance = filtered.filter(a => a.subject === subject);
        const presentInSubject = subjectAttendance.filter(a => a.status === 'present').length;
        const percentage = ((presentInSubject / subjectAttendance.length) * 100).toFixed(0);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject}</td>
            <td>${subjectAttendance[0].class}</td>
            <td>${subjectAttendance[subjectAttendance.length - 1].date}</td>
            <td><span style="padding: 5px 10px; border-radius: 3px; background: ${subjectAttendance[subjectAttendance.length - 1].status === 'present' ? '#d4edda' : '#f8d7da'}; color: ${subjectAttendance[subjectAttendance.length - 1].status === 'present' ? '#155724' : '#721c24'}">${subjectAttendance[subjectAttendance.length - 1].status}</span></td>
            <td><strong>${percentage}%</strong></td>
        `;
        tbody.appendChild(row);
    });
}

function editProfile() {
    showAlert('Edit profile functionality coming soon!', 'info');
}

function openEditProfileModal() {
    const modal = document.getElementById('profileEditModal');
    
    // Populate form with current data
    document.getElementById('editName').value = studentInfo.name;
    document.getElementById('editEmail').value = studentInfo.email;
    document.getElementById('editPhone').value = studentInfo.phone || '';
    document.getElementById('editAddress').value = studentInfo.address || '';
    
    // Clear password fields
    document.getElementById('editPassword').value = '';
    document.getElementById('editConfirmPassword').value = '';
    
    modal.classList.add('active');
}

function closeProfileEditModal() {
    const modal = document.getElementById('profileEditModal');
    modal.classList.remove('active');
    document.getElementById('profileEditForm').reset();
}

function handleProfileUpdate() {
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const address = document.getElementById('editAddress').value;
    const password = document.getElementById('editPassword').value;
    const confirmPassword = document.getElementById('editConfirmPassword').value;

    // Validate inputs
    if (!name || !email) {
        showAlert('Name and Email are required', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email', 'error');
        return;
    }

    // Check if passwords match
    if (password && password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }

    // Check password length
    if (password && password.length < 6) {
        showAlert('Password must be at least 6 characters', 'error');
        return;
    }

    // Update student info
    studentInfo.name = name;
    studentInfo.email = email;
    studentInfo.phone = phone;
    studentInfo.address = address;

    // Update in localStorage if user created account
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    const userIndex = registeredUsers.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        registeredUsers[userIndex].fullName = name;
        registeredUsers[userIndex].email = email;
        if (password) {
            registeredUsers[userIndex].password = password;
        }
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }

    // Update current user info
    currentUser.fullName = name;
    currentUser.email = email;
    localStorage.setItem('user', JSON.stringify(currentUser));

    // Reload profile display
    loadProfile();
    
    showAlert('Profile updated successfully!', 'success');
    closeProfileEditModal();
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('profileEditModal');
    if (event.target === modal) {
        closeProfileEditModal();
    }
});
