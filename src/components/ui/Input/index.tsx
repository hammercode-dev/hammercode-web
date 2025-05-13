"use client";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  classInput?: string;
  classIcon?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, classInput, classIcon, ...props }, ref) => {
    const [inputType, setInputType] = React.useState(type);
    return (
      <div
        className={cn(
          "border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center gap-2 rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-within:ring-2 focus-within:ring-offset-1 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {prefix}
        <input
          type={inputType}
          className={cn("placeholder:text-muted-foreground w-full outline-none", classInput)}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <>
            {inputType === "password" ? (
              <Eye className={classIcon} onClick={() => setInputType("text")} />
            ) : (
              <EyeOff className={classIcon} onClick={() => setInputType("password")} />
            )}
          </>
        )}
        {suffix}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
