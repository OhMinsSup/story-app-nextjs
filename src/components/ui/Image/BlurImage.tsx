/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import type { ImageProps } from 'next/image';

interface BlurImageProps extends ImageProps {}

const baseImageConfig: ImageProps = {
  layout: 'fill',
  objectFit: 'cover',
  src: '',
  alt: 'Story Content Image',
};

const BlurImage: React.FC<BlurImageProps> = ({ ...props }) => {
  const [isLoading, setLoading] = useState(true);

  const mergedImageConfig = {
    ...baseImageConfig,
    ...props,
  };

  return (
    <Image
      className={classNames(
        'duration-700 ease-in-out group-hover:opacity-75',
        isLoading
          ? 'scale-110 blur-2xl grayscale'
          : 'scale-100 blur-0 grayscale-0',
      )}
      onLoadingComplete={() => {
        setLoading(false);
      }}
      {...mergedImageConfig}
    />
  );
};

export default BlurImage;
