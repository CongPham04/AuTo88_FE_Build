import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { CartPage as Cart } from '@/components/CartPage';

export default function CartPage() {
  const navigate = useNavigate();
  const cart = useCartStore((s) => s.cart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <Cart
      cart={cart as any[]}
      onRemoveFromCart={(id, color) => removeFromCart(id, color)}
      onUpdateQuantity={(id, color, quantity) => {
        const existing = cart.find((i) => i.id === id && i.selectedColor === color);
        if (existing) addToCart({ ...existing, quantity: Math.max(1, quantity) });
      }}
      onCheckout={() => navigate('/checkout')}
    />
  );
}
