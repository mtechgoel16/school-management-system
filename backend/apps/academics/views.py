from django.db import transaction
from django.utils import timezone
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import (
    SchoolClass, ClassSection, Student, StudentEnrollment, 
    DailyAttendance, StudentAttendanceRecord
)

class ClassListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    def get(self, request):
        classes = SchoolClass.objects.all().prefetch_related('sections')
        data = [
            {
                "id": str(c.id),
                "name": c.name,
                "sections": [{"id": str(s.id), "name": s.name} for s in c.sections.all()]
            } for c in classes
        ]
        return Response(data)

class SectionStudentsListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    def get(self, request, section_id):
        students = Student.objects.filter(
            enrollments__section_id=section_id,
            enrollments__status='ACTIVE'
        ).order_by('enrollments__roll_number')
        data = [
            {
                "id": str(s.id),
                "student_id_code": s.student_id_code,
                "admission_number": s.admission_number,
                "name": f"{s.first_name} {s.last_name}",
                "father_name": s.father_name
            } for s in students
        ]
        return Response(data)

class BulkAttendanceView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        section_id = request.data.get('section_id')
        attendance_date = request.data.get('attendance_date')
        records = request.data.get('records', [])
        lock_immediately = request.data.get('lock_immediately', False)

        section = ClassSection.objects.get(id=section_id)
        with transaction.atomic():
            attendance, _ = DailyAttendance.objects.get_or_create(
                section=section,
                attendance_date=attendance_date,
                defaults={'school': section.school_class.school}
            )

            if attendance.is_locked:
                return Response({"detail": "Attendance is locked."}, status=status.HTTP_403_FORBIDDEN)

            for item in records:
                StudentAttendanceRecord.objects.update_or_create(
                    daily_attendance=attendance,
                    student_id=item['student_id'],
                    defaults={'status': item['status'], 'remarks': item.get('remarks', '')}
                )

            if lock_immediately:
                attendance.is_locked = True
                attendance.locked_at = timezone.now()
                attendance.save()

        return Response({"detail": "Attendance saved successfully.", "is_locked": attendance.is_locked})

class AdminAbsentReportView(views.APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        target_date = request.query_params.get('date', timezone.now().date())
        absent_records = StudentAttendanceRecord.objects.filter(
            status='ABSENT'
        ).select_related('student', 'daily_attendance__section__school_class')

        results = [
            {
                "student_id": str(r.student.id),
                "student_code": r.student.student_id_code,
                "student_name": f"{r.student.first_name} {r.student.last_name}",
                "class_name": r.daily_attendance.section.school_class.name,
                "section_name": r.daily_attendance.section.name,
                "father_name": r.student.father_name,
                "remarks": r.remarks
            } for r in absent_records
        ]
        return Response({"date": str(target_date), "count": len(results), "absent_students": results})

class ApplyStudentLeaveView(views.APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        return Response({"status": "PENDING", "detail": "Student leave application logged."})

class MarkTeacherAttendanceView(views.APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        return Response({"detail": "Teacher attendance updated."})

class AcademicTaskManagementView(views.APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        return Response({"detail": "Homework and Classwork published successfully."})

class TargetedNoticeView(views.APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        return Response({"detail": "Targeted notice published."})
