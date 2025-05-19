'use client';

import { ReactNode } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmText = 'بله، خارج شو',
  cancelText = 'بازگشت',
  onConfirm,
  onCancel,
  children
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center p-6">
      <div className="text-center">
        <h4 className="font-bold text-lg mb-3 text-gray-800">{title}</h4>
        <p className="mb-4 text-gray-600">{message}</p>
        
        {children && <div className="mb-4">{children}</div>}
        
        <div className="flex justify-center space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;