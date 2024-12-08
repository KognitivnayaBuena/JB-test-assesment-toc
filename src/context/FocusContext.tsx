import React, { createContext, useContext, useState, ReactNode } from "react";

interface FocusContextType {
  focusedElement: string | null;
  setFocusedElement: (id: string | null) => void;
}

const FocusContext = createContext<FocusContextType | null>(null);

export const FocusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  return (
    <FocusContext.Provider value={{ focusedElement, setFocusedElement }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocusContext = (): FocusContextType => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error("useFocusContext must be used within a FocusProvider");
  }
  return context;
};
