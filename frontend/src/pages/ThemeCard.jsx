import React, { useState, useRef } from 'react';
import { Button } from "../components/ui/button";
import { Check, ChevronLeft, Eye, X } from "lucide-react";

const ImagePreviewModal = ({ theme, onClose }) => {
  const sourceRef = useRef(null);
  const targetRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (!sourceRef.current || !targetRef.current || !containerRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio = (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(
      Math.min(e.pageX - sourceRect.left, sourceRect.width),
      0
    );
    const top = Math.max(
      Math.min(e.pageY - sourceRect.top, sourceRect.height),
      0
    );

    setOffset({
      left: left * -xRatio,
      top: top * -yRatio
    });
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
          ref={containerRef}
          className="relative overflow-hidden h-[80vh] w-full flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            ref={sourceRef}
            src={`/demo-templates/${theme.id}.png`}
            alt={theme.title}
            className="max-w-full max-h-full object-contain"
          />
          <img
            ref={targetRef}
            src={`/demo-templates/${theme.id}.png`}
            alt={theme.title}
            className="absolute transition-opacity duration-200 max-w-none"
            style={{
              left: `${offset.left}px`,
              top: `${offset.top}px`,
              opacity: isHovered ? 1 : 0,
              width: '200%',
              height: '200%'
            }}
          />
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
            src={`/demo-templates/${id}.png`}
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
    { id: 'Modern-Professional', title: 'Modern & Professional' },
    { id: 'Tech-Minimal', title: 'Sleek Tech Minimalist' },
    { id: 'Creative-Professional', title: 'Creative & Dynamic' },
    { id: 'Minimalist-Professional', title: 'Minimalist Elegance' },
    { id: 'Vintage-Professional', title: 'Vintage Sophistication' }       
  ];

  const handleThemeSelect = (themeId) => {
    setFormData(prev => ({ ...prev, theme: themeId }));
  };

  const handleGenerateClick = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="mt-9 fixed inset-0 bg-black overflow-auto lg:overflow-y-hidden">
      <div className="min-h-screen p-6 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mt-3 font-medium text-white lg:text-3xl">Choose Your Template</h2>
  
          </div>
          
          <p className="text-gray-400">
            Select a template that best represents your professional style.
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
<div className='flex  justify-between gap-3 lg:flex-row'>

            <div className="flex justify-center pt-3 lg:justify-end ">
            <Button
              onClick={onPrevStep}
              type="button"
              className="bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center"
            >
              <ChevronLeft className="mr-2" /> Back to Details
            </Button>
          </div>


          <div className="flex justify-center pt-3 lg:justify-end">
            <Button
              onClick={handleGenerateClick}
              type="button"
              className="bg-white text-black hover:bg-gray-200 transition-colors flex items-center px-8"
              disabled={isLoading || !formData.theme}
            >
              Generate  <Check className="ml-2" />
            </Button>
            </div>
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