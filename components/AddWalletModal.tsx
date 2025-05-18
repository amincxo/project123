'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface AddWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddWalletModal = ({ isOpen, onClose, onSuccess }: AddWalletModalProps) => {
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  if (!isOpen) return null;

  const handleClose = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmClose = () => {
    setShowExitConfirm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">افزودن کیف پول جدید</h3>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          {/* اینجا فرم افزودن کیف پول قرار می‌گیرد */}
          <p className="text-gray-500">فرم افزودن کیف پول در اینجا نمایش داده می‌شود</p>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              انصراف
            </button>
            <button
              onClick={() => {
                // منطق ذخیره کیف پول
                onSuccess();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              ذخیره کیف پول
            </button>
          </div>
        </div>
        
        {/* تاییدیه خروج */}
        {showExitConfirm && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center p-6 rounded-lg">
            <div className="text-center">
              <h4 className="font-bold mb-3">آیا می‌خواهید از افزودن کیف پول انصراف دهید؟</h4>
              <p className="mb-4 text-gray-600">تغییرات ذخیره نشده از بین خواهند رفت.</p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  ادامه ویرایش
                </button>
                <button
                  onClick={handleConfirmClose}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  بله، انصراف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddWalletModal;