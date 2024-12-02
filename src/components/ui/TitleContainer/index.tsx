import { cn } from "@/lib/utils";

type TitleBarProps = {
  children: React.ReactNode;
  className?: string;
};

const TitleContainer = ({ children, className }: TitleBarProps) => {
  return (
    <div className={cn("flex items-stretch w-fit", className)}>
      <div className="w-1 bg-primary rounded-r-xl" />
      <div className="flex items-center ml-2">{children}</div>
    </div>
  );
};

export default TitleContainer;
