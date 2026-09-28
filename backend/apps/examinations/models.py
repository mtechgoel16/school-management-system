import uuid
from django.db import models
from apps.core.models import School, AcademicYear
from apps.academics.models import Student

class Examination(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    is_published = models.BooleanField(default=False)

class ExamResult(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    examination = models.ForeignKey(Examination, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=100)
    max_marks = models.DecimalField(max_digits=5, decimal_places=2)
    obtained_marks = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    is_absent = models.BooleanField(default=False)
    grade = models.CharField(max_length=5, blank=True, null=True)
