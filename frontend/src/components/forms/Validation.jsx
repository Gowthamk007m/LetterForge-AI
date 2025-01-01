import React, { useState } from 'react';

const FormWithValidation = () => {
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
    let error = '';

    switch (id) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required.';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Email is required.';
        } else if (!emailRegex.test(value)) {
          error = 'Invalid email format.';
        }
        break;
      case 'phone':
        const phoneRegex = /^\d{10}$/;
        if (!value) {
          error = 'Phone number is required.';
        } else if (!phoneRegex.test(value)) {
          error = 'Phone number must be 10 digits.';
        }
        break;
      case 'jobTitle':
        if (!value.trim()) {
          error = 'Job title is required.';
        }
        break;
      case 'skills':
        if (!value.trim()) {
          error = 'Skills are required.';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));

    const error = validateField(id, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label htmlFor={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
          </label>
          <input
            type="text"
            id={key}
            value={formData[key]}
            onChange={handleInputChange}
          />
          {errors[key] && <p style={{ color: 'red' }}>{errors[key]}</p>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormWithValidation;
