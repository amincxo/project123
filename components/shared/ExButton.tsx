import React from 'react';

interface MuiButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
}

function Exbutton({ title, className = '', onClick }: MuiButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full 
        bg-blue-700
        text-white 
        py-3 
        rounded-lg 
        border 
        border-blue-700 
        hover:bg-blue-700 
        transition-colors 
        duration-200 
        flex 
        items-center 
        justify-center
        text-lg /* اندازه فونت بزرگتر */
        font-medium /* وزن فونت */
        ${className}
      `}
    >
      {title}
    </button>
  );
}

export default Exbutton;