"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  image: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote:
        "“An absolute game-changer for organizing my closet! I love how easy it is to manage my wardrobe with this platform. The virtual closet and outfit planning features save me so much time every morning. Highly recommend!”",
      author: "Judith Black",
      title: "CEO of Workcation",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      quote:
        "“Perfect for fashion lovers and minimalists alike!  I've streamlined my wardrobe thanks to the analytics tool. I can see what I wear most and now focus on quality over quantity. The outfit visualization feature is also a lifesaver for planning outfits quickly.”",
      author: "John Doe",
      title: "CTO of InnovateCorp",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      quote:
        "“A stylish, eco-friendly fashion platform.This site has helped me make better fashion choices. I've reduced unnecessary shopping and learned how to repurpose clothes I already own. The sustainable insights are eye-opening and incredibly useful.”",
      author: "Jane Smith",
      title: "COO at GlobalReach",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      quote:
        "“A must-have for anyone who loves fashion! The virtual closet feature is fantastic. I can easily see all my clothes and plan outfits without the hassle of trying things on. The community aspect is also great for getting inspiration from others.”",
      author: "James Carter",
      title: "Founder of StyleHub",
      image:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&h=256&w=256&q=80",
    },
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] =
    useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const intervalTime: number = 4000;
  const fadeDuration: number = 300;

  const handleDotClick = (index: number): void => {
    if (index === currentTestimonialIndex) return;

    setIsFading(true);
    setTimeout(() => {
      setCurrentTestimonialIndex(index);
      setIsFading(false);
    }, fadeDuration);
  };

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      const goToNext = (): void => {
        setIsFading(true);
        setTimeout(() => {
          setCurrentTestimonialIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
          );
          setIsFading(false);
        }, fadeDuration);
      };
      goToNext();
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime, testimonials.length]);

  const currentTestimonial: Testimonial = testimonials[currentTestimonialIndex];

  return (
    <section className="relative isolate bg-white px-6 pt-16 sm:pt-24 pb-16 sm:pb-24 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600">
          TESTIMONIALS
        </h2>
        <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          What our users say
        </p>

        <figure
          className={`mt-10 transition-opacity duration-300 ease-in-out ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <blockquote className="text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>{currentTestimonial.quote}</p>
          </blockquote>
          <figcaption className="mt-10">
            <Image
              alt={currentTestimonial.author}
              src={currentTestimonial.image}
              width={50}
              height={50}
              className="mx-auto rounded-full"
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">
                {currentTestimonial.author}
              </div>
              <svg
                width={3}
                height={3}
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="fill-gray-900"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div className="text-gray-600">{currentTestimonial.title}</div>
            </div>
          </figcaption>
        </figure>

        <div className="mt-8 flex justify-center space-x-2">
          {testimonials.map((_, index: number) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`block h-3 w-3 rounded-full transition-colors duration-200 ${
                currentTestimonialIndex === index
                  ? "bg-indigo-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </section>
  );
}
