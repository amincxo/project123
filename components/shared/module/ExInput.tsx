'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ExInputProps {
  placeholder?: string;
  name?: string;
  type?: string;
  logo?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

const ExInput = React.forwardRef<HTMLInputElement, ExInputProps>(
  (
    {
      placeholder = '',
      type = 'text',
      logo,
      className = '',
      name,
      value = '',
      onChange,
      required = false,
      error = false,
      helperText,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
      <div className={`relative ${className}`}>
        {/* Main container */}
        <div
          className={`
            flex items-center rounded-xl border-2 p-3 transition-all
            ${error 
              ? 'border-red-500 bg-red-50' 
              : isFocused 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 bg-white'
            }
            ${logo ? 'pr-3' : ''}
          `}
        >
        
          {logo && (
            <div className="w-10 h-10 flex items-center justify-center ml-3 rounded-full">
              <Image
                src={logo}
                alt="input logo"
                width={20}
                height={20}
                style={{ objectFit: 'contain' }}
                className="w-5 h-5"
              />
            </div>
          )}

          {/* Input container with precise positioning */}
          <div className="relative flex-grow h-12">
            <input
              ref={ref}
              type={type}
              name={name}
              value={value}
              onChange={(e) => {
                onChange?.(e);
                setHasValue(!!e.target.value);
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              dir="rtl"
              className={`
                w-full h-full bg-transparent outline-none
                ${error ? 'text-red-700' : 'text-gray-800'}
                placeholder-transparent
              `}
              placeholder={placeholder}
              {...props}
            />

            {/* Floating label that replaces placeholder */}
            <label
              className={`
                absolute right-0 transition-all duration-200 pointer-events-none
                bg-white px-1 rounded
                ${error 
                  ? 'text-red-500' 
                  : isFocused 
                    ? 'text-blue-500' 
                    : 'text-gray-500'
                }
                ${
                  hasValue || isFocused
                    ? 'top-0 text-xs transform -translate-y-1/2'
                    : 'top-1/2 text-base -translate-y-1/2'
                }
              `}
              style={{
                transformOrigin: 'right center',
                ...((hasValue || isFocused) && {
                  background: error 
                    ? '#FEF2F2' 
                    : isFocused 
                      ? '#EFF6FF' 
                      : 'white'
                })
              }}
            >
              {placeholder}
              {required && <span className="text-red-500 mr-1">*</span>}
            </label>
          </div>
        </div>

        {error && helperText && (
          <p className="text-red-500 text-xs mt-2 text-right pr-1">{helperText}</p>
        )}
      </div>
    );
  }
);

ExInput.displayName = 'ExInput';

export default ExInput;