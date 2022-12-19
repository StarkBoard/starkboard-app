import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'

type Props = ImageProps & {
  className?: string;
  alt?: string;
  mockImg?: string;
  secondSrc?: string;
};

export const NextImage = ({
  className, alt = '', src, mockImg, secondSrc = '', ...props
}: Props) => {
  const [imageError, setImageError] = useState(false)
  const [secondImageError, setSecondImageError] = useState(false)
  return (
    <div className={`${className || ''} relative cursor-pointer h-full w-full`}>
      <Image
        layout="fill"
        alt={alt}
        loading="lazy"
        objectFit="contain"
        src={imageError && mockImg ? secondImageError || !secondSrc ? mockImg : secondSrc : src}
        onError={() => (imageError ? setSecondImageError(true) : setImageError(true))}
        onEmptied={() => (imageError ? setSecondImageError(true) : setImageError(true))}
        onLoadingComplete={(result) => {
          if (result.naturalWidth === 0) imageError ? setSecondImageError(true) : setImageError(true)
        }}
        {...props}
      />
    </div>
  )
}
