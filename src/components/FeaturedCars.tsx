import { Star, Eye, GitCompare, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  originalPrice?: number;
  image: string;
  condition: string;
  promotion?: string;
  inStock: boolean;
  stockCount: number;
}

interface FeaturedCarsProps {
  cars: Car[];
  onViewDetails: (carId: number) => void;
  onAddToCompare: (carId: number) => void;
}

export function FeaturedCars({ cars, onViewDetails, onAddToCompare }: FeaturedCarsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Xe nổi bật
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những mẫu xe được khách hàng quan tâm và đánh giá cao nhất
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <Card key={car.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 space-y-2">
                    {car.condition === 'Mới' && (
                      <Badge className="bg-green-600">Mới</Badge>
                    )}
                    {car.promotion && (
                      <Badge variant="destructive">Khuyến mãi</Badge>
                    )}
                    {!car.inStock && (
                      <Badge variant="secondary">Hết hàng</Badge>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onAddToCompare(car.id)}
                      className="w-10 h-10 p-0 "
                    >
                      <GitCompare className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Stock indicator */}
                  {car.inStock && car.stockCount <= 3 && (
                    <div className="absolute bottom-3 left-3">
                      <Badge variant="outline" className="bg-white/90">
                        Chỉ còn {car.stockCount} xe
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {car.make} {car.model} {car.year}
                  </h3>
                  
                  {car.promotion && (
                    <p className="text-sm text-red-600 mb-2">{car.promotion}</p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-red-600">
                        {formatPrice(car.price)}
                      </div>
                      {car.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(car.originalPrice)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => onViewDetails(car.id)}
                      className="flex-1 "
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onViewDetails(0)} // Navigate to cars page
          >
            Xem tất cả xe ô tô
          </Button>
        </div>
      </div>
    </section>
  );
}