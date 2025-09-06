"use client";

import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

type DialogSize = "sm" | "md" | "lg" | "xl" | "2xl" | "80%" | "90%";

interface DialogState {
  isOpen: boolean;
  title?: string;
  description?: string;
  content?: ReactNode;
  size?: DialogSize;
  className?: string;
  classAction?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

type DialogAction = { type: "OPEN"; payload: Omit<DialogState, "isOpen"> } | { type: "CLOSE" };

const initialState: DialogState = {
  isOpen: false,
  title: undefined,
  description: undefined,
  content: undefined,
  size: "md",
  className: "",
  classAction: "",
  onClose: undefined,
  onConfirm: undefined,
  confirmText: undefined,
  cancelText: undefined,
};

const dialogReducer = (state: DialogState, action: DialogAction): DialogState => {
  switch (action.type) {
    case "OPEN":
      return { isOpen: true, ...action.payload };
    case "CLOSE":
      return { isOpen: false };
    default:
      return state;
  }
};

const DialogContext = createContext<{
  state: DialogState;
  dispatch: Dispatch<DialogAction>;
  openDialog: (config: Omit<DialogState, "isOpen">) => void;
  closeDialog: () => void;
}>({
  state: initialState,
  dispatch: () => {},
  openDialog: () => {},
  closeDialog: () => {},
});

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dialogReducer, initialState);

  const openDialog = (config: Omit<DialogState, "isOpen">) => {
    dispatch({ type: "OPEN", payload: config });
  };

  const closeDialog = () => {
    dispatch({ type: "CLOSE" });
  };

  return (
    <DialogContext.Provider value={{ state, dispatch, openDialog, closeDialog }}>{children}</DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};
