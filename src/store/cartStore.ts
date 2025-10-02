import { create } from 'zustand';

type CartItem = { id:number; selectedColor:string; quantity:number; price:number; image:string; make:string; model:string; year:number; stockCount?: number; condition?: string };

type State = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id:number, color:string) => void;
  clearCart: () => void;
};

export const useCartStore = create<State>((set) => ({
  cart: [],
  addToCart: (item) => set((s) => {
    const exist = s.cart.find(i => i.id === item.id && i.selectedColor === item.selectedColor);
    if (exist) return { cart: s.cart.map(i => i === exist ? { ...i, quantity: i.quantity + item.quantity } : i) };
    return { cart: [...s.cart, item] };
  }),
  removeFromCart: (id, color) => set((s) => ({ cart: s.cart.filter(i => !(i.id === id && i.selectedColor === color)) })),
  clearCart: () => set({ cart: [] }),
}));
