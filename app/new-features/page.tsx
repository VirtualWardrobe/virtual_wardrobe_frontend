"use client";

import { CheckCircleIcon } from "lucide-react";

const features = [
  {
    title: "Full Frontend Rebuild with Modern Stack",
    points: [
      "Migrated to Next.js with TypeScript.",
      "Used Tailwind CSS for utility-first styling.",
    ],
  },
  {
    title: "Backend Revamp with FastAPI",
    points: [
      "Switched from Django to FastAPI for async APIs.",
      "Built as modular microservices.",
      "Used Pydantic for schema validation.",
    ],
  },
  {
    title: "Authentication & Authorization",
    points: [
      "Google OAuth login support.",
      "JWT-based secure authentication.",
      "Role-based access via Prisma enums.",
    ],
  },
  {
    title: "AI-Powered Virtual Try-On",
    points: [
      "CatVTON integration via fal.ai.",
      "Upload image and outfit to preview virtually.",
    ],
  },
  {
    title: "Wardrobe Organization & Filtering",
    points: [
      "Advanced filters for type, color, season, and category.",
      "Real-time wardrobe updates and sorting.",
      "Optimized uploads to GCP Cloud Storage.",
    ],
  },
  {
    title: "Performance & Observability",
    points: [
      "Redis caching for faster API response.",
      "Grafana Loki + Promtail for real-time logs.",
      "Structured logging for better traceability.",
    ],
  },
  {
    title: "Cloud-Native Deployment",
    points: [
      "Backend hosted on GCP Compute Engine.",
      "Neon serverless postgres with autoscaling.",
      "Static/media file handling on GCP Storage.",
    ],
  },
  {
    title: "DevOps & Scalability Enhancements",
    points: [
      "API response time improved by ~40%.",
      "Horizontal scaling enabled.",
      "Feature-first modular codebase.",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <main className="px-4 sm:px-6 py-10 sm:py-12 max-w-5xl mx-auto mt-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        🚀 What&apos;s New in v2.0
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-10">
        Virtual Wardrobe has been rebuilt from the ground up to deliver faster
        performance, AI-powered features, and a modern, cloud-native experience.
      </p>

      <div className="space-y-8 sm:space-y-10">
        {features.map((feature, idx) => (
          <section
            key={idx}
            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              {feature.title}
            </h2>
            <ul className="space-y-3 pl-1">
              {feature.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <CheckCircleIcon className="h-5 w-5 text-green-600 mt-1 flex-shrink-0 min-w-[20px]" />
                  <span className="text-sm sm:text-base">{point}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
