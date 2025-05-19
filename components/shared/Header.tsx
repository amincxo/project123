'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import Logo from './module/login/Logo';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { data: authData, isLoading, isError, error } = useAuthStatus();

  useEffect(() => {
    setIsClient(true); 

  }, [isError, error, router, authData]);

  if (pathname === '/login') return null;

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  // حالت لودینگ برای SSR
  if (!isClient) {
    return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Logo
              containerClassName="w-36"
              imageProps={{ width: 600, height: 600, priority: true }}
            />
          </Link>
          <button className="md:hidden z-50">
            <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className={`bg-white shadow-md sticky top-0 z-50 ${
        mobileOpen ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'
      } transition-all duration-300`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="z-50">
            <Logo
              containerClassName="w-36"
              imageProps={{ width: 600, height: 600, priority: true }}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 rtl:space-x-reverse">
            <Link href="/prices" className="text-black hover:text-blue-600 transition-colors">قیمت لحظه‌ای</Link>
            <Link href="/trade" className="text-black hover:text-blue-600 transition-colors">معامله</Link>
            <Link href="/about" className="text-black hover:text-blue-600 transition-colors">درباره ما</Link>
            <Link href="/support" className="text-black hover:text-blue-600 transition-colors">پشتیبانی</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4 rtl:space-x-reverse">
            {isLoading ? (
              <span className="text-sm text-gray-500">در حال بررسی ورود...</span>
            ) : isError ? (
              <>
                <Link href="/login" className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  ورود
                </Link>
                <Link href="/register" className="text-black hover:text-gray-700 transition-colors">
                  ثبت‌نام
                </Link>
              </>
            ) : (
              <div className="relative group">
                <button className="text-black font-medium hover:text-blue-600 transition-colors">
                  {authData?.data?.full_name || 'کاربر'}
                </button>
                <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-md p-3 w-48 hidden group-hover:block z-50">
                  <Link href="/account" className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">حساب کاربری</Link>
                  <Link href="/wallet" className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">کیف پول</Link>
                  <Link href="/orders" className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">سفارشات</Link>
                  <Link href="/support" className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">پشتیبانی</Link>
                  <Link href="/logout" className="block py-2 text-sm text-red-500 hover:text-red-600 transition-colors">خروج</Link>
                </div>
              </div>
            )}
          </div>

          <button
            className="md:hidden z-50"
            onClick={toggleMobileMenu}
            aria-label={mobileOpen ? "بستن منو" : "باز کردن منو"}
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isClient && (
        <div className={`fixed md:hidden inset-0 z-40 bg-white transition-all duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className={`absolute top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex justify-between items-center p-4 border-b">
              <Link href="/" onClick={toggleMobileMenu}>
                <Logo
                  containerClassName="w-32"
                  imageProps={{ width: 600, height: 600, priority: true }}
                />
              </Link>
              
              <button
                className="text-gray-800"
                onClick={toggleMobileMenu}
                aria-label="بستن منو"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <Link href="/prices" className="block py-3 text-black border-b hover:text-blue-600 transition-colors" onClick={toggleMobileMenu}>قیمت لحظه‌ای</Link>
              <Link href="/trade" className="block py-3 text-black border-b hover:text-blue-600 transition-colors" onClick={toggleMobileMenu}>معامله</Link>
              <Link href="/about" className="block py-3 text-black border-b hover:text-blue-600 transition-colors" onClick={toggleMobileMenu}>درباره ما</Link>
              <Link href="/support" className="block py-3 text-black border-b hover:text-blue-600 transition-colors" onClick={toggleMobileMenu}>پشتیبانی</Link>

              {isLoading ? (
                <span className="block py-3 text-gray-500 text-sm">در حال بررسی ورود...</span>
              ) : isError ? (
                <>
                  <Link href="/login" className="block py-3 text-blue-600 border-b hover:bg-blue-50 transition-colors" onClick={toggleMobileMenu}>ورود</Link>
                  <Link href="/register" className="block py-3 text-black hover:text-gray-700 transition-colors" onClick={toggleMobileMenu}>ثبت‌نام</Link>
                </>
              ) : (
                <>
                  <div className="block py-3 font-semibold text-black border-b">{authData?.data?.full_name || 'کاربر'}</div>
                  <Link href="/account" className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMobileMenu}>حساب کاربری</Link>
                  <Link href="/wallet" className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMobileMenu}>کیف پول</Link>
                  <Link href="/orders" className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMobileMenu}>سفارشات</Link>
                  <Link href="/support" className="block py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMobileMenu}>پشتیبانی</Link>
                  <Link href="/logout" className="block py-2 text-sm text-red-500 hover:text-red-600 transition-colors" onClick={toggleMobileMenu}>خروج</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}