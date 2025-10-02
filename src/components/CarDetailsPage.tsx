import { useState } from 'react';
import { ArrowLeft, Share2, Heart, ShoppingCart, GitCompare, Star, Check, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarDetailsPageProps {
  car: any;
  onBack: () => void;
  onAddToCart: (car: any, quantity: number, selectedColor: string) => void;
  onAddToCompare: (carId: number) => void;
}

export function CarDetailsPage({ car, onBack, onAddToCart, onAddToCompare }: CarDetailsPageProps) {
  const [selectedColor, setSelectedColor] = useState(car.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = () => {
    onAddToCart(car, quantity, selectedColor);
  };

  const relatedCars = [
    { id: 99, name: 'Toyota Corolla 2024', price: 750000000, image: car.image },
    { id: 98, name: 'Honda Accord 2024', price: 1100000000, image: car.image }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <ImageWithFallback
                src={car.gallery?.[selectedImage] || car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {car.gallery && car.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.gallery.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 ${
                      selectedImage === index ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${car.make} ${car.model} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Car details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {car.make} {car.model} {car.year}
                  </h1>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">(127 đánh giá)</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {car.condition === 'Mới' && (
                  <Badge className="bg-green-600">Xe mới</Badge>
                )}
                {car.promotion && (
                  <Badge variant="destructive">Khuyến mãi</Badge>
                )}
                {car.inStock && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Còn hàng
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {formatPrice(car.price)}
                </div>
                {car.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">
                    {formatPrice(car.originalPrice)}
                  </div>
                )}
                {car.promotion && (
                  <div className="text-red-600 font-medium mt-2">
                    🎉 {car.promotion}
                  </div>
                )}
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
                <div>
                  <span className="text-gray-600">Năm:</span>
                  <span className="ml-2 font-medium">{car.year}</span>
                </div>
                <div>
                  <span className="text-gray-600">Hộp số:</span>
                  <span className="ml-2 font-medium">{car.transmission}</span>
                </div>
                <div>
                  <span className="text-gray-600">Nhiên liệu:</span>
                  <span className="ml-2 font-medium">{car.fuelType}</span>
                </div>
                <div>
                  <span className="text-gray-600">Số chỗ:</span>
                  <span className="ml-2 font-medium">{car.specs?.seats || 5} chỗ</span>
                </div>
              </div>

              {/* Color selection */}
              <div className="mb-6">
                <Label className="block mb-3">Màu sắc:</Label>
                <div className="flex flex-wrap gap-2">
                  {car.colors.map((color: string) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <Label className="block mb-3">Số lượng:</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(car.stockCount, quantity + 1))}
                  >
                    +
                  </Button>
                  <span className="text-sm text-gray-600 ml-4">
                    Còn {car.stockCount} xe
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 cursor-pointer hover:bg-red-700 transition-colors"
                  disabled={!car.inStock}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onAddToCompare(car.id)}
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <GitCompare className="w-4 h-4 mr-2" />
                  So sánh
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowContactForm(true)}
                  className="cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Liên hệ
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed information tabs */}
        <div className="mb-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Mô tả</TabsTrigger>
              <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
              <TabsTrigger value="features">Tính năng</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card>
                <CardHeader>
                  <CardTitle>Mô tả chi tiết</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {car.description}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs">
              <Card>
                <CardHeader>
                  <CardTitle>Thông số kỹ thuật</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Động cơ & Hiệu suất</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Động cơ:</span>
                          <span>{car.specs?.engine}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Công suất:</span>
                          <span>{car.specs?.power}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mô-men xoắn:</span>
                          <span>{car.specs?.torque}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tiêu hao nhiên liệu:</span>
                          <span>{car.specs?.fuelConsumption}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Kích thước & Trọng lượng</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Số chỗ ngồi:</span>
                          <span>{car.specs?.seats} chỗ</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Trọng lượng:</span>
                          <span>{car.specs?.weight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chiều dài:</span>
                          <span>{car.specs?.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chiều rộng:</span>
                          <span>{car.specs?.width}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chiều cao:</span>
                          <span>{car.specs?.height}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Tính năng nổi bật</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {car.features?.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Đánh giá từ khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Nguyễn Văn A</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">15/01/2024</span>
                      </div>
                      <p className="text-gray-600">
                        Xe chất lượng tốt, giao hàng nhanh. Đội ngũ tư vấn nhiệt tình. Rất hài lòng với dịch vụ của Auto 88.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related cars */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Xe liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedCars.map((relatedCar) => (
              <Card key={relatedCar.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <ImageWithFallback
                    src={relatedCar.image}
                    alt={relatedCar.name}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="font-medium mb-2">{relatedCar.name}</h3>
                  <p className="text-red-600 font-bold">{formatPrice(relatedCar.price)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact form modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle>Liên hệ tư vấn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input id="name" placeholder="Nhập họ tên" />
                </div>
                <div>
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="Nhập số điện thoại" />
                </div>
                <div>
                  <Label htmlFor="message">Lời nhắn</Label>
                  <Textarea id="message" placeholder="Nhập lời nhắn của bạn" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowContactForm(false)}>
                    Hủy
                  </Button>
                  <Button onClick={() => setShowContactForm(false)}>
                    Gửi liên hệ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}