import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, ChevronRight, ChevronLeft, Check } from "lucide-react"
import { BookLoaderComponent } from '../ui/Loader'
import useFormValidation from './useFormValidation'

export default function MultiStepCoverLetterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [generatedContent, setGeneratedContent] = useState(null); // Track generated content
  
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  } = useFormValidation();

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1)); // Changed from Math.min to Math.max
  };
  
  const nextStep = () => {
    const currentFields = getCurrentStepFields(currentStep);
    const stepErrors = {};
    
    currentFields.forEach(field => {
      if (!formData[field]?.trim()) {
        stepErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
  
    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(Math.min(currentStep + 1, 3));
    }
  };

  const getCurrentStepFields = (step) => {
    switch (step) {
      case 1:
        return ['name', 'email', 'phone'];
      case 2:
        return ['jobTitle', 'company', 'jobDescription'];
      case 3:
        return ['currentRole', 'skills', 'achievements'];
      default:
        return [];
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/generate-cover-letter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setGeneratedContent(data);
      console.log('Cover letter generated:', data);
    } catch (error) {
      console.error('Error generating cover letter:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <p className="text-red-500 text-sm mt-1">{errors[fieldName]}</p>
    ) : null;
  };

  const renderStep = () => {
    switch(currentStep) {
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
                  className={`bg-gray-950 border-gray-700 text-white placeholder-gray-500 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {renderError('name')}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-white text-sm">Email Address</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email" 
                  className={`bg-gray-950 border-gray-700 text-white placeholder-gray-500 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {renderError('email')}
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-white text-sm">Phone Number</label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="Enter your phone number" 
                  className={`bg-gray-950 border-gray-700 text-white placeholder-gray-500 ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {renderError('phone')}
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
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="text-white text-sm">Job Title</label>
              <Input 
                id="jobTitle" 
                placeholder="Enter the job title" 
                className={`bg-gray-950 border-gray-700 text-white placeholder-gray-500 ${
                  errors.jobTitle ? 'border-red-500' : ''
                }`}
                value={formData.jobTitle}
                onChange={handleInputChange}
              />
              {renderError('jobTitle')}
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-white text-sm">Company Name</label>
              <Input 
                id="company" 
                placeholder="Enter the company name" 
                className={`bg-gray-950 border-gray-700 text-white placeholder-gray-500 ${
                  errors.company ? 'border-red-500' : ''
                }`}
                value={formData.company}
                onChange={handleInputChange}
              />
              {renderError('company')}
            </div>
            <div className="space-y-2">
              <label htmlFor="jobDescription" className="text-white text-sm">Job Description</label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here"
                className={`min-h-[120px] bg-gray-950 border-gray-700 text-white placeholder-gray-500 ${
                  errors.jobDescription ? 'border-red-500' : ''
                }`}
                value={formData.jobDescription}
                onChange={handleInputChange}
              />
              {renderError('jobDescription')}
            </div>
            <div className="flex justify-between">
              <Button 
                type="button" 
                onClick={prevStep} 
                variant="outline"
                className="text-black border-gray-700 flex items-center"
              >
                <ChevronLeft className="mr-2" /> Previous Step
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
            <h2 className="text-2xl font-bold text-white text-center">Professional Details</h2>
            <div className="space-y-2">
              <label htmlFor="currentRole" className="text-white text-sm">Current Role</label>
              <Input 
                id="currentRole" 
                placeholder="Enter your current job title" 
                className={`bg-gray-950 border-gray-700 text-white placeholder-gray-500 ${
                  errors.currentRole ? 'border-red-500' : ''
                }`}
                value={formData.currentRole}
                onChange={handleInputChange}
              />
              {renderError('currentRole')}
            </div>
            <div className="space-y-2">
              <label htmlFor="skills" className="text-white text-sm">Relevant Skills</label>
              <Textarea
                id="skills"
                placeholder="Highlight your key skills and experiences"
                className={`min-h-[100px] bg-gray-950 border-gray-700 text-white placeholder-gray-500 ${
                  errors.skills ? 'border-red-500' : ''
                }`}
                value={formData.skills}
                onChange={handleInputChange}
              />
              {renderError('skills')}
            </div>
            <div className="space-y-2">
              <label htmlFor="achievements" className="text-white text-sm">Key Achievements</label>
              <Textarea
                id="achievements"
                placeholder="Describe your notable professional achievements"
                className={`min-h-[100px] bg-gray-950 border-gray-700 text-white placeholder-gray-500 ${
                  errors.achievements ? 'border-red-500' : ''
                }`}
                value={formData.achievements}
                onChange={handleInputChange}
              />
              {renderError('achievements')}
            </div>
            <div className="flex justify-between">
              <Button 
                type="button" 
                onClick={prevStep} 
                variant="outline"
                className="text-black border-gray-700 flex items-center"
              >
                <ChevronLeft className="mr-2" /> Previous Step
              </Button>
              <Button 
                type="button" 
                onClick={handleGenerate}
                disabled={isSubmitting || isLoading}
                className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center"
              >
                {isLoading ? (
                  <BookLoaderComponent />
                ) : (
                  <>Generate <Check className="ml-2" /></>
                )}
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
          {/* Left Side - Description */}
          <div className="space-y-6  relative mt-12 lg:top-0">
            <div className="flex items-center space-x-4">
              <FileText className="h-12 w-12 text-white" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                CoverLetter Pro
              </h1>
            </div>
            <p className="text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Generate a personalized, professional cover letter that highlights your unique skills and perfectly matches the job you're applying for.
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

          {/* Right Side - Form */}
          {isLoading ? (
          <div className="  p-6 md:p-10 space-y-6">
            <BookLoaderComponent/>
            </div>
            ):
          <div className="bg-gradient-to-b from-gray-950 to-gray-900 rounded-lg border border-gray-700 p-6 md:p-10 space-y-6">
            <form className='space-y-4' onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
              {renderStep()}
            </form>
          </div>
}
        </div>
      </div>
    </div>
  )
}