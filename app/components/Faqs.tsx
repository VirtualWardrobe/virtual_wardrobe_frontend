"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How do you make holy water?",
    answer:
      "You boil the hell out of it. This method ensures that all impurities, both physical and metaphysical, are thoroughly removed.",
  },
  {
    id: 2,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. It's a simple, effective design that communicates a positive message instantly.",
  },
  {
    id: 3,
    question: "Why did the invisible man turn down the job offer?",
    answer:
      "He couldn't see himself doing it. It's important for one's career to have a clear vision of the role, which he unfortunately lacked.",
  },
  {
    id: 4,
    question: "Why do you never see elephants hiding in trees?",
    answer:
      "Because they're really, really good at it. Their stealth and camouflage techniques are far more advanced than we can comprehend.",
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
                        <Minus className="w-6 h-6" aria-hidden="true" />
                      ) : (
                        <Plus className="w-6 h-6" aria-hidden="true" />
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
