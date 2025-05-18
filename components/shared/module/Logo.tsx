import React from 'react';
import Image, { ImageProps } from 'next/image';

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'custom';

interface LogoProps {
  size?: Size;
  containerClassName?: string;
  imageProps?: Partial<ImageProps>;
}

const sizeMap: Record<Size, { container: string; image: Partial<ImageProps> }> = {
  sm: {
    container: 'mx-auto w-24 h-auto mb-10',
    image: { width: 300, height: 300 }
  },
  md: {
    container: 'mx-auto w-32 h-auto mb-15',
    image: { width: 500, height: 500 }
  },
  lg: {
    container: 'mx-auto w-40 h-auto mb-20',
    image: { width: 600, height: 600 }
  },
  xl: {
    container: 'mx-auto w-48 h-auto mb-25',
    image: { width: 800, height: 800 }
  },
  custom: {
    container: '',
    image: {}
  }
};

function Logo({ 
  size = 'md',
  containerClassName,
  imageProps = {}
}: LogoProps) {
  const selectedSize = sizeMap[size];
  
  return (
    <div className={containerClassName || selectedSize.container}>
      <Image 
        src="/images/iranExchaneLogo.png" 
        alt="لوگو سایت"
        {...selectedSize.image}
        {...imageProps}
      />
    </div>
  );
}

export default Logo;