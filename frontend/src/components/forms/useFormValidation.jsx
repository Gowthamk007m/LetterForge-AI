import { useState } from 'react';

const useFormValidation = () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (values) => {
    const errors = {};

    // Name validation
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }

    // Email validation
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }

    // Phone validation
    if (!values.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(values.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    // Job details validation
    if (!values.jobTitle.trim()) {
      errors.jobTitle = 'Job title is required';
    }
    if (!values.company.trim()) {
      errors.company = 'Company name is required';
    }
    if (!values.jobDescription.trim()) {
      errors.jobDescription = 'Job description is required';
    }

    // Professional info validation
    if (!values.currentRole.trim()) {
      errors.currentRole = 'Current role is required';
    }
    if (!values.skills.trim()) {
      errors.skills = 'Skills are required';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate all fields
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    // If no errors, proceed with submission
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log('Form submitted:', formData);
        // Add your API call here
        
        // Reset form after successful submission
        setFormData({
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
      } catch (error) {
        console.error('Submission error:', error);
      }
    }
    setIsSubmitting(false);
  };

  const nextStep = () => {
    const currentFields = getCurrentStepFields(currentStep);
    const stepErrors = {};
    
    // Validate only fields in current step
    currentFields.forEach(field => {
      const fieldErrors = validateForm({ [field]: formData[field] });
      if (fieldErrors[field]) {
        stepErrors[field] = fieldErrors[field];
      }
    });

    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep(Math.min(currentStep + 1, 3));
    } else {
      setErrors(stepErrors);
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

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    nextStep,
    prevStep
  };
};

export default useFormValidation;