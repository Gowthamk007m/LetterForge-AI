import React from 'react';
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

const ThemeCard = ({ selected, onClick, imageUrl, title, description }) => (
  <div 
    onClick={onClick}
    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
      selected ? 'ring-2 ring-white scale-[1.02]' : 'hover:scale-[1.01]'
    }`}
  >
    <Card className="bg-gray-900 border-gray-800">
      <div className="aspect-[8.5/11] w-full relative">
        <img
          src="/api/placeholder/200/260"
          alt={`${title} theme preview`}
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
        />
        {selected && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </Card>
  </div>
);

export default function PDFThemeSelector({ selectedTheme, onThemeSelect }) {
  const themes = [
    {
      id: 1,
      title: "Professional Classic",
      description: "Traditional layout with a timeless appeal",
    },
    {
      id: 2,
      title: "Modern Minimal",
      description: "Clean design with contemporary spacing",
    },
    {
      id: 3,
      title: "Creative Bold",
      description: "Striking layout for creative industries",
    },
    {
      id: 4,
      title: "Executive Premium",
      description: "Sophisticated design for senior positions",
    },
    {
      id: 5,
      title: "Tech Forward",
      description: "Modern design for tech industry roles",
    },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Select Your Cover Letter Theme</h2>
        <p className="text-gray-400">Choose a design that matches your professional style</p>
      </div>
      
      <RadioGroup
        value={selectedTheme}
        onValueChange={(value) => onThemeSelect(parseInt(value))}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {themes.map((theme) => (
          <div key={theme.id} className="relative">
            <RadioGroupItem
              value={theme.id}
              id={`theme-${theme.id}`}
              className="sr-only"
            />
            <Label htmlFor={`theme-${theme.id}`}>
              <ThemeCard
                selected={selectedTheme === theme.id}
                onClick={() => onThemeSelect(theme.id)}
                title={theme.title}
                description={theme.description}
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}