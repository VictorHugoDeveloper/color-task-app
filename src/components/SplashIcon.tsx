import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface SplashIconProps {
  width?: number;
  height?: number;
}

export const SplashIcon: React.FC<SplashIconProps> = ({ width = 200, height = 200 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 200">
      {/* Círculos coloridos sobrepostos */}
      <Circle cx="100" cy="100" r="80" fill="#FF6B6B" opacity="0.8" />
      <Circle cx="85" cy="85" r="80" fill="#4ECDC4" opacity="0.8" />
      <Circle cx="115" cy="115" r="80" fill="#45B7D1" opacity="0.8" />
      
      {/* Ícone central */}
      <Path
        d="M100 60C77.9086 60 60 77.9086 60 100C60 122.091 77.9086 140 100 140C122.091 140 140 122.091 140 100C140 77.9086 122.091 60 100 60ZM100 130C83.4315 130 70 116.569 70 100C70 83.4315 83.4315 70 100 70C116.569 70 130 83.4315 130 100C130 116.569 116.569 130 100 130Z"
        fill="white"
      />
      <Circle cx="100" cy="100" r="15" fill="white" />
    </Svg>
  );
}; 