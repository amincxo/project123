"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";

const slides = [
  {
    title: "همگام با بازارهای جهانی،",
    subtitle: "همستر اینجاست!",
    description: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.",
    image: "/images/slide1.png",
  },
  {
    title: "تجربه‌ای نوین از خرید ارزی",
    subtitle: "با همستر سریع‌تر حرکت کن!",
    description: "ساده، امن و حرفه‌ای با پلتفرم همستر.",
    image: "/images/slide2.png",
  },
  {
    title: "پیش‌بینی هوشمند بازار",
    subtitle: "تحلیل‌های دقیق در دستان تو.",
    description: "از ابزارهای تحلیل ما بهره‌مند شوید.",
    image: "/images/slide3.png",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div dir="rtl" className="relative w-full bg-white py-10 px-4">
      {/* دکمه‌های قبلی و بعدی */}
      <button
        onClick={prev}
        className="absolute top-1/2 -translate-y-1/2 right-2 md:right-8 z-10 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
      >
        <ChevronRight />
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 -translate-y-1/2 left-2 md:left-8 z-10 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
      >
        <ChevronLeft />
      </button>

      {/* اسلاید */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-6 max-w-6xl mx-auto bg-gray-50 rounded-xl p-6 md:p-12">
        {/* متن */}
        <div className="w-full md:w-1/2 text-right">
          <h2 className="text-2xl md:text-4xl font-bold my-4 text-gray-800">{slides[current].title}</h2>
          <h3 className="text-xl md:text-3xl text-blue-600 font-semibold mt-2 ">{slides[current].subtitle}</h3>
          <p className="mt-4 text-gray-600 md:mt-16">{slides[current].description}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition shadow">
              ثبت‌نام
            </button>
            <button className="border border-blue-600 hover:bg-blue-50 text-blue-600 px-6 py-3 rounded-xl transition shadow">
              ثبت سفارش خرید
            </button>
          </div>
        </div>

        {/* عکس با Image کامپوننت */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={slides[current].image}
            alt="slider image"
            width={500}
            height={350}
            className="rounded-lg object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
