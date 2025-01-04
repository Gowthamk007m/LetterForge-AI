import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { BookLoaderComponent } from '../ui/Loader';

export default function MultiStepCoverLetterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    designation: '',
    jobTitle: '',
    company: '',
    previousRole: '',
    previousCompany: '',
    skills: '',
    achievements: ''
  });
  const [errors, setErrors] = useState({});


  const validateField = (id, value) => {
    const validators = {
      name: (val) => {
        if (!val.trim()) return 'Full name is required.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        if (!/^[a-zA-Z\s'-]+$/.test(val)) return 'Name can only contain letters, spaces, hyphens, and apostrophes.';
        return '';
      },
      email: (val) => {
        if (!val) return 'Email is required.';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(val)) return 'Please enter a valid email address.';
        return '';
      },
      phone: (val) => {
        if (!val.trim()) return 'Phone number is required.';
        const digits = val.replace(/\D/g, '');
        const numberWithoutCode = digits.startsWith('91') ? digits.slice(2) : digits;
        if (numberWithoutCode.length !== 10) return 'Phone number must be 10 digits.';
        return '';
      },
      location: (val) => {
        if (!val.trim()) return 'Location is required.';
        if (val.trim().length < 2) return 'Location must be at least 2 characters.';
        return '';
      },
      designation: (val) => {
        if (!val.trim()) return 'Current designation is required.';
        if (val.trim().length < 2) return 'Designation must be at least 2 characters.';
        return '';
      },
      jobTitle: (val) => {
        if (!val.trim()) return 'Job title is required.';
        if (val.trim().length < 2) return 'Job title must be at least 2 characters.';
        if (val.trim().length > 100) return 'Job title cannot exceed 100 characters.';
        return '';
      },
      company: (val) => {
        if (!val.trim()) return 'Company name is required.';
        if (val.trim().length < 2) return 'Company name must be at least 2 characters.';
        return '';
      },
      previousRole: (val) => {
        if (!val.trim()) return 'Previous role is required.';
        if (val.trim().length < 10) return 'Please provide more details about your previous role.';
        return '';
      },
      previousCompany: (val) => {
        if (!val.trim()) return 'Previous company is required.';
        if (val.trim().length < 2) return 'Previous company name must be at least 2 characters.';
        return '';
      },
      skills: (val) => {
        if (!val.trim()) return 'Skills are required.';
        const skillsList = val.split(',').map(skill => skill.trim());
        if (skillsList.length < 3) return 'Please list at least 3 skills, separated by commas.';
        return '';
      },
      achievements: (val) => {
        if (!val.trim()) return 'Achievements are required.';
        if (val.trim().length < 50) return 'Please provide more detailed achievements (minimum 50 characters).';
        return '';
      }
    };

    return validators[id] ? validators[id](value) : '';
  };


  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    
    // Remove +91 if present at start
    const numberWithoutCode = cleaned.startsWith('91') ? cleaned.slice(2) : cleaned;
    
    // Match 10 digits after potential country code
    const match = numberWithoutCode.match(/^(\d{5})(\d{5})$/);
    return match ? `+91 ${match[1]} ${match[2]}` : value;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let formattedValue = value;
    
    if (id === 'phone') {
      const digits = value.replace(/\D/g, '');
      formattedValue = digits.length <= 10 ? formatPhoneNumber(digits) : formData.phone;
    }

    setFormData(prev => ({
      ...prev,
      [id]: formattedValue
    }));

    const error = validateField(id, formattedValue);
    setErrors(prev => ({
      ...prev,
      [id]: error
    }));
  };

   const validateStep = () => {
    const stepFields = {
      1: ['name', 'email', 'phone', 'location', 'designation'],
      2: ['jobTitle', 'company', 'previousRole', 'previousCompany'],
      3: ['skills', 'achievements']
    };
    const fieldsToValidate = stepFields[currentStep];
    const newErrors = {};
    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(Math.min(currentStep + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };

  const handleGenerate = async () => {
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/generate-cover-letter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setGeneratedContent(data);
      setIsLoading(false);
      console.log('Cover letter generated:', data);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white text-center">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-white text-sm">Full Name</label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-white text-sm">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-white text-sm">Phone Number</label>
                <Input
                  id="phone"
                  type="tel"
                  maxLength={14}
                  placeholder="Enter your phone number"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="location" className="text-white text-sm">Location</label>
                <Input
                  id="location"
                  placeholder="Enter your current location"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="designation" className="text-white text-sm">Current Designation</label>
                <Input
                  id="designation"
                  placeholder="Enter your current designation"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500"
                  value={formData.designation}
                  onChange={handleInputChange}
                />
                {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={nextStep}
                className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center"
              >
                Next Step <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white text-center">Job Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="jobTitle" className="text-white text-sm">Job Title</label>
                <Input
                  id="jobTitle"
                  placeholder="Enter the job title you're applying for"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                />
                {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-white text-sm">Company Name</label>
                <Input
                  id="company"
                  placeholder="Enter the company name"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500"
                  value={formData.company}
                  onChange={handleInputChange}
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="previousRole" className="text-white text-sm">Previous Role</label>
                <Textarea
                  id="previousRole"
                  placeholder="Describe your previous role and responsibilities"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500 min-h-[100px]"
                  value={formData.previousRole}
                  onChange={handleInputChange}
                />
                {errors.previousRole && <p className="text-red-500 text-sm">{errors.previousRole}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="previousCompany" className="text-white text-sm">Previous Company</label>
                <Input
                  id="previousCompany"
                  placeholder="Enter your previous company name"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500"
                  value={formData.previousCompany}
                  onChange={handleInputChange}
                />
                {errors.previousCompany && <p className="text-red-500 text-sm">{errors.previousCompany}</p>}
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={prevStep}
                className="bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center"
              >
                <ChevronLeft className="mr-2" /> Previous
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center"
              >
                Next Step <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white text-center">Your Experience</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentRole" className="text-white text-sm">Current Role</label>
                <Textarea
                  id="currentRole"
                  placeholder="Describe your current role and responsibilities"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500 min-h-[100px]"
                  value={formData.currentRole}
                  onChange={handleInputChange}
                />
                {errors.currentRole && <p className="text-red-500 text-sm">{errors.currentRole}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="skills" className="text-white text-sm">Key Skills</label>
                <Input
                  id="skills"
                  placeholder="Enter your key skills (comma-separated)"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500"
                  value={formData.skills}
                  onChange={handleInputChange}
                />
                {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="achievements" className="text-white text-sm">Key Achievements</label>
                <Textarea
                  id="achievements"
                  placeholder="Describe your key achievements and accomplishments"
                  className="bg-gray-950 border-gray-700 text-white placeholder-gray-500 min-h-[100px]"
                  value={formData.achievements}
                  onChange={handleInputChange}
                />
                {errors.achievements && <p className="text-red-500 text-sm">{errors.achievements}</p>}
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={prevStep}
                className="bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center"
              >
                <ChevronLeft className="mr-2" /> Previous
              </Button>
              <Button
                type="button"
                onClick={handleGenerate}
                className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center"
                disabled={isLoading}
              >
                Generate <Check className="ml-2" />
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-gray-100 flex items-center justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-5 px-0 md:grid-cols-2">
          <div className="space-y-6 relative mt-12 lg:top-0">
            <div className="flex items-center space-x-4">
              <FileText className="h-12 w-12 text-white" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                CoverLetter Pro
              </h1>
            </div>
            <p className="text-gray-400">
              Generate a personalized, professional cover letter.
            </p>
            <div className="space-y-2">
              <div className="flex space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-10 h-2 rounded-full transition-colors ${
                      currentStep === step ? 'bg-white' : 'bg-gray-700'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-sm text-gray-500">Step {currentStep} of 3</p>
            </div>
          </div>
          {isLoading ? (
            <div className="p-6 md:p-10 space-y-6">
              <BookLoaderComponent />
            </div>
          ) : (
            <div className="bg-gradient-to-b from-gray-950 to-gray-900 rounded-lg border border-gray-700 p-6 md:p-10 space-y-6">
              <form className="space-y-4">{renderStep()}</form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
