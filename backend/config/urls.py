from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from apps.accounts.views import (
    CustomLoginView, CurrentUserProfileView, ParentOTPRequestView, ParentOTPVerifyView
)
from apps.academics.views import (
    ClassListView, SectionStudentsListView, BulkAttendanceView, AdminAbsentReportView,
    ApplyStudentLeaveView, MarkTeacherAttendanceView, AcademicTaskManagementView, TargetedNoticeView
)
from apps.examinations.views import (
    ExaminationListView, BulkMarksEntryView, StudentReportCardView, ClassWiseResultsView
)
from apps.fees.views import (
    StudentPendingFeesView, CreatePaymentOrderView, RazorpayWebhookView, DownloadReceiptPDFView
)
from apps.ai_assistant.views import (
    PublicFAQChatbotView, AdminQueryAssistantView
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # 1. Accounts & Authentication
    path('api/v1/auth/login/', CustomLoginView.as_view(), name='login'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/auth/me/', CurrentUserProfileView.as_view(), name='current_user'),
    path('api/v1/auth/parent/otp-request/', ParentOTPRequestView.as_view(), name='parent_otp_request'),
    path('api/v1/auth/parent/otp-verify/', ParentOTPVerifyView.as_view(), name='parent_otp_verify'),

    # 2. Academics & Attendance
    path('api/v1/academics/classes/', ClassListView.as_view(), name='class_list'),
    path('api/v1/academics/sections/<uuid:section_id>/students/', SectionStudentsListView.as_view(), name='section_students'),
    path('api/v1/academics/attendance/submit/', BulkAttendanceView.as_view(), name='attendance_submit'),
    path('api/v1/academics/attendance/absent-report/', AdminAbsentReportView.as_view(), name='absent_report'),
    path('api/v1/academics/leave/apply/', ApplyStudentLeaveView.as_view(), name='student_leave_apply'),
    path('api/v1/academics/teacher-attendance/submit/', MarkTeacherAttendanceView.as_view(), name='teacher_attendance_submit'),
    path('api/v1/academics/tasks/', AcademicTaskManagementView.as_view(), name='academic_tasks'),
    path('api/v1/core/notices/targeted/', TargetedNoticeView.as_view(), name='targeted_notice_publish'),

    # 3. Examinations & Report Card
    path('api/v1/examinations/', ExaminationListView.as_view(), name='exam_list'),
    path('api/v1/examinations/marks/bulk-entry/', BulkMarksEntryView.as_view(), name='marks_bulk_entry'),
    path('api/v1/examinations/report-card/<uuid:student_id>/<uuid:exam_id>/', StudentReportCardView.as_view(), name='report_card'),
    path('api/v1/examinations/<uuid:exam_id>/section/<uuid:section_id>/results/', ClassWiseResultsView.as_view(), name='class_results'),

    # 4. Fees & Payments
    path('api/v1/fees/student/<uuid:student_id>/pending/', StudentPendingFeesView.as_view(), name='pending_fees'),
    path('api/v1/fees/order/create/', CreatePaymentOrderView.as_view(), name='create_payment_order'),
    path('api/v1/fees/webhook/razorpay/', RazorpayWebhookView.as_view(), name='razorpay_webhook'),
    path('api/v1/fees/receipts/<uuid:receipt_id>/pdf/', DownloadReceiptPDFView.as_view(), name='download_receipt'),

    # 5. AI Assistant & Chatbot
    path('api/v1/ai/public/faq/', PublicFAQChatbotView.as_view(), name='public_faq'),
    path('api/v1/ai/admin/query/', AdminQueryAssistantView.as_view(), name='admin_query'),
]
