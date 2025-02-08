import React from 'react';
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
<div class="bg-black border-t  text-white px-4 py-3" role="alert">
  <p class="font-bold">Info</p>
  <p class="text-sm">"We're working on it! Low-tier server performance may cause a slight delay."</p>
</div>
       
    </>
  );
};

