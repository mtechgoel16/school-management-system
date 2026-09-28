from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.accounts.views import CustomLoginView, CurrentUserProfileView, ParentOTPRequestView, ParentOTPVerifyView
from apps.academics.views import ClassListView, SectionStudentsListView, BulkAttendanceView, AdminAbsentReportView
from apps.examinations.views import ExaminationListView, BulkMarksEntryView, StudentReportCardView
from apps.fees.views import StudentPendingFeesView, CreatePaymentOrderView, RazorpayWebhookView, DownloadReceiptPDFView
from apps.ai_assistant.views import PublicFAQChatbotView, AdminQueryAssistantView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/login/', CustomLoginView.as_view()),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view()),
    path('api/v1/auth/me/', CurrentUserProfileView.as_view()),
    path('api/v1/auth/parent/otp-request/', ParentOTPRequestView.as_view()),
    path('api/v1/auth/parent/otp-verify/', ParentOTPVerifyView.as_view()),
    path('api/v1/academics/classes/', ClassListView.as_view()),
    path('api/v1/academics/sections/<uuid:section_id>/students/', SectionStudentsListView.as_view()),
    path('api/v1/academics/attendance/submit/', BulkAttendanceView.as_view()),
    path('api/v1/academics/attendance/absent-report/', AdminAbsentReportView.as_view()),
    path('api/v1/examinations/', ExaminationListView.as_view()),
    path('api/v1/examinations/marks/bulk-entry/', BulkMarksEntryView.as_view()),
    path('api/v1/examinations/report-card/<uuid:student_id>/<uuid:exam_id>/', StudentReportCardView.as_view()),
    path('api/v1/fees/student/<uuid:student_id>/pending/', StudentPendingFeesView.as_view()),
    path('api/v1/fees/order/create/', CreatePaymentOrderView.as_view()),
    path('api/v1/fees/webhook/razorpay/', RazorpayWebhookView.as_view()),
    path('api/v1/fees/receipts/<uuid:receipt_id>/pdf/', DownloadReceiptPDFView.as_view()),
    path('api/v1/ai/public/faq/', PublicFAQChatbotView.as_view()),
    path('api/v1/ai/admin/query/', AdminQueryAssistantView.as_view()),
]
