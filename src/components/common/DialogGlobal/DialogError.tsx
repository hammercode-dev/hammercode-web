import { CircleX } from "lucide-react";

interface DialogErrorProps {
  title: string;
  description: string;
}

const DialogError = ({ title, description }: DialogErrorProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-2">
      <CircleX className="h-16 w-16 text-red-500" />
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-center text-gray-500">{description}</p>
    </section>
  );
};
export default DialogError;
