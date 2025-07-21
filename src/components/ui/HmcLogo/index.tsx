import Image from "next/image";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconSizeVariants = cva("", {
  variants: {
    size: {
      small: "w-5 md:w-8",
      medium: "w-7 md:w-10",
      large: "w-10 md:w-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

const textSizeVariants = cva("", {
  variants: {
    size: {
      small: "w-20 sm:w-24 lg:w-28",
      medium: "w-28 sm:w-32 lg:w-40",
      large: "w-32 sm:w-36 lg:w-44",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type HmcLogoProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

const HmcLogo = ({ size, className }: HmcLogoProps) => {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/assets/icons/ic_hmc-light.svg"
        alt="HMC Light"
        width={40}
        height={40}
        className={iconSizeVariants({ size, className: "dark:hidden" })}
      />
      <Image
        src="/assets/icons/ic_hmc-dark.svg"
        alt="HMC Dark"
        width={40}
        height={40}
        className={iconSizeVariants({ size, className: "hidden dark:inline" })}
      />
      <Image
        src="/assets/icons/ic_hmc-text-light.svg"
        alt="HMC Light"
        width={160}
        height={18}
        className={textSizeVariants({ size, className: "inline dark:hidden" })}
      />
      <Image
        src="/assets/icons/ic_hmc-text-dark.svg"
        alt="HMC Dark"
        width={160}
        height={18}
        className={textSizeVariants({ size, className: "hidden dark:inline" })}
      />
    </Link>
  );
};
export default HmcLogo;
