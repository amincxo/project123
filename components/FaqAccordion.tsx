// components/FaqAccordion.tsx
import { MessageSquare } from "lucide-react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

interface CategoryGroup {
  [category: string]: FaqItem[];
}

async function getFAQs() {
  const res = await fetch(
    'https://panel.irxe.com/api/faqs?populate=*&filters[faqType][slug][$eq]=support',
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  return data.data;
}

export default async function FaqAccordion() {
  const faqs = await getFAQs();

  const grouped: CategoryGroup = faqs.reduce((acc: CategoryGroup, item: any) => {
    const category = item.faqCategory?.title || 'دسته‌بندی نشده';
    if (!acc[category]) acc[category] = [];
    item.question.forEach((q: any) => {
      acc[category].push({
        id: q.id,
        question: q.question,
        answer: q.answer,
      });
    });
    return acc;
  }, {});

  return (
    <div className="w-full px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 border border-blue-200 rounded-xl p-6 bg-blue-50">
        
        {/* باکس پشتیبانی - حالا سمت چپ و مربع‌شده */}
        <div className="bg-white border border-blue-200 rounded-xl p-4 flex flex-col justify-center text-center md:order-1 md:w-[90%] md:h-[16rem] mx-auto">
        <div>
            <h3 className="text-xs text-gray-500">سوالات متداول مربوط به</h3>
            <h2 className="text-lg font-bold text-blue-900 mt-1">وب ۳</h2>
            <p className="text-gray-600 text-xs mt-2 leading-relaxed">
            اگر هنوز هم پرسشی دارید، با کارشناسان ما تماس بگیرید.
            </p>
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg">
            پیام به پشتیبانی
        </button>
        </div>


        {/* لیست سوالات - حالا سمت راست */}
        <div className="md:col-span-2 space-y-3 md:order-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="space-y-3">
              {items.map((item) => (
                <details
                  key={item.id}
                  className="bg-white border border-blue-200 rounded-lg px-4 py-3 cursor-pointer group open:shadow-sm"
                >
                  <summary className="flex items-center justify-between text-sm md:text-base font-medium text-gray-800 list-none">
                    <span className="flex items-center gap-2">
                      <span>{item.question}</span>
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                    </span>
                    <span className="transform group-open:rotate-180 transition-transform">⌄</span>
                  </summary>
                  <div className="mt-2 text-sm text-gray-600 leading-relaxed pr-6">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
