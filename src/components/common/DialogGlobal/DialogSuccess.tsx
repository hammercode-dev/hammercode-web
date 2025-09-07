import { CircleCheckBig } from "lucide-react";

interface DialogSuccessProps {
  title: string;
  description: string;
}

const DialogSuccess = ({ title, description }: DialogSuccessProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-2">
      <CircleCheckBig className="h-16 w-16 text-green-500" />
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-center text-gray-500">{description}</p>
    </section>
  );
};
export default DialogSuccess;
