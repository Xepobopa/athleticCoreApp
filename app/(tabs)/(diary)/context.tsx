import { Meal } from "@/services/MacroService";
import { createContext, useContext, useState } from "react";

type DiaryContextType = {
  selectedFood: Meal[];
  setSelectedFood: (food: Meal[]) => void;
};

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export function DiaryProvider({ children }: { children: React.ReactNode }) {
  const [selectedFood, setSelectedFood] = useState<Meal[]>([]);

  return (
    <DiaryContext.Provider value={{ selectedFood, setSelectedFood }}>
      {children}
    </DiaryContext.Provider>
  );
}

export function useDiaryContext() {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiaryContext must be used within a DiaryProvider');
  }
  return context;
}