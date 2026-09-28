import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.core.models import School

class User(AbstractUser):
    class Role(models.TextChoices):
        GROUP_ADMIN = 'GROUP_ADMIN', 'Group Admin'
        SCHOOL_ADMIN = 'SCHOOL_ADMIN', 'School Admin'
        PRINCIPAL = 'PRINCIPAL', 'Principal'
        ACCOUNTANT = 'ACCOUNTANT', 'Accountant'
        CLASS_TEACHER = 'CLASS_TEACHER', 'Class Teacher'
        SUBJECT_TEACHER = 'SUBJECT_TEACHER', 'Subject Teacher'
        PARENT = 'PARENT', 'Parent'
        STUDENT = 'STUDENT', 'Student'
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.STUDENT)
    mobile = models.CharField(max_length=20, blank=True, null=True)
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True, blank=True)
