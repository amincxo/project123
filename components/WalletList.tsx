'use client';

import { useState, useEffect } from 'react';
import { getAllWallets } from '../services/walletService';

const WalletList = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllWallets();
        if (response.status === 'success') {
          setWallets(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Wallet List</h2>
      
      {wallets.length === 0 ? (
        <p className="text-gray-500">No wallets found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wallets.map((wallet) => (
            <div 
              key={wallet._id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{wallet.title}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Symbol:</span>
                  <span className="font-medium">{wallet.symbol}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Network:</span>
                  <span className="font-medium">{wallet.network}</span>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-1">Address:</p>
                  <p className="font-mono text-sm text-blue-600 break-all p-2 bg-gray-50 rounded">
                    {wallet.address}
                  </p>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-400">
                    Created: {new Date(wallet.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletList;