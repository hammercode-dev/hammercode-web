import { Button } from "@/components/ui/Button";
import { useDialog } from "@/contexts";
import { Check, CreditCard, HelpCircle } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  status?: string;
  transaction_no?: string;
};

const statusIconMap: Record<string, ReactNode> = {
  paid: <Check className="h-20 w-20 text-green-500" />,
  pending: <CreditCard className="h-20 w-20 text-yellow-500" />,
};

const EventCheckStatusModal = ({ status = "", transaction_no = "" }: Props) => {
  const { closeDialog } = useDialog();

  const icon = statusIconMap[status] ?? <HelpCircle className="h-20 w-20 text-gray-400" />;

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8 text-center">
      {icon}

      <div className="space-y-1">
        <p className="text-xl font-semibold capitalize">{status || "Unknown"}</p>
        {transaction_no && (
          <p className="text-muted-foreground text-sm">
            Transaction No: <span className="font-medium">{transaction_no}</span>
          </p>
        )}
      </div>

      <Button variant="outline" onClick={closeDialog}>
        Kembali
      </Button>
    </div>
  );
};

export default EventCheckStatusModal;
