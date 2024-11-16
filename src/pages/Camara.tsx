import React from 'react';
import Webcam from 'react-webcam';

const Camara: React.FC = () => {
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user", // Cambia a "environment" para la cámara trasera en dispositivos móviles
  };

  return (
    <div>
      <h1>Vista de la Cámara</h1>
      <Webcam
        audio={false}
        width={640}
        height={480}
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

export default Camara;
