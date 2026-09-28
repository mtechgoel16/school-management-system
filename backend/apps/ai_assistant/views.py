from rest_framework import views, response

class PublicFAQChatbotView(views.APIView):
    def post(self, request):
        return response.Response({"reply": "Delhi Public Model School operates from 8 AM to 2 PM. Admissions are currently open."})

class AdminQueryAssistantView(views.APIView):
    def post(self, request):
        return response.Response({"analysis": "Live Data Summary: 1,420 Students Enrolled, 35 Absent Today, 98% Fee Collection rate."})
