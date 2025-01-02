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
    jobTitle: '',
    company: '',
    jobDescription: '',
    currentRole: '',
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
      jobDescription: (val) => {
        if (!val.trim()) return 'Job description is required.';
        if (val.trim().length < 50) return 'Please provide a more detailed job description (minimum 50 characters).';
        return '';
      },
      currentRole: (val) => {
        if (!val.trim()) return 'Current role is required.';
        if (val.trim().length < 10) return 'Please provide more details about your current role.';
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
      1: ['name', 'email', 'phone'],
      2: ['jobTitle', 'company', 'jobDescription'],
      3: ['currentRole', 'skills', 'achievements']
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
                <label htmlFor="phone" className="text-white text-sm" >Phone Number</label>
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

      // Similar updates for steps 2 and 3
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
