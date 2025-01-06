import React from 'react';
import { Button } from "@/components/ui/button";

const PDFViewer = ({ pdfData, onClose }) => {
  if (!pdfData) return null;

  const blob = new Blob([pdfData], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const handleClose = () => {
    URL.revokeObjectURL(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Cover Letter Preview</h3>
          <Button 
            onClick={handleClose} 
            variant="ghost"
            className="hover:bg-gray-100"
          >
            Close
          </Button>
        </div>
        <div className="flex-1 p-4">
          <iframe
            src={url}
            className="w-full h-full rounded border"
            title="Cover Letter PDF"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;