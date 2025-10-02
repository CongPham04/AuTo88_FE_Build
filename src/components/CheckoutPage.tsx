import { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CheckoutPageProps {
  cart: any[];
  onBack: () => void;
  onOrderComplete: () => void;
}

export function CheckoutPage({ cart, onBack, onOrderComplete }: CheckoutPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal info
    fullName: '',
    email: '',
    phone: '',
    // Shipping address
    address: '',
    city: '',
    district: '',
    ward: '',
    // Payment
    paymentMethod: 'bank-transfer',
    notes: ''
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order
      onOrderComplete();
    }
  };

  const paymentMethods = [
    {
      id: 'bank-transfer',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản trực tiếp vào tài khoản ngân hàng',
      icon: CreditCard
    },
    {
      id: 'cash',
      name: 'Thanh toán khi nhận xe',
      description: 'Thanh toán bằng tiền mặt khi nhận xe',
      icon: Truck
    },
    {
      id: 'installment',
      name: 'Trả góp 0% lãi suất',
      description: 'Trả góp với lãi suất ưu đãi',
      icon: Shield
    }
  ];

  const steps = [
    { id: 1, name: 'Thông tin cá nhân', completed: step > 1 },
    { id: 2, name: 'Địa chỉ giao hàng', completed: step > 2 },
    { id: 3, name: 'Thanh toán', completed: step > 3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại giỏ hàng
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Thanh toán</h1>

        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((stepItem, index) => (
              <div key={stepItem.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  stepItem.completed ? 'bg-green-600 border-green-600 text-white' :
                  step === stepItem.id ? 'border-red-600 text-red-600' :
                  'border-gray-300 text-gray-300'
                }`}>
                  {stepItem.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    stepItem.id
                  )}
                </div>
                <span className={`ml-2 font-medium ${
                  step >= stepItem.id ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {stepItem.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-0.5 mx-4 ${
                    stepItem.completed ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Họ và tên *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Tiếp tục
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Địa chỉ giao hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Địa chỉ chi tiết *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Số nhà, tên đường..."
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                        <Select 
                          value={formData.city} 
                          onValueChange={(value) => setFormData({ ...formData, city: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn tỉnh/thành" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ho-chi-minh">TP. Hồ Chí Minh</SelectItem>
                            <SelectItem value="ha-noi">Hà Nội</SelectItem>
                            <SelectItem value="da-nang">Đà Nẵng</SelectItem>
                            <SelectItem value="can-tho">Cần Thơ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="district">Quận/Huyện *</Label>
                        <Select 
                          value={formData.district} 
                          onValueChange={(value) => setFormData({ ...formData, district: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn quận/huyện" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quan-1">Quận 1</SelectItem>
                            <SelectItem value="quan-7">Quận 7</SelectItem>
                            <SelectItem value="quan-binh-thanh">Quận Bình Thạnh</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="ward">Phường/Xã *</Label>
                        <Select 
                          value={formData.ward} 
                          onValueChange={(value) => setFormData({ ...formData, ward: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn phường/xã" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="phuong-tan-hung">Phường Tân Hưng</SelectItem>
                            <SelectItem value="phuong-tan-phong">Phường Tân Phong</SelectItem>
                            <SelectItem value="phuong-tan-thuan">Phường Tân Thuận</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">Ghi chú giao hàng</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Ghi chú thêm về địa chỉ giao hàng..."
                      />
                    </div>
                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Quay lại
                      </Button>
                      <Button type="submit" className="flex-1">
                        Tiếp tục
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Phương thức thanh toán</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup 
                      value={formData.paymentMethod} 
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    >
                      {paymentMethods.map((method) => {
                        const IconComponent = method.icon;
                        return (
                          <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <IconComponent className="w-5 h-5 text-gray-600" />
                            <div className="flex-1">
                              <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                {method.name}
                              </Label>
                              <p className="text-sm text-gray-600">{method.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </RadioGroup>

                    {formData.paymentMethod === 'bank-transfer' && (
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium mb-2">Thông tin chuyển khoản:</h4>
                        <div className="text-sm space-y-1">
                          <p><strong>Ngân hàng:</strong> Vietcombank</p>
                          <p><strong>Số tài khoản:</strong> 1234567890</p>
                          <p><strong>Chủ tài khoản:</strong> CÔNG TY AUTO 88</p>
                          <p><strong>Nội dung:</strong> Thanh toán đơn hàng [Mã đơn hàng]</p>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button type="button" variant="outline" onClick={() => setStep(2)}>
                        Quay lại
                      </Button>
                      <Button type="submit" className="flex-1">
                        Hoàn tất đặt hàng
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Đơn hàng của bạn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart items */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}`} className="flex space-x-3">
                      <div className="w-16 h-12 overflow-hidden rounded">
                        <ImageWithFallback
                          src={item.image}
                          alt={`${item.make} ${item.model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">
                          {item.make} {item.model} {item.year}
                        </h4>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Màu: {item.selectedColor}</span>
                          <span>x{item.quantity}</span>
                        </div>
                        <div className="text-red-600 font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
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
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">{formatPrice(calculateTotal())}</span>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Bằng việc đặt hàng, bạn đồng ý với{' '}
                  <a href="#" className="text-red-600 hover:underline">
                    Điều khoản dịch vụ
                  </a>{' '}
                  và{' '}
                  <a href="#" className="text-red-600 hover:underline">
                    Chính sách bảo mật
                  </a>{' '}
                  của chúng tôi.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}