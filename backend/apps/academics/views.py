from rest_framework import generics, views, response
from .models import SchoolClass, Student, DailyAttendance, StudentAttendanceRecord, ClassSection

class ClassListView(generics.ListAPIView):
    def get(self, request):
        classes = SchoolClass.objects.filter(school=request.user.school).prefetch_related('sections')
        return response.Response([{'id': str(c.id), 'name': c.name, 'sections': [{'id': str(s.id), 'name': s.name} for s in c.sections.all()]} for c in classes])

class SectionStudentsListView(generics.ListAPIView):
    def get(self, request, section_id):
        students = Student.objects.filter(enrollments__section_id=section_id)
        return response.Response([{'id': str(s.id), 'name': f"{s.first_name} {s.last_name}", 'code': s.student_id_code} for s in students])

class BulkAttendanceView(views.APIView):
    def post(self, request):
        sec = ClassSection.objects.get(id=request.data['section_id'])
        att, _ = DailyAttendance.objects.get_or_create(section=sec, attendance_date=request.data['attendance_date'], defaults={'school': sec.school_class.school})
        for r in request.data.get('records', []):
            StudentAttendanceRecord.objects.update_or_create(daily_attendance=att, student_id=r['student_id'], defaults={'status': r['status']})
        if request.data.get('lock_immediately'):
            att.is_locked = True
            att.save()
        return response.Response({"detail": "Saved"})

class AdminAbsentReportView(views.APIView):
    def get(self, request):
        records = StudentAttendanceRecord.objects.filter(status='ABSENT')
        return response.Response([{'student': f"{r.student.first_name} {r.student.last_name}", 'code': r.student.student_id_code} for r in records])
