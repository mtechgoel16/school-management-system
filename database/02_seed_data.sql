-- SEED BASELINE DATA (Auto-executed by PostgreSQL on initial container boot)
DO $$
DECLARE
    v_org_id UUID;
    v_school_id UUID;
    v_ay_id UUID;
    v_c1_id UUID;
    v_sec_a_id UUID;
    v_student_id UUID;
BEGIN
    -- 1. Trust & School
    INSERT INTO organizations (name) VALUES ('National Education Trust')
    ON CONFLICT DO NOTHING;
    SELECT id INTO v_org_id FROM organizations WHERE name = 'National Education Trust' LIMIT 1;

    INSERT INTO schools (organization_id, name, code, contact_email, contact_phone)
    VALUES (v_org_id, 'Delhi Public Model School', 'DPS001', 'info@delhipublic.edu', '+91 9876543210')
    ON CONFLICT (code) DO NOTHING;
    SELECT id INTO v_school_id FROM schools WHERE code = 'DPS001' LIMIT 1;

    -- 2. Academic Year
    INSERT INTO academic_years (school_id, name, start_date, end_date, is_current)
    VALUES (v_school_id, '2026-27', '2026-04-01', '2027-03-31', TRUE)
    ON CONFLICT (school_id, name) DO NOTHING;
    SELECT id INTO v_ay_id FROM academic_years WHERE school_id = v_school_id AND name = '2026-27' LIMIT 1;

    -- 3. School Class & Section
    INSERT INTO school_classes (school_id, name, display_order)
    VALUES (v_school_id, 'Class 1', 5)
    ON CONFLICT (school_id, name) DO NOTHING;
    SELECT id INTO v_c1_id FROM school_classes WHERE school_id = v_school_id AND name = 'Class 1' LIMIT 1;

    INSERT INTO class_sections (school_class_id, name)
    VALUES (v_c1_id, 'A')
    ON CONFLICT (school_class_id, name) DO NOTHING;
    SELECT id INTO v_sec_a_id FROM class_sections WHERE school_class_id = v_c1_id AND name = 'A' LIMIT 1;

    -- 4. Demo Student
    INSERT INTO students (school_id, admission_number, student_id_code, first_name, last_name, date_of_birth, gender, father_name, mother_name)
    VALUES (v_school_id, 'ADM1024', 'ST001', 'Arjun', 'Sharma', '2018-05-15', 'MALE', 'Rajesh Sharma', 'Neha Sharma')
    ON CONFLICT (school_id, student_id_code) DO NOTHING;
    SELECT id INTO v_student_id FROM students WHERE school_id = v_school_id AND student_id_code = 'ST001' LIMIT 1;

    INSERT INTO student_enrollments (student_id, academic_year_id, section_id, roll_number)
    VALUES (v_student_id, v_ay_id, v_sec_a_id, 1)
    ON CONFLICT (student_id, academic_year_id) DO NOTHING;

    -- 5. Seed Pending Fee Ledger (§59 FIFO Demonstration)
    INSERT INTO fee_ledger (student_id, school_id, fee_type, period_label, due_date, due_amount, remaining_amount, status)
    VALUES 
      (v_student_id, v_school_id, 'Tuition Fee', 'March 2026', '2026-03-10', 1000.00, 1000.00, 'PENDING'),
      (v_student_id, v_school_id, 'Tuition Fee', 'April 2026', '2026-04-10', 1000.00, 1000.00, 'PENDING'),
      (v_student_id, v_school_id, 'Tuition Fee', 'May 2026', '2026-05-10', 1000.00, 1000.00, 'PENDING')
    ON CONFLICT DO NOTHING;
END $$;
