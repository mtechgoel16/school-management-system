from django.core.management.base import BaseCommand
from apps.core.models import Organization, School, AcademicYear
from apps.academics.models import SchoolClass, ClassSection, Student, StudentEnrollment
from apps.accounts.models import User
from apps.fees.models import FeeLedger
from datetime import date

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        org, _ = Organization.objects.get_or_create(name='National Education Trust')
        school, _ = School.objects.get_or_create(
            organization=org, code='DPS001',
            defaults={'name': 'Delhi Public Model School', 'contact_email': 'info@delhipublic.edu'}
        )
        ay, _ = AcademicYear.objects.get_or_create(
            school=school, name='2026-27',
            defaults={'start_date': date(2026, 4, 1), 'end_date': date(2027, 3, 31), 'is_current': True}
        )
        classes = ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']
        c1a = None
        for i, c in enumerate(classes):
            sc, _ = SchoolClass.objects.get_or_create(school=school, name=c, defaults={'display_order': i})
            for s in ['A', 'B']:
                sec, _ = ClassSection.objects.get_or_create(school_class=sc, name=s)
                if c == 'Class 1' and s == 'A': c1a = sec

        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@delhipublic.edu', 'AdminPassword2026!', role=User.Role.SCHOOL_ADMIN, school=school)
        
        student, _ = Student.objects.get_or_create(
            school=school, student_id_code='ST001', admission_number='ADM1024',
            defaults={'first_name': 'Arjun', 'last_name': 'Sharma', 'date_of_birth': date(2018, 5, 15), 'gender': 'MALE', 'father_name': 'Rajesh Sharma'}
        )
        StudentEnrollment.objects.get_or_create(student=student, academic_year=ay, defaults={'section': c1a, 'roll_number': 1})
        FeeLedger.objects.get_or_create(student=student, school=school, period_label='March 2026', defaults={'fee_type': 'Tuition Fee', 'due_date': date(2026, 3, 10), 'due_amount': 1000, 'remaining_amount': 1000})
        self.stdout.write(self.style.SUCCESS('Seeded Demo School & Arjun Sharma successfully!'))
