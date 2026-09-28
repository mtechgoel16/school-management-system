import uuid
from django.db import models
from django.conf import settings
from apps.core.models import School, AcademicYear

class SchoolClass(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='classes')
    name = models.CharField(max_length=50)
    display_order = models.IntegerField(default=0)

class ClassSection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school_class = models.ForeignKey(SchoolClass, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(max_length=10)

class Student(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    admission_number = models.CharField(max_length=100)
    student_id_code = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    father_name = models.CharField(max_length=150, blank=True, null=True)

class StudentEnrollment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments')
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    section = models.ForeignKey(ClassSection, on_delete=models.CASCADE)
    roll_number = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, default='ACTIVE')

class DailyAttendance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    section = models.ForeignKey(ClassSection, on_delete=models.CASCADE)
    attendance_date = models.DateField()
    is_locked = models.BooleanField(default=False)

class StudentAttendanceRecord(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    daily_attendance = models.ForeignKey(DailyAttendance, on_delete=models.CASCADE, related_name='records')
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    status = models.CharField(max_length=10)
    remarks = models.TextField(blank=True, null=True)
