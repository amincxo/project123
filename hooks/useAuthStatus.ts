// hooks/useAuthStatus.ts
import { useQuery } from '@tanstack/react-query';

export const useAuthStatus = () =>
  useQuery({
    queryKey: ['authStatus'],
    queryFn: async () => {
      const res = await fetch('https://api.irxe.com/api/v1/authentication-status', {
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Unauthorized');
      }
      return res.json();
    },
    retry: false,
  });
