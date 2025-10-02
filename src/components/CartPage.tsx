import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartPageProps {
  cart: any[];
  onRemoveFromCart: (carId: number, color: string) => void;
  onUpdateQuantity: (carId: number, color: string, quantity: number) => void;
  onCheckout: () => void;
}

export function CartPage({ cart, onRemoveFromCart, onUpdateQuantity, onCheckout }: CartPageProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 0; // Free shipping
    const tax = subtotal * 0.1; // 10% VAT
    return subtotal + shipping + tax;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
            <p className="text-gray-600 mb-8">
              Bạn chưa có xe nào trong giỏ hàng. Hãy khám phá các mẫu xe tuyệt vời của chúng tôi.
            </p>
            <Button onClick={() => window.history.back()}>
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.id}-${item.selectedColor}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-20 overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={item.image}
                        alt={`${item.make} ${item.model}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {item.make} {item.model} {item.year}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">Màu: {item.selectedColor}</Badge>
                        {item.condition === 'Mới' && (
                          <Badge className="bg-green-600">Mới</Badge>
                        )}
                      </div>
                      <div className="text-red-600 font-bold text-lg mt-2">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, Math.max(1, item.quantity - 1))}
                          className="h-10 w-10 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, Math.min(item.stockCount, item.quantity + 1))}
                          className="h-10 w-10 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveFromCart(item.id, item.selectedColor)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 text-right">
                    <span className="text-lg font-semibold">
                      Tổng: {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Tạm tính:</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>

                <div className="flex justify-between">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>

                <div className="flex justify-between">
                  <span>VAT (10%):</span>
                  <span>{formatPrice(calculateSubtotal() * 0.1)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">{formatPrice(calculateTotal())}</span>
                </div>

                <Button 
                  onClick={onCheckout}
                  className="w-full"
                  size="lg"
                >
                  Tiến hành thanh toán
                </Button>

                <div className="text-sm text-gray-600 text-center">
                  <p>🚚 Giao hàng miễn phí toàn quốc</p>
                  <p>💳 Hỗ trợ trả góp 0% lãi suất</p>
                  <p>🔒 Thanh toán an toàn và bảo mật</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Ưu đãi đặc biệt:</h4>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-700">
                      🎉 Giảm thêm 50 triệu cho đơn hàng từ 2 tỷ
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      🎁 Tặng gói bảo hiểm 1 năm cho xe mới
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}