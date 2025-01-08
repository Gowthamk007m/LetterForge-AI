import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ChevronRight, ChevronLeft, Check,Wand2,Eye } from "lucide-react";
import { BookLoaderComponent } from '../ui/Loader';
import PDFViewer from '@/pages/DisplayPdf';


const ThemeCard = ({ id, title, selected, onClick }) => (
  <div 
    onClick={() => onClick(id)}
    className={`
      relative cursor-pointer rounded-lg border-2 p-4 transition-all
      ${selected ? 'border-white bg-gray-800' : 'border-gray-700 bg-gray-900 hover:border-gray-500'}
    `}
  >
    <div className="aspect-[210/297] w-full bg-gray-800 rounded mb-3">
      <img 
        src={`/api/placeholder/210/297`} 
        alt={`Template ${id}`}
        className="w-full h-full object-cover rounded"
      />
    </div>
    <p className="text-white text-center">{title}</p>
    {selected && (
      <div className="absolute -top-2 -right-2 bg-white rounded-full p-1">
        <Check className="h-4 w-4 text-black" />
      </div>
    )}
  </div>
);



export default function MultiStepCoverLetterForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [showPDF, setShowPDF] = useState(false);
  


  const templates = [
    { id: 'modern', title: 'Modern Professional' },
    { id: 'classic', title: 'Classic Elegant' },
    { id: 'creative', title: 'Creative Dynamic' },
    { id: 'minimal', title: 'Minimal Clean' }
  ];

  const PREFILL_DATA = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '9876543212',
    location: 'New York, NY',
    designation: 'Senior Software Engineer',
    jobTitle: 'Lead Software Engineer',
    company: 'Tech Innovations Inc',
    previousRole: 'Software Engineer',
    previousCompany: 'Digital Solutions Corp',
    skills: 'React, Node.js, AWS, Python, Team Leadership, Agile Methodologies',
    achievements: 'Successfully delivered 3 major projects ahead of schedule, reducing infrastructure costs by 30%. Implemented automated testing framework that improved code coverage from 65% to 95%.'
  };


  const handlePrefill = () => {
    setFormData(PREFILL_DATA);
    setErrors({});
  };

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
    achievements: '',
    theme:''
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
        if (!val.trim()) return ' Designation is required.';
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
        if (val.trim().length > 200) return 'Achievements must be concise (maximum 200 characters).';
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
      3: ['skills', 'achievements'],
      4: ['theme']
    };
    const fieldsToValidate = stepFields[currentStep];
    const newErrors = {};
    fieldsToValidate.forEach((field) => {
      if (field === 'theme' && !formData.theme) {
        newErrors.theme = 'Please select a template';
      } else {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(Math.min(currentStep + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
  };




  const handleGenerate = async () => {
    if (!validateStep()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const pdfBlob = await response.blob();
      setPdfData(pdfBlob);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating cover letter:', error);
      setIsLoading(false);
    }
  };

const renderPDFButton = () => {
    if (pdfData) {
      return (
        <div className="absolute bottom-4 right-4">
          <Button
            onClick={() => setShowPDF(true)}
            className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View Cover Letter
          </Button>
        </div>
      );
    }
    return null;
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
                <label htmlFor="designation" className="text-white text-sm"> Designation</label>
                <Input
                  id="designation"
                  placeholder="Enter your designation"
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
       
            <div className="space-y-4">
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
                onClick={nextStep}
                className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center"
              >
                Next Step <ChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        );
        case 4:
          return (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white text-center">Choose Your Template</h2>
              <p className="text-gray-400 text-center mb-6">Select a template that best represents your professional style</p>
              <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                  <ThemeCard
                    key={template.id}
                    id={template.id}
                    title={template.title}
                    selected={formData.theme === template.id}
                    onClick={(id) => setFormData(prev => ({ ...prev, theme: id }))}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-6">
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
                  disabled={isLoading || !formData.theme}
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
              <Button
                onClick={handlePrefill}
                className="bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <Wand2 className="h-4 w-4" />
                Prefill for Testing
              </Button>
          </div>
          
          {isLoading ? (
  <div className="p-6 md:p-10 space-y-6">
    <BookLoaderComponent />
  </div>
) : (
  <div className="bg-gradient-to-b from-gray-950 to-gray-900 rounded-lg border border-gray-700 p-6 md:p-10 space-y-6 relative">
    {pdfData ? (
      <div className="flex flex-col items-center justify-center space-y-4 min-h-[400px]">
        <div className="text-center space-y-2">
          <FileText className="h-16 w-16 text-white mx-auto" />
          <h3 className="text-xl font-semibold text-white">Cover Letter Generated!</h3>
          <p className="text-gray-400">Your cover letter is ready to view</p>
        </div>
        <Button
          onClick={() => setShowPDF(true)}
          className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View Cover Letter
        </Button>
      </div>
    ) : (
      <form className="space-y-4">{renderStep()}</form>
    )}
  </div>
)}
        </div>
      </div>
      {showPDF && <PDFViewer pdfData={pdfData} onClose={() => setShowPDF(false)} />}
    </div>
  );
}
