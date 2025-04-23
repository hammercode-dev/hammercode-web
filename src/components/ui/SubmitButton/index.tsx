import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-hmc-primary text-primary-foreground hover:opacity-90 active:bg-hmc-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        tertiary: "bg-tertiary text-tertiary-foreground hover:opacity-90 active:bg-tertiary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "lg:h-10 h-9 lg:px-4 px-4 lg:py-2",
        sm: "h-9 rounded-md px-3",
        lg: "lg:h-12 h-10 rounded-md lg:px-6 px-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <>
            {React.Children.map(children as React.ReactElement, (child: React.ReactElement) => {
              return React.cloneElement(child, {
                className: cn(buttonVariants({ variant, size }), className),
                children: (
                  <>
                    {loading && <Loader2 className={cn("h-4 w-4 animate-spin", children && "mr-2")} />}
                    {child.props.children}
                  </>
                ),
              });
            })}
          </>
        </Slot>
      );
    }

    return (
      <button className={cn(buttonVariants({ variant, size, className }))} disabled={loading} ref={ref} {...props}>
        <>
          {loading && <Loader2 className={cn("h-4 w-4 animate-spin", children && "mr-2")} />}
          {children}
        </>
      </button>
    );
  }
);
SubmitButton.displayName = "SubmitButton";

export { SubmitButton, buttonVariants };
