import { createContext, useContext } from "react";

type DrawerContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const DrawerContext = createContext<DrawerContextType | undefined>(
  undefined
);

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
}
