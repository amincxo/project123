'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './module/Logo';
import LoginHeader from './LoginHeader';

interface MegaMenu {
  id: number;
  menuName: string;
  url: string;
  symbol: Array<{
    id: number;
    symbol: string;
  }>;
}

function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [megaMenus, setMegaMenus] = useState<MegaMenu[]>([]);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  // عدم نمایش هدر در صفحه لاگین
  useEffect(() => {
    const fetchMegaMenus = async () => {
      try {
        const response = await fetch('https://panel.irxe.com/api/mega-menus?populate=*');
        const data = await response.json();
        setMegaMenus(data.data.map((item: {id: number , menuName: string , url: string , symbol: string}) => ({
          id: item.id,
          menuName: item.menuName,
          url: item.url,
          symbol: item.symbol || []
        })));
      } catch (error) {
        console.error('Error fetching mega menus:', error);
      }
    };

    fetchMegaMenus();
  }, []);

 if (pathname === '/login') return null;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMegaMenu = () => setIsMegaMenuOpen(!isMegaMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* لوگو */}
          <Link href="/" className="z-50">
          <Logo 
            containerClassName="mx-auto w-40 h-auto mb-2"
            imageProps={{
                width: 600,
                height: 600,
                priority: true
            }}
            />
          </Link>

          {/* منوی دسکتاپ */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {/* مگامنو قیمت لحظه‌ای */}
            <div className="relative">
              <button 
                onClick={toggleMegaMenu}
                className="text-black hover:text-blue-600 flex items-center"
              >
                قیمت لحظه‌ای
                <svg 
                  className={`w-4 h-4 mr-1 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* محتوای مگامنو */}
              <div 
                className={`absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 transition-all duration-300 ${isMegaMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
              >
                <h4 className="font-bold text-gray-800 mb-2">ارزهای دیجیتال</h4>
                <div className="grid grid-cols-2 gap-2">
                  {megaMenus.map((menu) => (
                    <div key={menu.id} className="mb-3">
                      <Link 
                        href={menu.url} 
                        className="font-medium text-blue-600 hover:text-blue-800 block mb-1"
                      >
                        {menu.menuName}
                      </Link>
                      <div className="flex flex-wrap gap-1">
                        {menu.symbol.map((sym) => (
                          <span 
                            key={sym.id}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            {sym.symbol}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* سایر منوها */}
            <Link href="/trade" className="text-black hover:text-blue-600">معامله</Link>
            <Link href="/about" className="text-black hover:text-blue-600">درباره ما</Link>
            <Link href="/support" className="text-black hover:text-blue-600">پشتیبانی</Link>
          </nav>

          {/* دکمه‌های ورود و ثبت نام */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Link 
              href="/login" 
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              ورود
            </Link>
            <Link 
              href="/register" 
              className="text-black hover:text-gray-700 transition-colors"
            >
              ثبت نام
            </Link>
          </div>

          {/* دکمه همبرگر برای موبایل */}
          <button 
            className="md:hidden z-50 p-2"
            onClick={toggleMenu}
            aria-label="منو"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="w-6 flex flex-col items-end space-y-1.5">
                <span className="h-0.5 bg-gray-800 rounded-full w-6"></span>
                <span className="h-0.5 bg-gray-800 rounded-full w-5"></span>
                <span className="h-0.5 bg-gray-800 rounded-full w-4"></span>
              </div>
            )}
          </button>
        </div>

        {/* منوی موبایل (از راست باز می‌شود و نصف صفحه را می‌گیرد) */}
        {isMenuOpen && (
          <div className="fixed inset-y-0 right-0 w-1/2 bg-white z-40 shadow-lg">
            <div className="flex flex-col h-full pt-20 px-4">
              {/* دکمه بستن */}
              <button 
                onClick={toggleMenu}
                className="absolute top-4 right-4 p-2"
                aria-label="بستن منو"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* مگامنو در موبایل */}
              <div className="py-4 border-b border-gray-200">
                <button 
                  onClick={toggleMegaMenu}
                  className="flex justify-between items-center w-full text-lg text-black"
                >
                  <span>قیمت لحظه‌ای</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* محتوای مگامنو در موبایل */}
                <div className={`overflow-hidden transition-all duration-300 ${isMegaMenuOpen ? 'max-h-96 pt-3' : 'max-h-0'}`}>
                  {megaMenus.map((menu) => (
                    <div key={menu.id} className="mb-4 pl-4">
                      <Link 
                        href={menu.url} 
                        className="block text-gray-700 mb-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {menu.menuName}
                      </Link>
                      <div className="flex flex-wrap gap-2">
                        {menu.symbol.map((sym) => (
                          <span 
                            key={sym.id}
                            className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded"
                          >
                            {sym.symbol}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* سایر منوها */}
              <Link 
                href="/trade" 
                className="py-4 border-b border-gray-200 text-lg text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                معامله
              </Link>
              <Link 
                href="/about" 
                className="py-4 border-b border-gray-200 text-lg text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                درباره ما
              </Link>
              <Link 
                href="/support" 
                className="py-4 border-b border-gray-200 text-lg text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                پشتیبانی
              </Link>

              {/* دکمه‌های ورود و ثبت نام */}
              <LoginHeader setIsMenuOpen={setIsMenuOpen} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header