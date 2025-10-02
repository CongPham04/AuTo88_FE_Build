import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { CheckoutPage as Checkout } from '@/components/CheckoutPage';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);

  return (
    <Checkout
      cart={cart as any[]}
      onBack={() => navigate('/cart')}
      onOrderComplete={() => {
        clearCart();
        navigate('/profile');
      }}
    />
  );
}
