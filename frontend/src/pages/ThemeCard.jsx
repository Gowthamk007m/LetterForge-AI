import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Eye, X } from "lucide-react";

const PreviewModal = ({ theme, formData, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
    <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
      <Button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full"
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">Preview: {theme.title}</h3>
        <div className="bg-white rounded-lg p-6 text-black">
          {/* Preview content based on theme */}
          <div className="space-y-4">
            <div className={`space-y-2 ${theme.id === 'modern' ? 'border-l-4 border-blue-500 pl-4' : ''}`}>
              <h1 className={`text-2xl font-bold ${theme.id === 'minimal' ? 'text-gray-800' : 'text-black'}`}>
                {formData.name}
              </h1>
              <p className="text-gray-600">{formData.designation}</p>
              <div className="flex gap-2 text-sm text-gray-500">
                <span>{formData.email}</span>
                <span>•</span>
                <span>{formData.phone}</span>
                <span>•</span>
                <span>{formData.location}</span>
              </div>
            </div>
            
            <div className={`mt-6 ${theme.id === 'creative' ? 'bg-gray-50 p-4 rounded' : ''}`}>
              <p className="text-gray-700">Dear Hiring Manager,</p>
              <p className="mt-4 text-gray-700">
                I am writing to express my strong interest in the {formData.jobTitle} position at {formData.company}...
              </p>
            </div>

            <div className={`mt-6 ${theme.id === 'classic' ? 'border-t pt-4' : ''}`}>
              <h2 className={`font-semibold ${theme.id === 'minimal' ? 'text-gray-700' : 'text-black'}`}>
                Key Skills
              </h2>
              <p className="text-gray-700 mt-2">{formData.skills}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ThemeCard = ({ id, title, selected, onClick, onPreview, formData }) => (
  <div className="relative group">
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
    <Button
      onClick={() => onPreview({ id, title })}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 hover:bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
    >
      <Eye className="h-4 w-4" /> Preview
    </Button>
  </div>
);

const ThemeSelection = ({ 
  formData, 
  setFormData, 
  onPrevStep, 
  onGenerate, 
  isLoading 
}) => {
  const [previewTheme, setPreviewTheme] = useState(null);
  
  const templates = [
    { id: 'modern', title: 'Modern Professional' },
    { id: 'classic', title: 'Classic Elegant' },
    { id: 'creative', title: 'Creative Dynamic' },
    { id: 'minimal', title: 'Minimal Clean' }
  ];

  const handleThemeSelect = (themeId) => {
    setFormData(prev => ({ ...prev, theme: themeId }));
  };

  const handleGenerate = () => {
    onGenerate(formData);
  };

  return (
    <div className="fixed inset-0 bg-black overflow-y-auto">
      <div className="min-h-screen p-6 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Choose Your Template</h2>
            <Button
              onClick={onPrevStep}
              className="bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center"
            >
              <ChevronLeft className="mr-2" /> Back to Details
            </Button>
          </div>
          
          <p className="text-gray-400">
            Select a template that best represents your professional style. Preview each option to see how your cover letter will look.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <ThemeCard
                key={template.id}
                id={template.id}
                title={template.title}
                selected={formData.theme === template.id}
                onClick={handleThemeSelect}
                onPreview={setPreviewTheme}
                formData={formData}
              />
            ))}
          </div>
          
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleGenerate}
              className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center px-8"
              disabled={isLoading || !formData.theme}
            >
              Generate Cover Letter <Check className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
      
      {previewTheme && (
        <PreviewModal
          theme={previewTheme}
          formData={formData}
          onClose={() => setPreviewTheme(null)}
        />
      )}
    </div>
  );
};

export default ThemeSelection;