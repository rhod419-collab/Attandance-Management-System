// Teacher Dashboard Script
let myClasses = [];
let classStudents = [];

document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadTeacherData();
    setupNavigation();
    handleInitialHash();
    updateTime();
    setInterval(updateTime, 1000);
});

function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user || user.role !== 'teacher') {
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

function loadTeacherData() {
    // Sample classes for this teacher
    myClasses = [
        { 
            id: 'CL001', 
            name: 'Class A', 
            course: 'CS101',
            courseName: 'Programming Fundamentals',
            students: ['STU001', 'STU002'],
            schedule: 'Mon-Wed-Fri 9:00 AM',
            studentCount: 25
        },
        { 
            id: 'CL002', 
            name: 'Class B', 
            course: 'CS101',
            courseName: 'Programming Fundamentals',
            students: ['STU003', 'STU004'],
            schedule: 'Tue-Thu 2:00 PM',
            studentCount: 22
        }
    ];
    
    // Sample students
    classStudents = [
        { id: 'STU001', name: 'Ahmed Ali', rollNo: '101' },
        { id: 'STU002', name: 'Fatima Khan', rollNo: '102' },
        { id: 'STU003', name: 'Hassan Raza', rollNo: '103' },
        { id: 'STU004', name: 'Sara Ahmed', rollNo: '104' }
    ];
    
    updateTeacherStats();
    loadMyClasses();
    populateClassDropdowns();
}

function updateTeacherStats() {
    document.getElementById('myClassesCount').textContent = myClasses.length;
    document.getElementById('myStudentsCount').textContent = myClasses.reduce((sum, cls) => sum + cls.studentCount, 0);
    document.getElementById('todayClassesCount').textContent = Math.ceil(myClasses.length / 2);
    document.getElementById('avgAttendanceRate').textContent = '85%';
}

function loadMyClasses() {
    const grid = document.getElementById('classesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    myClasses.forEach(cls => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${cls.name}</h3>
            <p><strong>Course:</strong> ${cls.courseName}</p>
            <p><strong>Students:</strong> ${cls.studentCount}</p>
            <p><strong>Schedule:</strong> ${cls.schedule}</p>
            <div style="margin-top: 15px;">
                <button class="btn-primary" onclick="markAttendanceForClass('${cls.id}', '${cls.name}')">Mark Attendance</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function populateClassDropdowns() {
    const classSelect = document.getElementById('classSelect');
    if (classSelect) {
        classSelect.innerHTML = '<option value="">Select Class</option>';
        myClasses.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = cls.name;
            classSelect.appendChild(option);
        });
    }
    
    const classReportSelect = document.getElementById('classReportSelect');
    if (classReportSelect) {
        classReportSelect.innerHTML = '<option value="">Select Class</option>';
        myClasses.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = cls.name;
            classReportSelect.appendChild(option);
        });
    }
}

function loadClassStudents() {
    const classId = document.getElementById('classSelect').value;
    if (!classId) return;
    
    // Get students for selected class
    const selectedClass = myClasses.find(c => c.id === classId);
    if (!selectedClass) return;
    
    const dateSelect = document.getElementById('dateSelect');
    dateSelect.innerHTML = '<option value="">Select Date</option>';
    
    // Add last 10 dates
    for (let i = 0; i < 10; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const option = document.createElement('option');
        option.value = date.toISOString().split('T')[0];
        option.textContent = date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        dateSelect.appendChild(option);
    }
}

function startAttendance() {
    const classId = document.getElementById('classSelect').value;
    const date = document.getElementById('dateSelect').value;
    
    if (!classId || !date) {
        showAlert('Please select both class and date', 'warning');
        return;
    }
    
    const selectedClass = myClasses.find(c => c.id === classId);
    document.getElementById('selectedClass').textContent = selectedClass.name;
    
    const attendanceList = document.getElementById('attendanceList');
    attendanceList.innerHTML = '';
    
    classStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>
                <label><input type="radio" name="attendance_${student.id}" value="present"> Present</label>
                <label><input type="radio" name="attendance_${student.id}" value="absent"> Absent</label>
                <label><input type="radio" name="attendance_${student.id}" value="leave"> Leave</label>
            </td>
        `;
        attendanceList.appendChild(row);
    });
    
    document.getElementById('attendancePanel').style.display = 'block';
}

function submitAttendance() {
    const classId = document.getElementById('classSelect').value;
    const date = document.getElementById('dateSelect').value;
    
    const attendance = {};
    classStudents.forEach(student => {
        const selected = document.querySelector(`input[name="attendance_${student.id}"]:checked`);
        if (selected) {
            attendance[student.id] = selected.value;
        }
    });
    
    if (Object.keys(attendance).length === 0) {
        showAlert('Please mark attendance for all students', 'warning');
        return;
    }
    
    // Save to localStorage
    const record = {
        classId: classId,
        date: date,
        attendance: attendance,
        timestamp: new Date().toISOString()
    };
    
    let records = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
    records.push(record);
    localStorage.setItem('attendanceRecords', JSON.stringify(records));
    
    showAlert('Attendance submitted successfully', 'success');
    cancelAttendance();
}

function cancelAttendance() {
    document.getElementById('attendancePanel').style.display = 'none';
    document.getElementById('classSelect').value = '';
    document.getElementById('dateSelect').value = '';
}

function markAttendanceForClass(classId, className) {
    document.getElementById('classSelect').value = classId;
    loadClassStudents();
    
    // Scroll to attendance section
    const attendanceSection = document.getElementById('attendance');
    attendanceSection.scrollIntoView({ behavior: 'smooth' });
}

function generateClassReport() {
    const classId = document.getElementById('classReportSelect').value;
    const month = document.getElementById('reportMonth').value;
    
    if (!classId || !month) {
        showAlert('Please select both class and month', 'warning');
        return;
    }
    
    const selectedClass = myClasses.find(c => c.id === classId);
    const reportContent = document.getElementById('reportContent');
    
    // Generate sample report
    const reportHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h3>Attendance Report: ${selectedClass.name}</h3>
            <p><strong>Month:</strong> ${month}</p>
            <table class="data-table" style="margin-top: 20px;">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>Leave</th>
                        <th>Attendance %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ahmed Ali</td>
                        <td>18</td>
                        <td>2</td>
                        <td>0</td>
                        <td>90%</td>
                    </tr>
                    <tr>
                        <td>Fatima Khan</td>
                        <td>19</td>
                        <td>1</td>
                        <td>0</td>
                        <td>95%</td>
                    </tr>
                    <tr>
                        <td>Hassan Raza</td>
                        <td>16</td>
                        <td>3</td>
                        <td>1</td>
                        <td>80%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    
    reportContent.innerHTML = reportHTML;
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const elements = document.querySelectorAll('#currentTime');
    elements.forEach(el => {
        el.textContent = timeString;
    });
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

function showTeacherProfile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const profileInfo = `
Teacher Profile
================
Name: ${user.fullName || 'Dr. Muhammad Hassan'}
Email: ${user.email || 'teacher1@university.edu'}
Department: Computer Science
Classes: ${myClasses.length}
`;
    
    showAlert(`Profile loaded: ${user.fullName || 'Dr. Muhammad Hassan'}`, 'info');
}
