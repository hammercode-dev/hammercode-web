import { cn } from "@/lib/utils";

type TitleBarProps = {
  children: React.ReactNode;
  className?: string;
};

const TitleContainer = ({ children, className }: TitleBarProps) => {
  return (
    <div className={cn("flex w-fit items-stretch", className)}>
      <div className="bg-primary w-1 rounded-r-xl" />
      <div className="ml-2 flex items-center">{children}</div>
    </div>
  );
};

export default TitleContainer;
