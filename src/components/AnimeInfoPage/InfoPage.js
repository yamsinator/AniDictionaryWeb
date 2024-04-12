import React from "react";
import { useParams } from 'react-router-dom';

const InfoPage = () => {
  const { title } = useParams();

  // Use the `title` parameter to fetch specific information
  return (
    <div>
      <h1>{title}</h1>
      {/* Display anime information based on `title` */}
    </div>
  );
};

export default InfoPage; 
