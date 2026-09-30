import uuid
from django.db import models
from django.conf import settings
from apps.core.models import School, AcademicYear

class SchoolClass(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='classes')
    name = models.CharField(max_length=50)
    display_order = models.IntegerField(default=0)

    class Meta:
        unique_together = ('school', 'name')
        ordering = ['display_order']

    def __str__(self):
        return f"{self.school.code} - {self.name}"

class ClassSection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school_class = models.ForeignKey(SchoolClass, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(max_length=10)

    class Meta:
        unique_together = ('school_class', 'name')

    def __str__(self):
        return f"{self.school_class.name} - {self.name}"

class Student(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='students')
    admission_number = models.CharField(max_length=100)
    student_id_code = models.CharField(max_length=100) # e.g. ST001
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=[('MALE', 'Male'), ('FEMALE', 'Female'), ('OTHER', 'Other')])
    father_name = models.CharField(max_length=150, blank=True, null=True)
    mother_name = models.CharField(max_length=150, blank=True, null=True)
    parent_mobile = models.CharField(max_length=20, blank=True, null=True)
    aadhaar_number = models.CharField(max_length=12, blank=True, null=True) # Optional & Disabled by default (§26)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (('school', 'admission_number'), ('school', 'student_id_code'))

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id_code})"

class StudentEnrollment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments')
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    section = models.ForeignKey(ClassSection, on_delete=models.CASCADE)
    roll_number = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, default='ACTIVE')

    class Meta:
        unique_together = ('student', 'academic_year')

class DailyAttendance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    section = models.ForeignKey(ClassSection, on_delete=models.CASCADE)
    attendance_date = models.DateField()
    is_locked = models.BooleanField(default=False) # §35 Lock Workflow
    locked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    locked_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('section', 'attendance_date')

class StudentAttendanceRecord(models.Model):
    class Status(models.TextChoices):
        PRESENT = 'PRESENT', 'Present'
        ABSENT = 'ABSENT', 'Absent'
        LATE = 'LATE', 'Late'
        LEAVE = 'LEAVE', 'Leave'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    daily_attendance = models.ForeignKey(DailyAttendance, on_delete=models.CASCADE, related_name='records')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendance_records')
    status = models.CharField(max_length=10, choices=Status.choices)
    remarks = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('daily_attendance', 'student')

# §37 Student & Teacher Leave Engine
class StudentLeave(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        APPROVED = 'APPROVED', 'Approved'
        REJECTED = 'REJECTED', 'Rejected'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='leaves')
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=15, choices=Status.choices, default=Status.PENDING)
    action_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    action_remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class TeacherAttendance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='teacher_attendances')
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=[('PRESENT', 'Present'), ('ABSENT', 'Absent'), ('LEAVE', 'Leave')])
    reason = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('teacher', 'date')

# §74 Targeted Notices & Calendar Master
class TargetedNotice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    target_class = models.ForeignKey(SchoolClass, on_delete=models.SET_NULL, null=True, blank=True)
    target_section = models.ForeignKey(ClassSection, on_delete=models.SET_NULL, null=True, blank=True)
    target_role = models.CharField(max_length=20, default='ALL') # 'ALL', 'PARENT', 'TEACHER', 'STUDENT'
    publish_date = models.DateField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
