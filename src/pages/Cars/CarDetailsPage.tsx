import { useParams, useNavigate } from 'react-router-dom';
import { mockCars } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';
import { useCompareStore } from '@/store/compareStore';
import { CarDetailsPage as CarDetails } from '@/components/CarDetailsPage';
import { toast } from 'sonner';

export default function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((s) => s.addToCart);
  const { addToCompare } = useCompareStore();

  const carId = Number(id);
  const car = mockCars.find((c) => c.id === carId);
  if (!car) return null;

  const handleAddToCompare = (carId: number) => {
    const success = addToCompare(carId);
    if (success) {
      toast.success('Đã thêm xe vào danh sách so sánh');
    } else {
      toast.error('Chỉ có thể so sánh tối đa 3 xe');
    }
  };

  const handleAddToCart = (c: any, quantity: number, selectedColor: string) => {
    addToCart({
      id: c.id,
      selectedColor,
      quantity,
      price: c.price,
      image: c.image,
      make: c.make,
      model: c.model,
      year: c.year,
      stockCount: c.stockCount,
      condition: c.condition,
    });
    toast.success('Đã thêm xe vào giỏ hàng!');
  };

  return (
    <CarDetails
      car={car}
      onBack={() => navigate('/cars')}
      onAddToCart={handleAddToCart}
      onAddToCompare={handleAddToCompare}
    />
  );
}
