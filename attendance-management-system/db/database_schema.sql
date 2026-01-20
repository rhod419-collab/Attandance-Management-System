-- University Attendance Management System - Database Schema
-- MySQL Database

-- Create Database
CREATE DATABASE IF NOT EXISTS attendance_system;
USE attendance_system;

-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    course_id INT,
    enrollment_date DATE,
    status ENUM('active', 'inactive', 'graduated') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Teachers Table
CREATE TABLE teachers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    teacher_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(100),
    qualification VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Courses Table
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(50) UNIQUE NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    description TEXT,
    department VARCHAR(100),
    credits INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Classes Table
CREATE TABLE classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    class_code VARCHAR(50) UNIQUE NOT NULL,
    class_name VARCHAR(255) NOT NULL,
    course_id INT NOT NULL,
    teacher_id INT NOT NULL,
    room_number VARCHAR(50),
    schedule VARCHAR(255),
    capacity INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

-- Student-Class Enrollment
CREATE TABLE class_enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    status ENUM('active', 'dropped', 'completed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, class_id)
);

-- Attendance Table
CREATE TABLE attendance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('present', 'absent', 'leave') DEFAULT 'absent',
    marked_by INT,
    remarks TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by) REFERENCES teachers(id),
    UNIQUE KEY unique_attendance (student_id, class_id, attendance_date)
);

-- Attendance Summary (for performance optimization)
CREATE TABLE attendance_summary (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    month DATE NOT NULL,
    total_classes INT DEFAULT 0,
    total_present INT DEFAULT 0,
    total_absent INT DEFAULT 0,
    total_leave INT DEFAULT 0,
    attendance_percentage DECIMAL(5, 2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_summary (student_id, class_id, month)
);

-- Admin Table
CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    admin_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Reports Table
CREATE TABLE reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_type VARCHAR(100) NOT NULL,
    generated_by INT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_date DATE,
    end_date DATE,
    student_id INT,
    class_id INT,
    report_data LONGTEXT,
    FOREIGN KEY (generated_by) REFERENCES users(id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Create Indexes for better performance
CREATE INDEX idx_student_user ON students(user_id);
CREATE INDEX idx_teacher_user ON teachers(user_id);
CREATE INDEX idx_student_course ON students(course_id);
CREATE INDEX idx_class_course ON classes(course_id);
CREATE INDEX idx_class_teacher ON classes(teacher_id);
CREATE INDEX idx_enrollment_student ON class_enrollments(student_id);
CREATE INDEX idx_enrollment_class ON class_enrollments(class_id);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_attendance_class ON attendance(class_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
CREATE INDEX idx_summary_student ON attendance_summary(student_id);
CREATE INDEX idx_summary_class ON attendance_summary(class_id);
CREATE INDEX idx_summary_month ON attendance_summary(month);

-- Sample Data Insertion
INSERT INTO users (email, password, role) VALUES
('admin@university.edu', 'admin123', 'admin'),
('teacher1@university.edu', 'teacher123', 'teacher'),
('teacher2@university.edu', 'teacher456', 'teacher'),
('student1@university.edu', 'student123', 'student'),
('student2@university.edu', 'student456', 'student'),
('student3@university.edu', 'student789', 'student');

INSERT INTO courses (course_code, course_name, department, credits) VALUES
('CS101', 'Programming Fundamentals', 'Computer Science', 3),
('CS102', 'Data Structures', 'Computer Science', 3),
('IT101', 'Web Development', 'Information Technology', 3),
('IT102', 'Database Management', 'Information Technology', 3);

INSERT INTO teachers (user_id, teacher_id, name, email, department) VALUES
(2, 'TCH001', 'Dr. Muhammad Hassan', 'teacher1@university.edu', 'Computer Science'),
(3, 'TCH002', 'Prof. Ayesha Ahmed', 'teacher2@university.edu', 'Information Technology');

INSERT INTO students (user_id, student_id, name, email, course_id) VALUES
(4, 'STU001', 'Ahmed Ali', 'student1@university.edu', 1),
(5, 'STU002', 'Fatima Khan', 'student2@university.edu', 1),
(6, 'STU003', 'Hassan Raza', 'student3@university.edu', 2);

INSERT INTO classes (class_code, class_name, course_id, teacher_id, schedule, capacity) VALUES
('CL001', 'CS101-A', 1, 1, 'Mon-Wed-Fri 9:00 AM', 30),
('CL002', 'CS101-B', 1, 1, 'Tue-Thu 2:00 PM', 28);

INSERT INTO class_enrollments (student_id, class_id, enrollment_date) VALUES
(1, 1, '2024-01-10'),
(2, 1, '2024-01-10'),
(3, 2, '2024-01-10');
