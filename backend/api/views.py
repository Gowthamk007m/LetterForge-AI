from django.shortcuts import render
from openai import OpenAI
from django.template import Template, Context
from openai import OpenAI


from backend.settings import OPENAI_API_KEY
client = OpenAI(api_key=OPENAI_API_KEY)

from weasyprint import HTML,CSS


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
def home(request):
    html = HTML('template/cover-letter-template-modern.html')

    # Define CSS with A4 size and ensure content fits
    css = CSS(string='''
        @page {
            size: A4;
            margin: 1cm;
        }
        body {
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
        }
    ''')

    # Generate the PDF
    pdf_file_path = 'template/weasyprint-website.pdf'
    html.write_pdf(pdf_file_path, stylesheets=[css])
    return render(request, 'cover-letter-template-modern.html')






# class GenerateCoverLetterView(APIView):
#     def post(self, request):
#         try:
#             # Extract user-provided data from the request body
#             name = request.data.get('name', 'John Doe')
#             email = request.data.get('email', 'john.doe@email.com')
#             phone = request.data.get('phone', '(555) 123-4567')
#             job_title = request.data.get('job_title', 'Software Engineer')
#             company_name = request.data.get('company_name', 'ABC Corp')
#             job_description = request.data.get('job_description', 'New York, NY')
#             current_role = request.data.get('current_role', 'Software Developer at XYZ Inc.')
#             skills = request.data.get('skills', ['problem-solving', 'team collaboration'])
#             achievements = request.data.get('achievements', ['Developed a scalable API', 'Led a team of 5 developers'])

#             # Call OpenAI API to generate the cover letter content
#             prompt = f"""
#             Write a professional cover letter for the position of {job_title} at {company_name}. 
#             Include skills such as {', '.join(skills)} and address it to the hiring manager.

#             """

#             # Example OpenAI API call (adjust to your client library)
#             response = client.chat.completions.create(
#                 model="gpt-4o-mini",
#                 messages=[{"role": "user", "content": prompt}]
#             )
#             cover_letter = response['choices'][0]['message']['content']

#             # HTML template
#             html_template = """
#             <div class="cover-letter-container">
#                 <div class="header">
#                     <div class="personal-info">
#                         <h1>{{ name }}</h1>
#                     </div>
#                     <div class="contact-details">
#                         <p>{{ email }}</p>
#                         <p>{{ phone }}</p>
#                     </div>
#                 </div>

#                 <div class="letter-content">
#                     <p>{{ current_date }}</p>

#                     <div class="job-info">
#                         <h3>Application: {{ job_title }}</h3>
#                         <p>{{ company_name }}, {{ job_description }}</p>
#                     </div>

#                     <p>{{ cover_letter }}</p>

#                     <div class="professional-highlights">
#                         <h3>Professional Highlights</h3>
#                         <h4>Current Role</h4>
#                         <p>{{ current_role }}</p>

#                         <h4>Key Skills</h4>
#                         <ul class="skills-list">
#                             {% for skill in skills %}
#                             <li>{{ skill }}</li>
#                             {% endfor %}
#                         </ul>

#                         <h4>Notable Achievements</h4>
#                         <ul class="achievements-list">
#                             {% for achievement in achievements %}
#                             <li>{{ achievement }}</li>
#                             {% endfor %}
#                         </ul>
#                     </div>

#                     <p>Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team's success.</p>

#                     <div class="signature">
#                         <p>Sincerely,</p>
#                         <p>{{ name }}</p>
#                     </div>
#                 </div>
#             </div>
#             """

#             # Render the HTML with user data
#             from datetime import datetime
#             current_date = datetime.now().strftime("%B %d, %Y")

#             template = Template(html_template)
#             context = Context({
#                 "name": name,
#                 "email": email,
#                 "phone": phone,
#                 "job_title": job_title,
#                 "company_name": company_name,
#                 "job_description": job_description,
#                 "current_role": current_role,
#                 "skills": skills,
#                 "achievements": achievements,
#                 "cover_letter": cover_letter,
#                 "current_date": current_date,
#             })

#             rendered_html = template.render(context)

#             # Convert the rendered HTML to PDF
#             html = rendered_html

#             # Define CSS with A4 size and ensure content fits
#             css = CSS(string='''
#                 @page {
#                     size: A4;
#                     margin: 1cm;
#                 }
#                 body {
#                     font-size: 14px;
#                     line-height: 1.5;
#                     word-wrap: break-word;
#                 }
#             ''')

#     # Generate the PDF
#             pdf_file_path = 'template/weasyprint-website.pdf'
#             html.write_pdf(pdf_file_path, stylesheets=[css])


#             # Return the rendered HTML in the response
#             return Response({"html": rendered_html}, status=status.HTTP_200_OK)

#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


from rest_framework import status
from .serializers import CoverLetterInputSerializer
import json


def parse_ai_response(ai_response_text):
    try:
        # Load the AI response as a JSON object
        response = json.loads(ai_response_text)

        # Extract each section of the response
        parsed_response = {
            "header": {
                "name": response.header.name,
                "jobTitle": response.header.jobTitle,
                "email": response.header.email,
                "phone": response.header.phone,
                "location": response.header.location
            },
            "date": response.date,
            "jobDetails": {
                "positionTitle": response.jobDetails.positionTitle,
                "company": response.jobDetails.company,
                "location": response.jobDetails.location
            },
            "introduction": response.introduction,
            "skills": response.skills,
            "currentRole": response.currentRole,
            "achievements": response.achievements,
            "closing": response.closing,
            "signature": response.signature
        }

        return parsed_response

    except json.JSONDecodeError as e:
        print("Error parsing AI response:", e)
        return None


class GenerateCoverLetterView(APIView):
    def post(self, request):
        name = request.data.get('name')  # Matches "name" key in JSON
        email = request.data.get('email')  # Matches "email" key in JSON
        phone = request.data.get('phone')  # Matches "phone" key in JSON
        job_title = request.data.get('jobTitle')  # Matches "jobTitle" key in JSON
        company_name = request.data.get('company')  # Matches "company" key in JSON
        current_role = request.data.get('currentRole')  # Matches "currentRole" key in JSON
        skills = request.data.get('skills')  # Matches "skills" key in JSON
        achievements = request.data.get('achievements')  # Matches "achievements" key in JSON


        try:
            prompt = f"""
            Now, use the following details to generate the cover letter:
            - Name: {name}
            - Email: {email}
            - Phone: {phone}
            - Job Title: {job_title}
            - Company: {company_name}
            - Current Role: {current_role}
            - Skills: {', '.join(skills)}
            - Achievements: {', '.join(achievements)}
            """

            response = client.chat.completions.create(model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an assistant skilled in writing professional cover letters. deliver your cover letter in JSON format with the following structure with following keys: make 'positionTitle','introduction','skills','currentRole','achievements' also make introduction a sentance of at leat 200 characters."},
                {"role": "user", "content": prompt}])

            # Extract the AI-generated content
            cover_letter = response.choices[0].message.content
            print(cover_letter)
            return Response({"cover_letter": cover_letter}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


