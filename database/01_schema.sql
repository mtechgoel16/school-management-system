-- SCHOOL MANAGEMENT SYSTEM ERP - MASTER POSTGRESQL SCHEMA
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ORGANIZATIONS & SCHOOLS (§19 Multi-School Isolation)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    logo_url TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    UNIQUE(school_id, name)
);

-- ACADEMIC STRUCTURE (§17)
CREATE TABLE IF NOT EXISTS school_classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    display_order INT DEFAULT 0,
    UNIQUE(school_id, name)
);

CREATE TABLE IF NOT EXISTS class_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_class_id UUID REFERENCES school_classes(id) ON DELETE CASCADE,
    name VARCHAR(10) NOT NULL,
    UNIQUE(school_class_id, name)
);

-- USERS & ROLES (§21, §91)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    mobile VARCHAR(20),
    role VARCHAR(30) NOT NULL,
    school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- STUDENTS & ENROLLMENT (§21, §26)
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE SET NULL,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    admission_number VARCHAR(100) NOT NULL,
    student_id_code VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    father_name VARCHAR(150),
    mother_name VARCHAR(150),
    aadhaar_number VARCHAR(12) DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(school_id, admission_number),
    UNIQUE(school_id, student_id_code)
);

CREATE TABLE IF NOT EXISTS student_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
    section_id UUID REFERENCES class_sections(id) ON DELETE CASCADE,
    roll_number INT,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    UNIQUE(student_id, academic_year_id)
);

-- ATTENDANCE & LOCK WORKFLOW (§32, §35)
CREATE TABLE IF NOT EXISTS daily_attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    section_id UUID REFERENCES class_sections(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    is_locked BOOLEAN DEFAULT FALSE,
    locked_by UUID REFERENCES users(id),
    locked_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(section_id, attendance_date)
);

CREATE TABLE IF NOT EXISTS student_attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    daily_attendance_id UUID REFERENCES daily_attendance(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    status VARCHAR(10) NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'LEAVE')),
    remarks TEXT,
    UNIQUE(daily_attendance_id, student_id)
);

-- EXAMINATIONS & AB STATUS (§36, §42, §43)
CREATE TABLE IF NOT EXISTS examinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    examination_id UUID REFERENCES examinations(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    subject_name VARCHAR(100) NOT NULL,
    max_marks NUMERIC(5,2) NOT NULL,
    obtained_marks NUMERIC(5,2),
    is_absent BOOLEAN DEFAULT FALSE,
    grade VARCHAR(5),
    remarks TEXT,
    UNIQUE(examination_id, student_id, subject_name)
);

-- FINANCIAL LEDGER & PAYMENTS (§52, §59, §61)
CREATE TABLE IF NOT EXISTS fee_structures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    due_day INT DEFAULT 10
);

CREATE TABLE IF NOT EXISTS fee_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    fee_type VARCHAR(100) NOT NULL,
    period_label VARCHAR(50) NOT NULL,
    due_date DATE NOT NULL,
    due_amount NUMERIC(10,2) NOT NULL,
    paid_amount NUMERIC(10,2) DEFAULT 0.00,
    remaining_amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PARTIAL', 'PAID', 'OVERDUE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    gateway_order_id VARCHAR(150) UNIQUE NOT NULL,
    payable_amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'CREATED' CHECK (status IN ('CREATED', 'PAID', 'FAILED', 'EXPIRED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES payment_orders(id) ON DELETE CASCADE,
    gateway_transaction_id VARCHAR(150) UNIQUE NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    payment_method VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fee_receipts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number VARCHAR(100) UNIQUE NOT NULL,
    transaction_id UUID REFERENCES payment_transactions(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    pdf_file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
