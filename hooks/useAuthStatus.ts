// hooks/useAuthStatus.ts
import { useQuery } from '@tanstack/react-query';

type User = {
  _id: string;
  fullName: string;
  email: string;
  // سایر فیلدهای کاربر
};

type AuthStatusResponse = {
  status: 'success' | 'error';
  status_code: number;
  user: User | null;
};

export const useAuthStatus = () => {
  return useQuery<AuthStatusResponse>({
    queryKey: ['authStatus'],
    queryFn: async () => {
      const response = await fetch('https://api.irxe.com/api/v1/authentication-status', {
        method: 'GET',
        credentials: 'include', // برای ارسال کوکی‌ها
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 دقیقه
  });
};