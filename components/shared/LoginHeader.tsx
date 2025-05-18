import React from 'react';
import Link from 'next/link';

interface ChildProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginHeader({ setIsMenuOpen }: ChildProps) {
  return (
    <div className="mb-8 flex space-x-4">
    <Link 
        href="/login" 
        className="border border-blue-600 text-blue-600 text-center rounded-lg p-2 flex-1"
        onClick={() => setIsMenuOpen(false)}
    >
        ورود
    </Link>
    <Link 
        href="/register" 
        className="text-black text-center p-2 flex-1"
        onClick={() => setIsMenuOpen(false)}
    >
        ثبت نام
    </Link>
    </div>

  );
}

export default LoginHeader;