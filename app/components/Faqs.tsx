"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do I upload my wardrobe items?",
    answer:
      "To upload your wardrobe items, simply create an account and navigate to the 'My Wardrobe' section. From there, you can easily upload photos of your clothing, tag them with relevant attributes, and categorize them for easy access.",
  },
  {
    id: 2,
    question: "Are ther any subscription fees?",
    answer: "No! It's absolutely free.",
  },
  {
    id: 3,
    question: "Can I share my wardrobe with friends?",
    answer:
      "Yes, you can share your wardrobe with friends by inviting them to view your closet. You can also collaborate on outfit planning and get feedback on your style choices.",
  },
  {
    id: 4,
    question: "How does the outfit planning feature work?",
    answer:
      "The outfit planning feature allows you to create outfits from your wardrobe items. You can mix and match clothing pieces, save your favorite combinations, and even plan outfits for specific occasions or dates.",
  },
  {
    id: 5,
    question: "Is my data secure?",
    answer:
      "Absolutely! We take data security very seriously. Your wardrobe data is stored securely, and we use encryption to protect your information. You can read more about our privacy policy on our website.",
  },
];

export default function FaqComponent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="pt-6 relative">
                <dt>
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className="flex w-full items-start justify-between text-left text-gray-900 hover:text-gray-700 focus:outline-none py-2 relative z-10"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-base font-semibold leading-7 pr-8">
                      {faq.question}
                    </span>
                    <span className="flex h-7 items-center flex-shrink-0">
                      {openIndex === index ? (
                        <Minus
                          className="w-6 h-6 cursor-pointer"
                          aria-hidden="true"
                        />
                      ) : (
                        <Plus
                          className="w-6 h-6 cursor-pointer"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>
                </dt>
                {openIndex === index && (
                  <dd className="mt-2 pr-12" id={`faq-answer-${index}`}>
                    <p className="text-base leading-7 text-gray-700">
                      {faq.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
