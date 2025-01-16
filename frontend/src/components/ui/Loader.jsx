// components/Loader.jsx
import React from 'react';
import BookLoader from '../loaders/BookLoader';
import SunspotLoader from '../loaders/SunspotLoader';

export const BookLoaderComponent = () => {
  return (
    <>
 <SunspotLoader
        gradientColors={["#6366F1", "#E0E7FF"]}
        shadowColor={"#3730A3"}
        desktopSize={"128px"}
        mobileSize={"100px"}
      />
       
    </>
  );
};

export const SunspotLoaderComponent = () => {
  return (
    <>
      <SunspotLoader
        gradientColors={["#6366F1", "#E0E7FF"]}
        shadowColor={"#3730A3"}
        desktopSize={"128px"}
        mobileSize={"100px"}
      />
    </>
  );
};
