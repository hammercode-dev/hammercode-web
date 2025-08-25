import { FileX } from "lucide-react";

export const NotFoundData = ({ message = "No data found" }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
      <FileX className="mb-4 h-12 w-12 text-gray-400" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};
