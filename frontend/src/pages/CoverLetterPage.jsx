import CoverLetterForm from '@/components/forms/CoverLetterForm';
import React from 'react';
import Layout from '@/components/ui/Layout'; // Assuming Layout is your layout component

const CoverLetterPage = () => {
  return (
    <Layout>
      <div className="cover-letter-page">
        {/* Render CoverLetterForm without including Layout elements */}
        <CoverLetterForm />
      </div>
    </Layout>
  );
};

export default CoverLetterPage;
