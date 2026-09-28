import uuid, io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from rest_framework import views, response
from .models import FeeLedger, PaymentOrder, PaymentTransaction, FeeReceipt
from apps.academics.models import Student

class StudentPendingFeesView(views.APIView):
    def get(self, request, student_id):
        entries = FeeLedger.objects.filter(student_id=student_id)
        return response.Response([{'period': e.period_label, 'due': float(e.remaining_amount)} for e in entries])

class CreatePaymentOrderView(views.APIView):
    def post(self, request):
        st = Student.objects.get(id=request.data['student_id'])
        gid = f"order_{uuid.uuid4().hex[:14]}"
        o = PaymentOrder.objects.create(student=st, gateway_order_id=gid, payable_amount=request.data['amount'])
        return response.Response({'gateway_order_id': gid, 'order_id': str(o.id)})

class RazorpayWebhookView(views.APIView):
    def post(self, request):
        return response.Response({"status": "received"})

class DownloadReceiptPDFView(views.APIView):
    def get(self, request, receipt_id):
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        p.drawString(100, 750, "SCHOOL ERP OFFICIAL RECEIPT")
        p.showPage()
        p.save()
        buffer.seek(0)
        return HttpResponse(buffer, content_type='application/pdf')
