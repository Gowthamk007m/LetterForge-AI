import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Eye, X } from "lucide-react";

const PreviewModal = ({ theme, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
    <div className="bg-gray-900 rounded-lg w-full max-h-[90vh] max-w-4xl overflow-hidden relative">
      <Button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full z-10"
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="h-[80vh] w-full">
        <iframe
          src={`/demos/${theme.id}-preview.pdf`}
          className="w-full h-full"
          title={`${theme.title} Preview`}
        />
      </div>
    </div>
  </div>
);

const ThemeCard = ({ id, title, selected, onClick, onPreview }) => (
  <div className="relative group">
    <div 
      onClick={() => onClick(id)}
      className={`
        relative cursor-pointer rounded-lg border-2 p-4 transition-all
        ${selected ? 'border-white bg-gray-800' : 'border-gray-700 bg-gray-900 hover:border-gray-500'}
      `}
    >
      <div className="aspect-[210/297] w-full bg-gray-800 rounded mb-3 overflow-hidden">
        <iframe
          src={`/demo-templates/${id}-preview.pdf#view=Fit&page=1`}
          className="w-full h-full pointer-events-none"
          title={`${title} Thumbnail`}
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
    { id: 'minimal', title: 'Minimal Clean' },
    { id: 'contemporary', title: 'Contemporary Bold' }
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
            Select a template that best represents your professional style. Click preview to see a full example of each design.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {templates.map((template) => (
              <ThemeCard
                key={template.id}
                id={template.id}
                title={template.title}
                selected={formData.theme === template.id}
                onClick={handleThemeSelect}
                onPreview={setPreviewTheme}
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
          onClose={() => setPreviewTheme(null)}
        />
      )}
    </div>
  );
};

export default ThemeSelection;