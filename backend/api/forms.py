from django import forms
from .models import Userinput

class UserinputForm(forms.ModelForm):
    class Meta:
        model = Userinput
        fields = [
            'name', 'email', 'phone', 'jobdetails', 
            'company', 'jobdescription', 'currentrole', 
            'skills', 'achievements'
        ]

    def clean_name(self):
        name = self.cleaned_data.get('name')
        if not name or not name.strip():
            raise forms.ValidationError("Name is required.")
        if not name.replace(" ", "").isalpha():
            raise forms.ValidationError("Name should only contain alphabetic characters.")
        return name

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if not email:
            raise forms.ValidationError("Email is required.")
        return email

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if not phone:
            raise forms.ValidationError("Phone number is required.")
        if not phone.isdigit():
            raise forms.ValidationError("Phone number should only contain digits.")
        if len(phone) < 10 or len(phone) > 15:
            raise forms.ValidationError("Phone number must be between 10 to 15 digits.")
        return phone

    def clean_jobdetails(self):
        jobdetails = self.cleaned_data.get('jobdetails')
        if not jobdetails or not jobdetails.strip():
            raise forms.ValidationError("Job details are required.")
        if len(jobdetails) < 30:
            raise forms.ValidationError("Job details should be at least 30 characters.")
        return jobdetails

    def clean_company(self):
        company = self.cleaned_data.get('company')
        if not company or not company.strip():
            raise forms.ValidationError("Company name is required.")
        return company

    def clean_jobdescription(self):
        jobdescription = self.cleaned_data.get('jobdescription')
        if not jobdescription or not jobdescription.strip():
            raise forms.ValidationError("Job description is required.")
        if len(jobdescription) < 50:
            raise forms.ValidationError("Job description should be at least 50 characters.")
        return jobdescription

    def clean_currentrole(self):
        currentrole = self.cleaned_data.get('currentrole')
        if not currentrole or not currentrole.strip():
            raise forms.ValidationError("Current role is required.")
        return currentrole

    def clean_skills(self):
        skills = self.cleaned_data.get('skills')
        if not skills or not skills.strip():
            raise forms.ValidationError("Skills are required.")
        return skills

    def clean_achievements(self):
        achievements = self.cleaned_data.get('achievements')
        if not achievements or not achievements.strip():
            raise forms.ValidationError("Achievements are required.")
        return achievements
