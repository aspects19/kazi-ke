import React from 'react'
import { Image } from 'react-native'
interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
}
export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }
  return (
    <Image
      src={src}
      alt={alt}
      className={`${sizeClasses[size]} rounded-full object-cover border border-gray-200`}
    />
  )
}
