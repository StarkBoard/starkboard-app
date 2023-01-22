import React, { FC } from 'react'

export interface DateButtonProps {
  value: {
    value: string;
    originalValue: string;
  };
  isSelected: boolean;
  onClick: (value: string) => void;
}

export const DateButton: FC<DateButtonProps> = ({ value, isSelected, onClick }) => {
  return (
    <div
      key={value.value}
      onClick={() => onClick(value.originalValue)}
      className={`flex flex-row justify-center items-center px-2.5 py-1 cursor-pointer rounded ${
        isSelected ? 'bg-slate-50 rounded' : 'data-button-not-selected'
      }`}
    >
      <div className={`selector-text font-bold ${isSelected ? 'text-black' : 'text-white'}`}>{value.value}</div>
    </div>
  )
}
