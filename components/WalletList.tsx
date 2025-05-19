'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllWallets } from '../services/walletService';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AddWalletModal from './AddWalletModal';
import DeleteWalletModal from './DeleteWalletModal';

const WalletList = () => {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [walletToDelete, setWalletToDelete] = useState<string | null>(null);
  
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['wallets'],
    queryFn: getAllWallets,
    retry: 1
  });

  useEffect(() => {
    if (isError && (
      (error as any)?.response?.status === 401 || 
      (error as any)?.message?.includes('Unauthorized')
    )) {
      router.push('/login');
    }
  }, [isError, error, router]);

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success('آدرس با موفقیت کپی شد');
  };

  const handleDeleteClick = (walletId: string) => {
    setWalletToDelete(walletId);
  };

  const handleAddSuccess = () => {
    setShowAddModal(false);
    refetch();
    toast.success('کیف پول با موفقیت اضافه شد');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6  ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">لیست کیف پول‌ها</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          افزودن کیف پول جدید
        </button>
      </div>
      
      {data?.data.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">هنوز کیف پولی ثبت نکرده‌اید</div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            افزودن اولین کیف پول
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((wallet) => (
            <div key={wallet._id} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-gray-800">{wallet.title || 'بدون عنوان'}</h3>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {wallet.symbol}
                </span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm text-gray-500">شبکه:</p>
                  <p className="font-medium">{wallet.network}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">آدرس:</p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm text-blue-600 break-all">
                      {wallet.address}
                    </p>
                    <button 
                      onClick={() => handleCopyAddress(wallet.address)}
                      className="text-gray-500 hover:text-blue-500"
                      title="کپی آدرس"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <p className="text-xs text-gray-400">
                    {new Date(wallet.created_at).toLocaleDateString('fa-IR')}
                  </p>
                  <button
                    onClick={() => handleDeleteClick(wallet._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddWalletModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />

      {walletToDelete && (
        <DeleteWalletModal
          walletId={walletToDelete}
          onClose={() => setWalletToDelete(null)}
          onSuccess={() => {
            refetch();
            toast.success('کیف پول با موفقیت حذف شد');
          }}
        />
      )}
    </div>
  );
};

export default WalletList;