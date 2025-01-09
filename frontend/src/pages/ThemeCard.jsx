import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft } from "lucide-react";

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

const ThemeSelection = ({ 
  formData, 
  setFormData, 
  onPrevStep, 
  onGenerate, 
  isLoading 
}) => {
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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white text-center">Choose Your Template</h2>
      <p className="text-gray-400 text-center mb-6">
        Select a template that best represents your professional style
      </p>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <ThemeCard
            key={template.id}
            id={template.id}
            title={template.title}
            selected={formData.theme === template.id}
            onClick={handleThemeSelect}
          />
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          onClick={onPrevStep}
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
};

export default ThemeSelection;