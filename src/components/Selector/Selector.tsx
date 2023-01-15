import React, { FC, ReactNode } from 'react'

interface SelectorProps {
  options: {
    value: string;
    originalValue: string;
  }[];
  currentOption: string;
  onChange: (option: string) => void;
  icon?: ReactNode;
}

export const Selector: FC<SelectorProps> = ({ options, currentOption, onChange, icon }) => {
  return (
    <div className="flex flex-row rounded-md border-opacity-20 p-1.5 selector-border">
      {options.map(option => {
        const isSelected = option.originalValue === currentOption
        return (
          <div
            key={option.originalValue}
            onClick={() => onChange(option.originalValue)}
            className={`flex flex-row justify-center items-center px-3 py-2 cursor-pointer ${
              isSelected ? 'purple-gradient rounded' : 'hover:bg-white hover:bg-opacity-10'
            }`}
          >
            <div className={`selector-text ${isSelected ? 'text-white' : ''}`}>{option.value}</div>
          </div>
        )
      })}
      {icon && (
        <div className="flex justify-center items-center px-4">
          {icon}
        </div>
      )}
      </div>
  )
}
