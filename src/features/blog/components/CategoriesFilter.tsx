import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface CategoryFilterProps {
  categories: string[];
  sanitizedCategory?: string;
}

export function CategoryFilter({ categories, sanitizedCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          asChild
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
            sanitizedCategory === cat
              ? "bg-hmc-base-lightblue text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          <Link href={`/blogs?category=${cat}`} prefetch={true}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Link>
        </Button>
      ))}
    </div>
  );
}
