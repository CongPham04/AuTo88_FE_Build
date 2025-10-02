import { create } from 'zustand';

type CompareState = {
  compareList: number[];
  addToCompare: (carId: number) => boolean;
  removeFromCompare: (carId: number) => void;
  clearCompare: () => void;
  isInCompare: (carId: number) => boolean;
};

export const useCompareStore = create<CompareState>((set, get) => ({
  compareList: [],

  addToCompare: (carId: number) => {
    const { compareList } = get();
    
    // Check if already in compare list
    if (compareList.includes(carId)) {
      return false; // Already in list
    }
    
    // Check if compare list is full (max 3 cars)
    if (compareList.length >= 3) {
      return false; // List is full
    }
    
    // Add to compare list
    set({ compareList: [...compareList, carId] });
    return true;
  },

  removeFromCompare: (carId: number) => {
    set((state) => ({
      compareList: state.compareList.filter(id => id !== carId)
    }));
  },

  clearCompare: () => {
    set({ compareList: [] });
  },

  isInCompare: (carId: number) => {
    return get().compareList.includes(carId);
  }
}));
