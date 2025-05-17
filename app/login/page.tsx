'use client';
import React, { useState } from 'react';
import Exbutton from '@/components/shared/ExButton';
import ExInput from '@/components/shared/ExInput';
import Logo from '@/components/shared/Logo';

function LoginPage() {
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const LoginHandler = () => {
    fetch("https://api.irxe.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) throw new Error("خطا در پاسخ سرور");
      return response.json();
    })
    .then(data => console.log("موفقیت‌آمیز!", data))
    .catch(error => console.error("خطا در ارسال درخواست:", error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center md:bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg md:shadow-md">
        <div className="text-center mb-6">
          <Logo />
          <h3 className="mt-4 text-xl text-right font-bold text-gray-800">ورود | ثبت نام</h3>
        </div>
        
        <div className="space-y-4">
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
            value={formData.phone}
            onChange={handleChange}
          />
          <ExInput 
            placeholder="رمز ورود"
            name="password"
            type="password" 
            className="w-full"
            value={formData.password}
            onChange={handleChange}
          />
          <Exbutton
            title='ورود'
            onClick={LoginHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;