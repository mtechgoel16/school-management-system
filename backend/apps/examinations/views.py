from decimal import Decimal
from django.db import transaction
from django.db.models import Sum, Avg, F
from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Examination, ExamResult
from apps.academics.models import Student, SchoolClass

class ExaminationListView(views.APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        exams = Examination.objects.all()
        return Response([{"id": str(e.id), "name": e.name, "is_published": e.is_published} for e in exams])

class BulkMarksEntryView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        exam_id = request.data.get('examination_id')
        subject = request.data.get('subject_name')
        max_marks = Decimal(str(request.data.get('max_marks', 100)))
        entries = request.data.get('entries', [])

        exam = Examination.objects.get(id=exam_id)
        with transaction.atomic():
            for entry in entries:
                is_ab = entry.get('is_absent', False)
                marks = None if is_ab else Decimal(str(entry.get('obtained_marks', 0)))

                grade = 'AB'
                if not is_ab and marks is not None:
                    pct = (marks / max_marks) * 100
                    if pct >= 90: grade = 'A+'
                    elif pct >= 80: grade = 'A'
                    elif pct >= 70: grade = 'B+'
                    elif pct >= 60: grade = 'B'
                    elif pct >= 50: grade = 'C'
                    elif pct >= 33: grade = 'D'
                    else: grade = 'F'

                ExamResult.objects.update_or_create(
                    examination=exam,
                    student_id=entry['student_id'],
                    subject_name=subject,
                    defaults={
                        'max_marks': max_marks,
                        'obtained_marks': marks,
                        'is_absent': is_ab, # §36 AB Status
                        'grade': grade,
                        'remarks': entry.get('remarks', '')
                    }
                )
        return Response({"detail": f"Marks for {subject} saved successfully with AB logic validated."})

# §43 Accordion Report Card API
class StudentReportCardView(views.APIView):
    permission_classes = [AllowAny]

    def get(self, request, student_id, exam_id):
        results = ExamResult.objects.filter(examination_id=exam_id, student_id=student_id).select_related('examination', 'student')
        if not results.exists():
            return Response({"detail": "Result records not found."}, status=status.HTTP_404_NOT_FOUND)

        subjects, total_max, total_obtained, has_ab = [], Decimal('0.0'), Decimal('0.0'), False
        for r in results:
            subjects.append({
                "subject": r.subject_name,
                "max_marks": float(r.max_marks),
                "obtained_marks": float(r.obtained_marks) if not r.is_absent else None,
                "status": "AB" if r.is_absent else ("Pass" if r.grade != 'F' else "Fail"),
                "grade": r.grade,
            })
            if r.is_absent:
                has_ab = True
            else:
                total_max += r.max_marks
                total_obtained += (r.obtained_marks or Decimal('0.0'))

        # §36 & §46: AB students are mathematically excluded from percentage and rank
        percentage = round(float((total_obtained / total_max) * 100), 2) if (total_max > 0 and not has_ab) else None

        return Response({
            "examination": results[0].examination.name,
            "student_name": f"{results[0].student.first_name} {results[0].student.last_name}",
            "student_code": results[0].student.student_id_code,
            "has_ab_status": has_ab,
            "subjects": subjects,
            "total_maximum": float(total_max),
            "total_obtained": float(total_obtained),
            "overall_percentage": percentage,
            "status": "Pass" if (not has_ab and percentage and percentage >= 33) else ("Incomplete / AB" if has_ab else "Fail")
        })

# §49 & §50 Class-wise Results Screen & Top-5 Calculation (Excluding AB)
class ClassWiseResultsView(views.APIView):
    permission_classes = [AllowAny]

    def get(self, request, exam_id, section_id):
        order_by = request.query_params.get('order', 'desc') # 'asc' | 'desc'
        students = Student.objects.filter(enrollments__section_id=section_id)
        
        student_results = []
        for s in students:
            marks = ExamResult.objects.filter(examination_id=exam_id, student_id=s.id)
            has_ab = marks.filter(is_absent=True).exists()
            tot_max = marks.aggregate(total=Sum('max_marks'))['total'] or Decimal('0.0')
            tot_obt = marks.filter(is_absent=False).aggregate(total=Sum('obtained_marks'))['total'] or Decimal('0.0')

            pct = round(float((tot_obt / tot_max) * 100), 2) if (tot_max > 0 and not has_ab) else None

            student_results.append({
                "student_id": str(s.id),
                "student_code": s.student_id_code,
                "name": f"{s.first_name} {s.last_name}",
                "total_obtained": float(tot_obt),
                "total_maximum": float(tot_max),
                "percentage": pct,
                "is_ab": has_ab,
                "status": "AB Excluded" if has_ab else ("Pass" if pct and pct >= 33 else "Fail")
            })

        # Sort: valid percentages first, then None
        reverse = True if order_by == 'desc' else False
        student_results.sort(key=lambda x: (x['percentage'] is not None, x['percentage']), reverse=reverse)

        # Top 5 (§50: Only valid numeric, non-AB students)
        top_5 = [s for s in student_results if not s['is_ab'] and s['percentage'] is not None][:5]

        return Response({
            "students": student_results,
            "top_5": top_5
        })
