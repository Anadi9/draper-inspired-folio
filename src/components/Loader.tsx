import React from 'react';
import { Html } from '@react-three/drei';

const CanvasLoader = () => {
  return (
    <Html center>
      <div className="relative z-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>        
          </div>
        </div>
    </Html>
  );
};

export default CanvasLoader;
