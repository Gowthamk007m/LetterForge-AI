import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Eye, X } from "lucide-react";

const ImagePreviewModal = ({ theme, onClose }) => {
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imageRef = useRef(null);
  const MAGNIFIER_SIZE = 200;
  const ZOOM_LEVEL = 5;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const updateMagnifier = (e) => {
    const image = imageRef.current;
    if (!image) return;

    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      setMagnifierPosition({
        x: x - MAGNIFIER_SIZE / 2,
        y: y - MAGNIFIER_SIZE / 2
      });
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-lg w-full max-w-4xl overflow-hidden relative"
        onClick={handleModalClick}
      >
        <Button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-full z-10"
          type="button"
        >
          <X className="h-4 w-4" />
        </Button>

        <div 
          ref={imageRef}
          className="h-[80vh] w-full flex items-center justify-center relative cursor-zoom-in"
          onMouseMove={updateMagnifier}
          onMouseEnter={() => setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
        >
          <img
            src={`/demo-templates/${theme.id}.jpg`}
            alt={theme.title}
            className="max-w-full max-h-full object-contain"
          />
          
          {showMagnifier && (
            <div
              className="absolute pointer-events-none rounded-full border-2 border-white overflow-hidden"
              style={{
                width: `${MAGNIFIER_SIZE}px`,
                height: `${MAGNIFIER_SIZE}px`,
                left: `${magnifierPosition.x}px`,
                top: `${magnifierPosition.y}px`,
                boxShadow: '0 0 10px rgba(0,0,0,0.3)'
              }}
            >
              <img
                src={`/demo-templates/${theme.id}.jpg`}
                alt={theme.title}
                className="absolute"
                style={{
                  transform: `scale(${ZOOM_LEVEL})`,
                  transformOrigin: `${(magnifierPosition.x + MAGNIFIER_SIZE / 2) * ZOOM_LEVEL}px ${(magnifierPosition.y + MAGNIFIER_SIZE / 2) * ZOOM_LEVEL}px`,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ThemeCard = ({ id, title, selected, onClick, onPreview }) => {
  const handlePreviewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onPreview({ id, title });
  };

  return (
    <div className="relative group">
      <div 
        onClick={() => onClick(id)}
        className={`
          relative cursor-pointer rounded-lg border-2 p-4 transition-all
          ${selected ? 'border-white bg-gray-800' : 'border-gray-700 bg-gray-900 hover:border-gray-500'}
        `}
      >
        <div className="aspect-[210/297] w-full bg-gray-800 rounded mb-3 overflow-hidden">
          <img
            src={`/demo-templates/${id}-thumb.jpg`}
            alt={title}
            className="w-full h-full object-cover"
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
        onClick={handlePreviewClick}
        type="button"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 hover:bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
      >
        <Eye className="h-4 w-4" /> Preview
      </Button>
    </div>
  );
};

const ThemeSelection = ({ 
  formData, 
  setFormData, 
  onPrevStep, 
  onGenerate, 
  isLoading 
}) => {
  const [previewTheme, setPreviewTheme] = useState(null);
  
  const templates = [
    { id: 'Modern-Professional', title: 'Modern Professional' },
    { id: 'Tech-Minimal', title: 'Tech Minimal' },
    { id: 'Creative-Professional', title: 'Creative Professional' },
    { id: 'Minimalist-Professional', title: 'Minimalist Professional' },
    { id: 'Vintage-Professional', title: 'Vintage Professional' }    
  ];

  const handleThemeSelect = (themeId) => {
    setFormData(prev => ({ ...prev, theme: themeId }));
  };

  const handleGenerateClick = (e) => {
    e.preventDefault();
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
              type="button"
              className="bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center"
            >
              <ChevronLeft className="mr-2" /> Back to Details
            </Button>
          </div>
          
          <p className="text-gray-400">
            Select a template that best represents your professional style. Click preview to see details.
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
              onClick={handleGenerateClick}
              type="button"
              className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center px-8"
              disabled={isLoading || !formData.theme}
            >
              Generate Cover Letter <Check className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
      
      {previewTheme && (
        <ImagePreviewModal
          theme={previewTheme}
          onClose={() => setPreviewTheme(null)}
        />
      )}
    </div>
  );
};

export default ThemeSelection;