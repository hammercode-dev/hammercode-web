"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { useDialog } from "@/contexts/dialogContext";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";

const sizeMap: Record<string, string> = {
  sm: "sm:max-w-[400px]",
  md: "sm:max-w-[500px]",
  lg: "sm:max-w-[700px]",
  xl: "sm:max-w-[900px]",
  "2xl": "sm:max-w-[1100px]",
  "80%": "sm:max-w-[80%]",
  "90%": "sm:max-w-[90%]",
};

const DialogGlobal = () => {
  const { state, closeDialog } = useDialog();
  return (
    <Dialog open={state.isOpen} onOpenChange={closeDialog}>
      <DialogContent className={cn(sizeMap[state.size ?? "md"], state.className)}>
        <DialogHeader>
          {state.title ? (
            <DialogTitle>{state.title}</DialogTitle>
          ) : (
            <VisuallyHidden.Root>
              <DialogTitle>Dialog</DialogTitle>
            </VisuallyHidden.Root>
          )}
          {state.description && <DialogDescription>{state.description}</DialogDescription>}
        </DialogHeader>

        {state.content}

        {(state.confirmText || state.cancelText) && (
          <DialogFooter className={state.classAction}>
            {state.cancelText && (
              <Button variant="outline" onClick={closeDialog}>
                {state.cancelText}
              </Button>
            )}
            {state.confirmText && (
              <Button
                variant="default"
                onClick={() => {
                  state.onConfirm?.();
                }}
                className="bg-hmc-base-blue hover:bg-hmc-base-blue/90 text-white"
              >
                {state.confirmText}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default DialogGlobal;
