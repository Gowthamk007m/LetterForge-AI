// components/Loader.jsx
import React from 'react';
import BookLoader from '../loaders/BookLoader';

export const AtomComponent = () => {
  return (
    <>
   <BookLoader   
        background={"linear-gradient(135deg, #111827, #6b7280)"}
        desktopSize={"150px"}
        mobileSize={"80px"}
        textColor={"white"}
       />
    </>
  );
};