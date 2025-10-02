import { Eye, GitCompare, Heart, Star } from 'lucide-react';
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
  mileage?: number;
  fuelType: string;
  transmission: string;
}

interface CarCardProps {
  car: Car;
  onViewDetails: (carId: number) => void;
  onAddToCompare: (carId: number) => void;
  isInCompareList?: boolean;
  viewMode?: 'grid' | 'list';
}

export function CarCard({ 
  car, 
  onViewDetails, 
  onAddToCompare, 
  isInCompareList = false,
  viewMode = 'grid' 
}: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('vi-VN').format(mileage) + ' km';
  };

  if (viewMode === 'list') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300">
        <CardContent className="p-0">
          <div className="flex">
            <div className="relative w-72 h-48 overflow-hidden">
              <ImageWithFallback
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
            </div>

            <div className="flex-1 p-6">
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {car.make} {car.model} {car.year}
                  </h3>
                  
                  {car.promotion && (
                    <p className="text-sm text-red-600 mb-3">{car.promotion}</p>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                    <div>Năm: {car.year}</div>
                    <div>Hộp số: {car.transmission}</div>
                    <div>Nhiên liệu: {car.fuelType}</div>
                    {car.mileage !== undefined && <div>Km: {formatMileage(car.mileage)}</div>}
                  </div>

                  <div className="flex items-center gap-4">
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
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAddToCompare(car.id)}
                    disabled={isInCompareList}
                    className="w-12 h-12 p-0"
                  >
                    <GitCompare className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    onClick={() => onViewDetails(car.id)}
                    size="sm"
                    className="w-12 h-12 p-0"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
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
              disabled={isInCompareList}
              className="w-10 h-10 p-0"
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

          <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
            <div>Năm: {car.year}</div>
            <div>Hộp số: {car.transmission}</div>
            <div>Nhiên liệu: {car.fuelType}</div>
            {car.mileage !== undefined && <div>Km: {formatMileage(car.mileage)}</div>}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xl font-bold text-red-600">
                {formatPrice(car.price)}
              </div>
              {car.originalPrice && (
                <div className="text-sm text-gray-500 line-through">
                  {formatPrice(car.originalPrice)}
                </div>
              )}
            </div>
          </div>

          <Button 
            onClick={() => onViewDetails(car.id)}
            className="w-full"
            size="sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Xem chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}