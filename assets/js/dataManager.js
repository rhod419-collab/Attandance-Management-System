/**
 * Data Manager Helper Functions
 * Provides easy access to localStorage data throughout the application
 * Usage: Include this file in your HTML before other scripts
 */

class DataManager {
    // Get all users
    static getUsers() {
        return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    }

    // Get all students
    static getStudents() {
        return JSON.parse(localStorage.getItem('students') || '[]');
    }

    // Get all teachers
    static getTeachers() {
        return JSON.parse(localStorage.getItem('teachers') || '[]');
    }

    // Get all courses
    static getCourses() {
        return JSON.parse(localStorage.getItem('courses') || '[]');
    }

    // Get all classes
    static getClasses() {
        return JSON.parse(localStorage.getItem('classes') || '[]');
    }

    // Get all enrollments
    static getEnrollments() {
        return JSON.parse(localStorage.getItem('enrollments') || '[]');
    }

    // Get all attendance records
    static getAttendance() {
        return JSON.parse(localStorage.getItem('attendance') || '[]');
    }

    // Get system settings
    static getSettings() {
        return JSON.parse(localStorage.getItem('settings') || '{}');
    }

    // Get student by ID
    static getStudentById(id) {
        return this.getStudents().find(s => s.id === id);
    }

    // Get teacher by ID
    static getTeacherById(id) {
        return this.getTeachers().find(t => t.id === id);
    }

    // Get class by ID
    static getClassById(id) {
        return this.getClasses().find(c => c.id === id);
    }

    // Get course by ID
    static getCourseById(id) {
        return this.getCourses().find(c => c.id === id);
    }

    // Get classes for a teacher
    static getClassesByTeacher(teacherId) {
        return this.getClasses().filter(c => c.teacher === teacherId);
    }

    // Get classes for a course
    static getClassesByCourse(courseId) {
        return this.getClasses().filter(c => c.course === courseId);
    }

    // Get students enrolled in a class
    static getStudentsInClass(classId) {
        const enrollments = this.getEnrollments().filter(e => e.classId === classId);
        return enrollments.map(e => this.getStudentById(e.studentId)).filter(Boolean);
    }

    // Get classes for a student
    static getClassesByStudent(studentId) {
        const enrollments = this.getEnrollments().filter(e => e.studentId === studentId);
        return enrollments.map(e => this.getClassById(e.classId)).filter(Boolean);
    }

    // Get attendance for a student
    static getAttendanceByStudent(studentId) {
        return this.getAttendance().filter(a => a.studentId === studentId);
    }

    // Get attendance for a class
    static getAttendanceByClass(classId) {
        return this.getAttendance().filter(a => a.classId === classId);
    }

    // Get attendance for a specific date
    static getAttendanceByDate(date) {
        return this.getAttendance().filter(a => a.date === date);
    }

    // Calculate attendance percentage for a student
    static getAttendancePercentage(studentId) {
        const records = this.getAttendanceByStudent(studentId);
        if (records.length === 0) return 0;
        const presentCount = records.filter(r => r.status === 'present').length;
        return Math.round((presentCount / records.length) * 100);
    }

    // Add new student
    static addStudent(student) {
        const students = this.getStudents();
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        return student;
    }

    // Add new teacher
    static addTeacher(teacher) {
        const teachers = this.getTeachers();
        teachers.push(teacher);
        localStorage.setItem('teachers', JSON.stringify(teachers));
        return teacher;
    }

    // Add new course
    static addCourse(course) {
        const courses = this.getCourses();
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
        return course;
    }

    // Add new class
    static addClass(classData) {
        const classes = this.getClasses();
        classes.push(classData);
        localStorage.setItem('classes', JSON.stringify(classes));
        return classData;
    }

    // Add attendance record
    static addAttendance(attendance) {
        const records = this.getAttendance();
        records.push(attendance);
        localStorage.setItem('attendance', JSON.stringify(records));
        return attendance;
    }

    // Update student
    static updateStudent(id, updatedData) {
        const students = this.getStudents();
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updatedData };
            localStorage.setItem('students', JSON.stringify(students));
            return students[index];
        }
        return null;
    }

    // Update teacher
    static updateTeacher(id, updatedData) {
        const teachers = this.getTeachers();
        const index = teachers.findIndex(t => t.id === id);
        if (index !== -1) {
            teachers[index] = { ...teachers[index], ...updatedData };
            localStorage.setItem('teachers', JSON.stringify(teachers));
            return teachers[index];
        }
        return null;
    }

    // Delete student
    static deleteStudent(id) {
        const students = this.getStudents();
        const filtered = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(filtered));
    }

    // Delete teacher
    static deleteTeacher(id) {
        const teachers = this.getTeachers();
        const filtered = teachers.filter(t => t.id !== id);
        localStorage.setItem('teachers', JSON.stringify(filtered));
    }

    // Delete class
    static deleteClass(id) {
        const classes = this.getClasses();
        const filtered = classes.filter(c => c.id !== id);
        localStorage.setItem('classes', JSON.stringify(filtered));
    }

    // Update settings
    static updateSettings(newSettings) {
        const current = this.getSettings();
        const updated = { ...current, ...newSettings };
        localStorage.setItem('settings', JSON.stringify(updated));
        return updated;
    }

    // Get summary statistics
    static getStatistics() {
        return {
            totalStudents: this.getStudents().length,
            totalTeachers: this.getTeachers().length,
            totalCourses: this.getCourses().length,
            totalClasses: this.getClasses().length,
            totalEnrollments: this.getEnrollments().length,
            totalAttendanceRecords: this.getAttendance().length
        };
    }

    // Export data as JSON
    static exportData() {
        return {
            users: this.getUsers(),
            students: this.getStudents(),
            teachers: this.getTeachers(),
            courses: this.getCourses(),
            classes: this.getClasses(),
            enrollments: this.getEnrollments(),
            attendance: this.getAttendance(),
            settings: this.getSettings(),
            exportDate: new Date().toISOString()
        };
    }

    // Clear all data
    static clearAllData() {
        localStorage.clear();
    }

    // Generate unique ID
    static generateId(prefix = 'ID') {
        return prefix + Date.now() + Math.floor(Math.random() * 1000);
    }
}

// Example usage in console:
// DataManager.getStudents()
// DataManager.getStudentById('STU001')
// DataManager.getStatistics()
// DataManager.addStudent({id: 'STU005', name: 'New Student', ...})
