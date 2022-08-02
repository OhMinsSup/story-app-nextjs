import React, {
  FC,
  ImgHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PlaceIcon } from '@components/ui/Icon';

export interface NcImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

const MediaContent: FC<NcImageProps> = ({
  containerClassName = '',
  alt = 'nc-imgs',
  src = '',
  className = 'object-cover w-full h-full',
  ...args
}) => {
  // const _containerRef = useRef(null);
  // let _imageEl: HTMLImageElement | null = null;

  // const [__src, set__src] = useState('');
  // const [imageLoaded, setImageLoaded] = useState(false);

  // const renderLoadingPlaceholder = () => {
  //   return (
  //     <div
  //       className={`${className} flex items-center justify-center bg-neutral-200 dark:bg-neutral-6000 text-neutral-100 dark:text-neutral-500`}
  //     >
  //       <div className="h-2/4 max-w-[50%]">
  //         <PlaceIcon />
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div
      className={`nc-NcImage ${containerClassName}`}
      data-nc-id="NcImage"
      // ref={_containerRef}
    >
      <img
        src={'/images/large1.png'}
        className={className}
        alt={alt}
        {...args}
      />
    </div>
  );
};

export default MediaContent;
