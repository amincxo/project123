import React from 'react';
import Link from 'next/link';

interface ChildProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginHeader({ setIsMenuOpen }: ChildProps) {
  return (
    <div className="mt-auto mb-8 lg:m-6 space-y-3 lg:space-y-6">
      <Link 
        href="/login" 
        className="block border border-blue-600 text-blue-600 text-center py-2 rounded-lg"
        onClick={() => setIsMenuOpen(false)}
      >
        ورود
      </Link>
      <Link 
        href="/register" 
        className="block text-black text-center py-2"
        onClick={() => setIsMenuOpen(false)}
      >
        ثبت نام
      </Link>
    </div>
  );
}

export default LoginHeader;