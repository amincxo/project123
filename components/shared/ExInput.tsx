import React from 'react'
import Image from 'next/image'

interface MuiInputProps {
  placeholder?: string
  type?: string
  logo?: string
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ExInput = React.forwardRef<HTMLInputElement, MuiInputProps>(
  ({ placeholder, type = 'text', logo, className, ...props }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          dir='rtl'
          className="w-full p-2 border rounded pr-10 py-3" 
          {...props}
        />
        {logo && (
          <div className="absolute right-3 top-1/2 transform pl-5 -translate-y-1/2">
            <Image
              src={logo}
              alt="input logo"
              width={20}
              height={20}
              objectFit="contain"
            />
          </div>
        )}
      </div>
    )
  }
)

ExInput.displayName = 'ExInput'

export default ExInput