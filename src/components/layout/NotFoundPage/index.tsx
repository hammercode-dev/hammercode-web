"use client";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <Image
        src="/assets/images/illustrations/404.svg"
        alt="not-found"
        width={320}
        height={320}
        className="h-86 w-86 object-contain"
      />
      <div className="space-y-4">
        <h1 className="text-hmc-base-darkblue text-2xl font-bold tracking-tight lg:text-4xl">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-lg">Oops! The page you're looking for doesn't exist.</p>
        <div className="pt-4">
          <Link
            href="/"
            className="bg-hmc-base-darkblue hover:bg-hmc-darkblue-blue/90 cursor-pointer rounded-lg p-3 text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFoundPage;
