import { Button } from "@/components/ui/Button";
import { useDialog } from "@/contexts";
import { Check, CreditCard, HelpCircle, X, AlertCircle, RefreshCcw } from "lucide-react";
import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  status?: string;
  transaction_no?: string;
  onRefresh?: () => void;
};

type StatusConfig = {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  action: "close" | "refresh" | "none";
  autoClose?: number;
};

const statusConfigMap: Record<string, StatusConfig> = {
  PAID: {
    icon: <Check className="h-16 w-16" />,
    title: "Payment Successful!",
    description: "Your payment has been confirmed. You're all set for the event!",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800",
    action: "close",
    autoClose: 3000,
  },
  PENDING: {
    icon: <CreditCard className="h-16 w-16" />,
    title: "Payment Pending",
    description: "Your payment is still being processed. Please wait a moment and check again.",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    textColor: "text-yellow-600 dark:text-yellow-500",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    action: "refresh",
  },
  FAILED: {
    icon: <X className="h-16 w-16" />,
    title: "Payment Failed",
    description: "Your payment could not be processed. Please try again or contact support.",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    textColor: "text-red-600 dark:text-red-400",
    borderColor: "border-red-200 dark:border-red-800",
    action: "close",
  },
  EXPIRED: {
    icon: <AlertCircle className="h-16 w-16" />,
    title: "Payment Expired",
    description: "Your payment link has expired. Please register again to get a new payment link.",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    textColor: "text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-200 dark:border-orange-800",
    action: "close",
  },
};

const EventCheckStatusModal = ({ status = "", transaction_no = "", onRefresh }: Props) => {
  const { closeDialog } = useDialog();

  const config =
    statusConfigMap[status.toUpperCase()] ||
    ({
      icon: <HelpCircle className="h-16 w-16" />,
      title: "Unknown Status",
      description: "We couldn't determine the payment status. Please try again later.",
      bgColor: "bg-gray-50 dark:bg-gray-950/20",
      textColor: "text-gray-600 dark:text-gray-400",
      borderColor: "border-gray-200 dark:border-gray-800",
      action: "close",
    } as StatusConfig);

  const handleAction = () => {
    if (config.action === "refresh" && onRefresh) {
      onRefresh();
    } else {
      closeDialog();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
        className={cn(
          "flex items-center justify-center rounded-full p-6",
          config.bgColor,
          config.borderColor,
          "border-2"
        )}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={config.textColor}
        >
          {config.icon}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-2"
      >
        <h3 className="text-xl font-bold">{config.title}</h3>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm">{config.description}</p>

        {transaction_no && (
          <div className={cn("mt-4 rounded-lg border p-3", config.borderColor, config.bgColor)}>
            <p className="text-xs text-gray-500 dark:text-gray-400">Transaction Number</p>
            <p className={cn("font-mono text-sm font-semibold", config.textColor)}>{transaction_no}</p>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="flex w-full gap-3"
      >
        {config.action === "refresh" && (
          <Button variant="outline" className="flex-1" onClick={handleAction}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Check Again
          </Button>
        )}
        <Button
          variant={status.toUpperCase() === "PAID" ? "default" : "outline"}
          className={cn("flex-1", status.toUpperCase() === "PAID" && "bg-green-600 hover:bg-green-700")}
          onClick={() => closeDialog()}
        >
          {status.toUpperCase() === "PAID" ? "Great!" : "Close"}
        </Button>
      </motion.div>
    </div>
  );
};

export default EventCheckStatusModal;
