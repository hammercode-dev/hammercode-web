import { Button } from "@/components/ui/Button";

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
  variant?: "outline" | "default" | "secondary" | "ghost";
}

const ToolbarButton = ({ onClick, isActive, disabled, children, title, variant = "outline" }: ToolbarButtonProps) => (
  <Button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    variant={isActive ? "default" : variant}
    size="sm"
    className={`h-8 w-8 p-0 ${isActive ? "bg-primary text-primary-foreground" : ""}`}
  >
    {children}
  </Button>
);

export default ToolbarButton;
