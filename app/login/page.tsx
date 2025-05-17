'use client';
import React from 'react'
import { useState } from 'react';


import Exbutton from '@/components/shared/ExButton'
import ExInput from '@/components/shared/ExInput'
import Logo from '@/components/shared/Logo'



const LoginHandler = () => {
  fetch("https://api.irxe.com/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile: "09134314289",
      password: "1234567890",
    }),
  })
  .then((response) => {
    if (!response.ok) {
        throw new Error("خطا در پاسخ سرور");
      }
      return response.json();
    })
    .then((data) => {
      console.log("موفقیت‌آمیز!", data);
    })
    .catch((error) => {
      console.error("خطا در ارسال درخواست:", error);
    });
  };
  
  function LoginPage() {

    const [data, setData] = useState({});


    return (
      <div className="min-h-screen flex items-center justify-center md:bg-gray-50 ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg md:shadow-md">
        <div className="text-center mb-6">
          <Logo  />
          <h3 className="mt-4 text-xl text-right font-bold text-gray-800">ورود | ثبت نام</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 text-right">سلام!</p>
            <p className="text-gray-600 text-right">لطفا شماره موبایل خود را وارد کنید.</p>
          </div>
          
          <ExInput 
            placeholder="شماره موبایل"
            name="phone"
            type="tel"
            logo="/images/call.png"
            className="w-full "
            data={data}
            setData={setData}
          />
          <ExInput 
            placeholder="رمز ورود"
            name="password"
            type="tel"
            
            className="w-full "
            data=""
          />
          <Exbutton
            title='ورود'
            onClick={LoginHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage