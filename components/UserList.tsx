'use client';

import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  created_at: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://json.xstack.ir/api/v1/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-10 text-gray-600">در حال بارگذاری کاربران...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full text-sm text-right">
          <thead className="bg-gray-100 text-gray-700 text-sm sm:text-base">
            <tr>
              <th className="px-4 py-3 hidden sm:table-cell">شناسه</th>
              <th className="px-4 py-3">نام کاربری</th>
              <th className="px-4 py-3 hidden sm:table-cell">ایمیل</th>
              <th className="px-4 py-3 hidden sm:table-cell">تأیید ایمیل</th>
              <th className="px-4 py-3">عضویت</th>
              <th className="px-4 py-3">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-4 hidden sm:table-cell">{user.id}</td>
                <td className="px-4 py-4 font-semibold text-blue-700">{user.name}</td>
                <td className="px-4 py-4 hidden sm:table-cell text-gray-600">{user.email}</td>
                <td className="px-4 py-4 hidden sm:table-cell text-green-500 text-sm">تأیید شده</td>
                <td className="px-4 py-4 text-gray-500 text-sm sm:text-base">
                  {new Date(user.created_at).toLocaleDateString('fa-IR')}
                </td>
                <td className="px-4 py-4">
                  <button className="bg-blue-500 text-white text-sm sm:text-base px-4 py-1.5 rounded-xl hover:bg-blue-600 transition">
                    مشاهده
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
