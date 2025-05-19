'use client';

import { ChangeEvent } from 'react';

interface AddressInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validationState: 'empty' | 'validating' | 'invalid' | 'valid';
  addressError?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

const AddressInput = ({
  value,
  onChange,
  validationState,
  addressError = '',
  placeholder = '',
  label = 'آدرس کیف پول',
  required = true
}: AddressInputProps) => {
  return (
    <div>
      <label className="block text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            validationState === 'invalid' ? 'border-red-500' : 
            validationState === 'validating' ? 'border-yellow-500' : 
            validationState === 'valid' ? 'border-green-500' :
            'border-gray-300'
          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          placeholder={placeholder}
          required={required}
        />
        {validationState === 'validating' && (
          <div className="absolute left-3 top-2.5">
            <svg className="animate-spin h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        {validationState === 'valid' && (
          <div className="absolute left-3 top-2.5 text-green-500">
            ✓
          </div>
        )}
      </div>
      {validationState === 'validating' && (
        <p className="mt-1 text-sm text-yellow-500">در حال بررسی آدرس...</p>
      )}
      {validationState === 'invalid' && (
        <p className="mt-1 text-sm text-red-500">{addressError}</p>
      )}
      {validationState === 'valid' && (
        <p className="mt-1 text-sm text-green-500">آدرس معتبر است</p>
      )}
    </div>
  );
};

export default AddressInput;