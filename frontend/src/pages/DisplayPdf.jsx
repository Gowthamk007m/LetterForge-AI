import React from 'react';
import { Download } from "lucide-react";
import { Button } from "../components/ui/button";

const PDFViewer = ({ pdfData, onClose }) => {
  if (!pdfData) return null;

  const blob = new Blob([pdfData], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const handleClose = () => {
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cover-letter.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const MobileView = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-b from-gray-500 to-gray-900 rounded-lg w-full max-w-sm p-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <h3 className="text-xl font-semibold text-white">Download Cover Letter</h3>
          <p className="text-gray-200">Download your cover letter to view it on your device</p>
          <Button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button
            onClick={handleClose}
            variant="ghost"
            className="text-white hover:bg-gray-700 w-full"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  const DesktopView = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-50">
      <div className="bg-gradient-to-b from-gray-500 to-gray-900 w-full h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Cover Letter Preview</h3>
          <div className="flex gap-2">
            <Button
              onClick={handleDownload}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-700"
            >
              Close
            </Button>
          </div>
        </div>
        <div className="flex-1 w-full">
          <iframe
            src={url}
            className="w-full h-full"
            title="Cover Letter PDF"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <MobileView />
      </div>
      <div className="hidden md:block">
        <DesktopView />
      </div>
    </>
  );
};

export default PDFViewer;