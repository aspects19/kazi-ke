import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

type ButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
};

const Button: React.FC<ButtonProps> = ({ title, handlePress, containerStyles = '', textStyles = '' }) => {
  return (
    <TouchableOpacity
      className={`bg-[#133650] my-4 rounded-xl min-h-[62px] justify-center items-center ${containerStyles}`}
      onPress={ handlePress}
      activeOpacity={0.7}
    >
      <Text className={`text-primary font-semibold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;