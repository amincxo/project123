'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllWallets } from '../services/walletService';
import { useRouter } from 'next/navigation';

const WalletList = () => {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['wallets'],
    queryFn: getAllWallets,
    retry: 1,
    onError: (err) => {
      if (err.message.includes('Unauthorized')) {
        // Redirect to login if unauthorized
        router.push('/login');
      }
    },
  });
  console.log(data)
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Wallet List</h2>
      
      {data?.data.length === 0 ? (
        <p className="text-gray-500">No wallets found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((wallet) => (
            <div key={wallet._id} className="p-6 bg-white rounded-lg shadow">
              {/* ... نمایش اطلاعات کیف پول ... */}
          
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletList;