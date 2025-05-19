'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useState, useEffect } from 'react';

import { useAuthStatus } from '@/hooks/useAuthStatus';



import Exbutton from '@/components/shared/module/login/ExButton';
import ExInput from '@/components/shared/module/login/ExInput';
import Logo from '@/components/shared/module/login/Logo';

interface LoginFormData {
  mobile: string;
  password: string;
}

interface LoginResponse {
  status: string;
  status_code: number;
  data: {
    _id: string;
    mobile: string;
    token: string | null;
    refresh_token: string | null;
  };
}

interface FormErrors {
  mobile?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    mobile: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);

  // استفاده از هوک موجود برای بررسی وضعیت احراز هویت
  const { data: authData, isLoading: isAuthLoading } = useAuthStatus();
  // ریدایرکت اگر کاربر قبلاً لاگین کرده باشد
  useEffect(() => {
    if (authData?.status === 'success' && authData?.data) {
      router.push('/');
    }
  }, [authData, router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'شماره موبایل الزامی است';
    } else if (!/^09\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'شماره موبایل معتبر نیست';
    }
    
    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginMutation = useMutation({
    mutationFn: async (loginData: LoginFormData): Promise<LoginResponse> => {
      const response = await fetch("https://api.irxe.com/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'ورود ناموفق بود');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      if (data.data.token) {
        setCookie('authToken', data.data.token, {
          maxAge: 60 * 60 * 24 * 7, // 1 هفته
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }
      
      if (data.data.refresh_token) {
        localStorage.setItem('refreshToken', data.data.refresh_token);
      }
      
      router.push('/');
    },
    onError: (error: Error) => {
      setApiError(error.message);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (apiError) setApiError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    if (validateForm()) {
      loginMutation.mutate(formData);
    }
  };

  // نمایش اسپینر هنگام بررسی وضعیت احراز هویت
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex bg-white items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // اگر کاربر لاگین کرده، چیزی نمایش نده (ریدایرکت در useEffect انجام می‌شود)
  if (authData?.status === 'success' && authData?.data) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-white items-center justify-center md:bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg md:shadow-md">
        <form onSubmit={handleSubmit} noValidate>
          <div className="text-center mb-6">
            <Logo />
            <h3 className="mt-4 text-xl text-right font-bold text-gray-800">ورود | ثبت نام</h3>
          </div>
          
          <div className="space-y-4">
            {apiError && (
              <div className="text-red-600 text-right p-2 bg-red-50 rounded">
                {apiError}
              </div>
            )}

            <div>
              <p className="text-gray-600 text-right">سلام!</p>
              <p className="text-gray-600 text-right">لطفا شماره موبایل خود را وارد کنید.</p>
            </div>
            
            <ExInput
              placeholder="شماره موبایل"
              name="mobile"
              type="tel"
              logo="/images/call.png"
              className="w-full"
              value={formData.mobile}
              onChange={handleChange}
              required
              error={!!errors.mobile}
              helperText={errors.mobile}
              // disabled={loginMutation.isPending}
            />

            <ExInput
              placeholder="رمز ورود"
              name="password"
              type="password"
              className="w-full"
              value={formData.password}
              onChange={handleChange}
              required
              error={!!errors.password}
              helperText={errors.password}
              // disabled={loginMutation.isPending}
            />

            <Exbutton
              title={loginMutation.isPending ? 'در حال ورود...' : 'ورود'}
              // type="submit"
              disabled={loginMutation.isPending}
              className="w-full mt-4"
              // loading={loginMutation.isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
}