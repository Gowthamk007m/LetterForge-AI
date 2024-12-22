
from django.template.loader import render_to_string
from rest_framework.response import Response
from backend.settings import OPENAI_API_KEY
from rest_framework.views import APIView
from django.shortcuts import redirect
from .models import CoverLetterInput
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework import status
from weasyprint import HTML,CSS
from openai import OpenAI
from datetime import date
import json


client = OpenAI(api_key=OPENAI_API_KEY)

# Create your views here.
def download_cover_letter(request, id):
    cover_letter_data=CoverLetterInput.objects.get(id=id)
    skills_list = cover_letter_data.skills.split(", ")  
    achievements_list = cover_letter_data.achievements.split("\n")
    context={"cover_letter":cover_letter_data,"skills_list":skills_list,"achievements":achievements_list}

    css = CSS(string='''
        @page {
            size: A4;
            margin: 1cm;
            margin-top: 0cm;
        }
        body {
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
            page-break-inside: avoid;
        }
    ''')

    name=cover_letter_data.name
    html_string = render_to_string('cover-letter-creative-design.html', context)
    html = HTML(string=html_string)
    pdf_content = html.write_pdf(stylesheets=[css])
    
    response = HttpResponse(pdf_content, content_type='application/pdf')
    response['Content-Disposition'] = f'inline; filename="{cover_letter_data.name} Coverletter.pdf"'
    return response


def save_cover_letter(ai_data):
    coverletter = ai_data

    try:
        json_data = json.loads(coverletter['cover_letter'].strip("```json").strip("```"))

        cover_letter = CoverLetterInput(
            name=json_data.get('name'),
            email=json_data.get('email'),
            phone=json_data.get('phone'),
            location=json_data.get('location'),
            date=date.today(), 
            designation=json_data.get('designation'),
            jobTitle=json_data.get('job_title'),
            company=json_data.get('company'),
            introduction=json_data.get('introduction'),
            skills=", ".join(json_data.get('skills', [])),
            previousRole=json_data.get('previousRole'),
            previousCompany=json_data.get('previousCompany'),
            achievements="\n".join(json_data.get('achievements', [])), 
            approach=json_data.get('approach'),
        )
        cover_letter.save()
        
        return cover_letter 

        
        return JsonResponse({'status': 'success', 'message': 'Cover letter saved successfully!'})

    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})


class GenerateCoverLetterView(APIView):
    def post(self, request):
        name = request.data.get('name')  
        email = request.data.get('email')  
        phone = request.data.get('phone')  
        location = request.data.get('location')
        designation = request.data.get('designation')
        job_title = request.data.get('jobTitle')  
        company_name = request.data.get('company') 
        previos_role = request.data.get('previousRole') 
        previos_company = request.data.get('previousCompany')  
        skills = request.data.get('skills')  
        achievements = request.data.get('achievements') 


        try:
            prompt = f"""
            Now, use the following details to generate the cover letter:
            - Name: {name}
            - Email: {email}
            - Phone: {phone}
            - location: {location}
            - designation: {designation}
            - Job Title: {job_title}
            - Company: {company_name}
            - previous Role: {previos_role}
            - Previous Company: {previos_company}
            - Skills: {', '.join(skills)}
            - Achievements: {', '.join(achievements)}
            """

            response = client.chat.completions.create(model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an assistant skilled in writing professional cover letters. deliver your cover letter in JSON format with the following structure with following keys: make 'name','email','phone','location','desgination','job_title','company','introduction','skills','previousRole','previousCompany','achievements' also make introduction a sentance of at leat 150 characters.also in a key ,approach, write a 200 characters sentance show case your approach to the company and work, also make the key acheivements a list of at achievments, complete the achievments to a full line each"},
                {"role": "user", "content": prompt}])

            # Extract the AI-generated content
            cover_letter = response.choices[0].message.content
  

            data={"cover_letter": cover_letter}

            saved_cover_letter=save_cover_letter(data)

            return redirect('download_cover_letter', id=saved_cover_letter.id)
        
            print("data",data)
            # render_html(cover_letter)
            return Response({"cover_letter": cover_letter}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





