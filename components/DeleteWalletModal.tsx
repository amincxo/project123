'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface DeleteWalletModalProps {
  walletId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DeleteWalletModal = ({ walletId, onClose, onSuccess }: DeleteWalletModalProps) => {
  const router = useRouter();
  
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`https://api.irxe.com/api/modules/crypto/v1/client/deleteWallet/${walletId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('حذف کیف پول ناموفق بود');
      }
      return response.json();
    },
    onSuccess: () => {
      onSuccess();
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message);
      if (error.message.includes('Unauthorized')) {
        router.push('/login');
      }
    }
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">حذف کیف پول</h3>
        <p className="mb-6">آیا مطمئن هستید که می‌خواهید این کیف پول را حذف کنید؟ این عمل غیرقابل بازگشت است.</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            disabled={deleteMutation.isPending}
          >
            انصراف
          </button>
          <button
            onClick={() => deleteMutation.mutate()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'در حال حذف...' : 'حذف کیف پول'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWalletModal;