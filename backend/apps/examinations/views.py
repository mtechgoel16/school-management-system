from rest_framework import views, response
from .models import Examination, ExamResult

class ExaminationListView(views.APIView):
    def get(self, request):
        exams = Examination.objects.filter(school=request.user.school)
        return response.Response([{'id': str(e.id), 'name': e.name} for e in exams])

class BulkMarksEntryView(views.APIView):
    def post(self, request):
        exam = Examination.objects.get(id=request.data['examination_id'])
        for e in request.data.get('entries', []):
            ExamResult.objects.update_or_create(
                examination=exam, student_id=e['student_id'], subject_name=request.data['subject_name'],
                defaults={'max_marks': request.data['max_marks'], 'obtained_marks': e.get('obtained_marks'), 'is_absent': e.get('is_absent', False)}
            )
        return response.Response({"detail": "Saved"})

class StudentReportCardView(views.APIView):
    def get(self, request, student_id, exam_id):
        res = ExamResult.objects.filter(examination_id=exam_id, student_id=student_id)
        return response.Response([{'subject': r.subject_name, 'marks': float(r.obtained_marks or 0), 'is_ab': r.is_absent} for r in res])
