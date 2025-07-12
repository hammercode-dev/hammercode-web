"use client";

import { useRouter } from "next/navigation";

interface CategoryFilterProps {
  categories: string[];
  sanitizedCategory?: string;
}

export function CategoryFilter({ categories, sanitizedCategory }: CategoryFilterProps) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => router.push(`/blogs?category=${cat}`)}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            sanitizedCategory === cat
              ? "bg-hmc-base-lightblue text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}
