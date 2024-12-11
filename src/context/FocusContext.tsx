import React, { createContext, useContext, useState, ReactNode } from "react";

interface FocusContextType {
  focusedElementPath: string | null;
  setFocusedElementPath: (id: string | null) => void;
}

const FocusContext = createContext<FocusContextType | null>(null);

export const FocusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [focusedElementPath, setFocusedElementPath] = useState<string | null>(null);

  return (
    <FocusContext.Provider value={{ focusedElementPath, setFocusedElementPath }}>
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
