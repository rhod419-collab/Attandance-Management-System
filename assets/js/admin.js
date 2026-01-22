// Admin Dashboard Script
let students = [];
let teachers = [];
let courses = [];
let classes = [];

document.addEventListener('DOMContentLoaded', function() {
    // Check login status
    checkLoginStatus();
    
    // Load initial data
    loadDashboardData();
    
    // Setup navigation
    setupNavigation();
    handleInitialHash();

    // Wire report filter change
    const reportCourse = document.getElementById('reportCourse');
    if (reportCourse) {
        reportCourse.addEventListener('change', populateReportClasses);
    }

    // Wire class form submit
    const classForm = document.getElementById('classForm');
    if (classForm) {
        classForm.addEventListener('submit', handleAddClass);
    }

    // Wire teacher form submit
    const teacherForm = document.getElementById('teacherForm');
    if (teacherForm) {
        teacherForm.addEventListener('submit', handleAddTeacher);
    }

    // Wire course form submit
    const courseForm = document.getElementById('courseForm');
    if (courseForm) {
        courseForm.addEventListener('submit', handleAddCourse);
    }

    // Wire settings form submit
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', handleSettingsSave);
    }
    
    // Update time
    updateTime();
    setInterval(updateTime, 1000);
});

function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'admin') {
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
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.querySelector(target);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function loadDashboardData() {
    // Load sample data
    students = [
        { id: 'STU001', name: 'Ahmed Ali', email: 'ahmed@example.com', course: 'CS101' },
        { id: 'STU002', name: 'Fatima Khan', email: 'fatima@example.com', course: 'CS101' },
        { id: 'STU003', name: 'Hassan Raza', email: 'hassan@example.com', course: 'IT102' }
    ];
    
    teachers = [
        { id: 'TCH001', name: 'Dr. Muhammad', email: 'dr.muhammad@example.com', department: 'Computer Science' },
        { id: 'TCH002', name: 'Prof. Ayesha', email: 'prof.ayesha@example.com', department: 'Information Technology' }
    ];
    
    courses = [
        { id: 'CS101', name: 'Programming Fundamentals', code: 'CS101' },
        { id: 'IT102', name: 'Web Development', code: 'IT102' }
    ];
    
    classes = [
        { id: 'CL001', name: 'Class A', course: 'CS101', teacher: 'Dr. Muhammad', schedule: 'Mon-Wed-Fri 9:00 AM' },
        { id: 'CL002', name: 'Class B', course: 'IT102', teacher: 'Prof. Ayesha', schedule: 'Tue-Thu 2:00 PM' }
    ];
    
    updateStats();
    loadStudents();
    loadTeachers();
    loadCourses();
    loadClasses();
    populateReportFilters();
    populateAddClassOptions();
    loadSettings();
}

function updateStats() {
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalTeachers').textContent = teachers.length;
    document.getElementById('totalCourses').textContent = courses.length;
    document.getElementById('totalClasses').textContent = classes.length;
}

function loadStudents() {
    const tbody = document.getElementById('studentsList');
    tbody.innerHTML = '';
    
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No students found</td></tr>';
        return;
    }
    
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>
                <button class="btn-edit" onclick="editStudent('${student.id}')">Edit</button>
                <button class="btn-danger" onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadTeachers() {
    const tbody = document.getElementById('teachersList');
    tbody.innerHTML = '';
    
    if (teachers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">No teachers found</td></tr>';
        return;
    }
    
    teachers.forEach(teacher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.department}</td>
            <td>
                <button class="btn-edit" onclick="editTeacher('${teacher.id}')">Edit</button>
                <button class="btn-danger" onclick="deleteTeacher('${teacher.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadCourses() {
    const coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = '';
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${course.name}</h3>
            <p><strong>Code:</strong> ${course.code}</p>
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <button class="btn-edit" onclick="editCourse('${course.id}')">Edit</button>
                <button class="btn-danger" onclick="deleteCourse('${course.id}')">Delete</button>
            </div>
        `;
        coursesList.appendChild(card);
    });
}

function loadClasses() {
    const tbody = document.getElementById('classesList');
    tbody.innerHTML = '';
    
    if (classes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No classes found</td></tr>';
        return;
    }
    
    classes.forEach(cls => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cls.id}</td>
            <td>${cls.name}</td>
            <td>${cls.course}</td>
            <td>${cls.teacher}</td>
            <td>${cls.schedule}</td>
            <td>
                <button class="btn-edit" onclick="editClass('${cls.id}')">Edit</button>
                <button class="btn-danger" onclick="deleteClass('${cls.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openAddStudentModal() {
    document.getElementById('studentModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openAddTeacherModal() {
    const form = document.getElementById('teacherForm');
    if (form) {
        form.reset();
    }
    document.getElementById('teacherModal').classList.add('active');
}

function openAddCourseModal() {
    const form = document.getElementById('courseForm');
    if (form) {
        form.reset();
    }
    document.getElementById('courseModal').classList.add('active');
}

function openAddClassModal() {
    populateAddClassOptions();
    document.getElementById('classModal').classList.add('active');
}

function editStudent(id) {
    alert(`Edit Student ${id} functionality coming soon!`);
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== id);
        loadStudents();
        showAlert('Student deleted successfully', 'success');
    }
}

function editTeacher(id) {
    alert(`Edit Teacher ${id} functionality coming soon!`);
}

function deleteTeacher(id) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        teachers = teachers.filter(t => t.id !== id);
        loadTeachers();
        populateAddClassOptions();
        showAlert('Teacher deleted successfully', 'success');
    }
}

function editCourse(id) {
    alert(`Edit Course ${id} functionality coming soon!`);
}

function deleteCourse(id) {
    if (confirm('Are you sure you want to delete this course?')) {
        courses = courses.filter(c => c.id !== id);
        loadCourses();
        populateReportFilters();
        populateAddClassOptions();
        showAlert('Course deleted successfully', 'success');
    }
}

function editClass(id) {
    alert(`Edit Class ${id} functionality coming soon!`);
}

function deleteClass(id) {
    if (confirm('Are you sure you want to delete this class?')) {
        classes = classes.filter(c => c.id !== id);
        loadClasses();
        showAlert('Class deleted successfully', 'success');
    }
}

function generateReport() {
    const courseId = document.getElementById('reportCourse').value;
    const classId = document.getElementById('reportClass').value;
    const month = document.getElementById('reportMonth').value;

    if (!courseId || !classId || !month) {
        showAlert('Please select course, class, and month', 'warning');
        return;
    }

    const course = courses.find(c => c.id === courseId);
    const cls = classes.find(c => c.id === classId);
    const reportContent = document.getElementById('reportContent');

    // Demo summary data
    const summary = {
        totalSessions: 20,
        present: 17,
        absent: 2,
        leave: 1,
        percentage: Math.round((17 / 20) * 100)
    };

    reportContent.innerHTML = `
        <div class="card" style="padding: 20px; margin-top: 15px;">
            <h3 style="margin-bottom: 10px;">Attendance Report</h3>
            <p><strong>Course:</strong> ${course ? course.name : courseId}</p>
            <p><strong>Class:</strong> ${cls ? cls.name : classId}</p>
            <p><strong>Month:</strong> ${month}</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 15px;">
                <div class="stat-card"><h4>Total Sessions</h4><p class="stat-number">${summary.totalSessions}</p></div>
                <div class="stat-card"><h4>Present</h4><p class="stat-number">${summary.present}</p></div>
                <div class="stat-card"><h4>Absent</h4><p class="stat-number">${summary.absent}</p></div>
                <div class="stat-card"><h4>Leave</h4><p class="stat-number">${summary.leave}</p></div>
                <div class="stat-card"><h4>Attendance %</h4><p class="stat-number">${summary.percentage}%</p></div>
            </div>
        </div>
    `;
}

function loadSettings() {
    const defaults = {
        name: 'Admin User',
        email: 'admin@university.edu',
        theme: 'light',
        notifications: true
    };

    const saved = JSON.parse(localStorage.getItem('adminSettings') || 'null') || defaults;

    const nameEl = document.getElementById('settingName');
    const emailEl = document.getElementById('settingEmail');
    const themeEl = document.getElementById('settingTheme');
    const notifyEl = document.getElementById('settingNotify');

    if (nameEl) nameEl.value = saved.name || defaults.name;
    if (emailEl) emailEl.value = saved.email || defaults.email;
    if (themeEl) themeEl.value = saved.theme || defaults.theme;
    if (notifyEl) notifyEl.checked = saved.notifications !== false;
}

function handleSettingsSave(e) {
    e.preventDefault();

    const name = (document.getElementById('settingName').value || '').trim();
    const email = (document.getElementById('settingEmail').value || '').trim();
    const theme = document.getElementById('settingTheme').value || 'light';
    const notifications = document.getElementById('settingNotify').checked;
    const password = document.getElementById('settingPassword').value;
    const confirmPassword = document.getElementById('settingPasswordConfirm').value;

    if (!name || !email) {
        showAlert('Name and email are required', 'warning');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email', 'warning');
        return;
    }

    if (password || confirmPassword) {
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'warning');
            return;
        }
        if (password.length < 6) {
            showAlert('Password must be at least 6 characters', 'warning');
            return;
        }
    }

    const settings = { name, email, theme, notifications };
    localStorage.setItem('adminSettings', JSON.stringify(settings));

    // Optionally update current user email/name
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.fullName = name;
    user.email = email;
    localStorage.setItem('user', JSON.stringify(user));

    // Clear password fields
    document.getElementById('settingPassword').value = '';
    document.getElementById('settingPasswordConfirm').value = '';

    showAlert('Settings saved', 'success');
}

function populateReportFilters() {
    const courseSelect = document.getElementById('reportCourse');
    const classSelect = document.getElementById('reportClass');
    if (!courseSelect || !classSelect) return;

    courseSelect.innerHTML = '<option value="">Select Course</option>';
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = `${course.name} (${course.id})`;
        courseSelect.appendChild(option);
    });

    populateReportClasses();
}

function populateReportClasses() {
    const courseSelect = document.getElementById('reportCourse');
    const classSelect = document.getElementById('reportClass');
    if (!courseSelect || !classSelect) return;

    const selectedCourse = courseSelect.value;
    classSelect.innerHTML = '<option value="">Select Class</option>';
    classes
        .filter(cls => !selectedCourse || cls.course === selectedCourse)
        .forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = `${cls.name} (${cls.course})`;
            classSelect.appendChild(option);
        });
}

function populateAddClassOptions() {
    const courseSelect = document.getElementById('classCourse');
    const teacherSelect = document.getElementById('classTeacher');
    if (!courseSelect || !teacherSelect) return;

    courseSelect.innerHTML = '<option value="">Select Course</option>';
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = `${course.name} (${course.id})`;
        courseSelect.appendChild(option);
    });

    teacherSelect.innerHTML = '<option value="">Select Teacher</option>';
    teachers.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher.name;
        option.textContent = `${teacher.name} (${teacher.department})`;
        teacherSelect.appendChild(option);
    });
}

function handleAddClass(e) {
    e.preventDefault();

    const name = document.getElementById('className').value.trim();
    const courseId = document.getElementById('classCourse').value;
    const teacherName = document.getElementById('classTeacher').value;
    const schedule = document.getElementById('classSchedule').value.trim();

    if (!name || !courseId || !teacherName || !schedule) {
        showAlert('Please fill all class fields', 'warning');
        return;
    }

    const course = courses.find(c => c.id === courseId);
    const newClass = {
        id: `CL${String(classes.length + 1).padStart(3, '0')}`,
        name,
        course: course ? course.id : courseId,
        teacher: teacherName,
        schedule
    };

    classes.push(newClass);
    loadClasses();
    populateReportFilters();

    document.getElementById('classForm').reset();
    closeModal('classModal');
    showAlert('Class added successfully', 'success');
}

function handleAddTeacher(e) {
    e.preventDefault();

    const name = document.getElementById('teacherName').value.trim();
    const email = document.getElementById('teacherEmail').value.trim();
    const dept = document.getElementById('teacherDept').value.trim();
    const idInput = document.getElementById('teacherId').value.trim();

    if (!name || !email || !dept) {
        showAlert('Please fill all teacher fields', 'warning');
        return;
    }

    const newTeacher = {
        id: idInput || `TCH${String(teachers.length + 1).padStart(3, '0')}`,
        name,
        email,
        department: dept
    };

    teachers.push(newTeacher);
    loadTeachers();
    populateAddClassOptions();

    document.getElementById('teacherForm').reset();
    closeModal('teacherModal');
    showAlert('Teacher added successfully', 'success');
}

function handleAddCourse(e) {
    e.preventDefault();

    const name = document.getElementById('courseName').value.trim();
    const code = document.getElementById('courseCode').value.trim();
    const idInput = document.getElementById('courseId').value.trim();

    if (!name || !code) {
        showAlert('Please fill all course fields', 'warning');
        return;
    }

    const newCourse = {
        id: idInput || code,
        name,
        code
    };

    courses.push(newCourse);
    loadCourses();
    populateReportFilters();
    populateAddClassOptions();

    document.getElementById('courseForm').reset();
    closeModal('courseModal');
    showAlert('Course added successfully', 'success');
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const element = document.getElementById('currentTime');
    if (element) {
        element.textContent = timeString;
    }
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

function showAdminProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const profileInfo = `
Admin Profile
==============
Name: ${user.fullName || 'Admin User'}
Email: ${user.email || 'admin@university.edu'}
Role: Administrator
Status: Active
`;
    
    showAlert(`Profile: ${user.fullName || 'Admin User'}`, 'info');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const studentModal = document.getElementById('studentModal');
    const classModal = document.getElementById('classModal');
    const teacherModal = document.getElementById('teacherModal');
    const courseModal = document.getElementById('courseModal');

    if (event.target === studentModal) {
        studentModal.classList.remove('active');
    }
    if (event.target === classModal) {
        classModal.classList.remove('active');
    }
    if (event.target === teacherModal) {
        teacherModal.classList.remove('active');
    }
    if (event.target === courseModal) {
        courseModal.classList.remove('active');
    }
});
