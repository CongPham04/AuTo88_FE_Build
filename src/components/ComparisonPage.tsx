import { ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ComparisonPageProps {
  cars: any[];
  onRemoveFromCompare: (carId: number) => void;
  onBack: () => void;
}

export function ComparisonPage({ cars, onRemoveFromCompare, onBack }: ComparisonPageProps) {
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleViewDetails = (carId: number) => {
    navigate(`/cars/${carId}`);
  };

  if (cars.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách
          </Button>
          
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">So sánh xe</h1>
            <p className="text-gray-600 mb-8">
              Bạn chưa chọn xe nào để so sánh. Hãy thêm xe vào danh sách so sánh để bắt đầu.
            </p>
            <Button onClick={onBack}>
              Chọn xe để so sánh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const comparisonRows = [
    { label: 'Hình ảnh', key: 'image', type: 'image' },
    { label: 'Tên xe', key: 'name', type: 'text' },
    { label: 'Giá bán', key: 'price', type: 'price' },
    { label: 'Năm sản xuất', key: 'year', type: 'text' },
    { label: 'Loại xe', key: 'category', type: 'text' },
    { label: 'Hộp số', key: 'transmission', type: 'text' },
    { label: 'Loại nhiên liệu', key: 'fuelType', type: 'text' },
    { label: 'Tình trạng', key: 'condition', type: 'badge' },
    { label: 'Động cơ', key: 'specs.engine', type: 'text' },
    { label: 'Công suất', key: 'specs.power', type: 'text' },
    { label: 'Mô-men xoắn', key: 'specs.torque', type: 'text' },
    { label: 'Tiêu hao nhiên liệu', key: 'specs.fuelConsumption', type: 'text' },
    { label: 'Số chỗ ngồi', key: 'specs.seats', type: 'text' },
    { label: 'Trọng lượng', key: 'specs.weight', type: 'text' },
    { label: 'Chiều dài', key: 'specs.length', type: 'text' },
    { label: 'Chiều rộng', key: 'specs.width', type: 'text' },
    { label: 'Chiều cao', key: 'specs.height', type: 'text' },
    { label: 'Màu sắc', key: 'colors', type: 'array' },
  ];

  const getValue = (car: any, key: string) => {
    const keys = key.split('.');
    let value = car;
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại danh sách
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">So sánh xe</h1>
          <p className="text-gray-600">
            So sánh chi tiết {cars.length} xe được chọn
          </p>
        </div>

        {/* Comparison table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 w-64 bg-gray-50">Thông số</th>
                    {cars.map((car) => (
                      <th key={car.id} className="text-center p-4 w-80 relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveFromCompare(car.id)}
                          className="absolute top-2 right-2 p-1 h-auto"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <div className="mt-4">
                          {car.make} {car.model} {car.year}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={row.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 font-medium text-gray-900">{row.label}</td>
                      {cars.map((car) => {
                        const value = getValue(car, row.key);
                        
                        return (
                          <td key={car.id} className="p-4 text-center w-80">
                            {row.type === 'image' && (
                              <div className="flex justify-center">
                                <ImageWithFallback
                                  src={car.image}
                                  alt={`${car.make} ${car.model}`}
                                  className="w-32 h-24 object-cover rounded"
                                />
                              </div>
                            )}
                            {row.type === 'text' && (
                              <span className="text-gray-900 break-words">
                                {row.key === 'name' ? `${car.make} ${car.model} ${car.year}` : value || 'N/A'}
                              </span>
                            )}
                            {row.type === 'price' && (
                              <span className="text-red-600 font-bold text-lg">
                                {formatPrice(car.price)}
                              </span>
                            )}
                            {row.type === 'badge' && (
                              <Badge 
                                className={value === 'Mới' ? 'bg-green-600' : 'bg-blue-600'}
                              >
                                {value}
                              </Badge>
                            )}
                            {row.type === 'array' && (
                              <div className="flex flex-wrap justify-center gap-1">
                                {value?.map((item: string, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Tóm tắt so sánh</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <tbody>
                  <tr>
                    {cars.map((car) => (
                      <td key={car.id} className="p-4 w-80 text-center">
                        <div className="space-y-3">
                          <h3 className="font-semibold text-lg">
                            {car.make} {car.model} {car.year}
                          </h3>
                          <div className="text-2xl font-bold text-red-600">
                            {formatPrice(car.price)}
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div>Động cơ: {car.specs?.engine}</div>
                            <div>Công suất: {car.specs?.power}</div>
                            <div>Tiêu hao: {car.specs?.fuelConsumption}</div>
                          </div>
                          <Button 
                            className="mt-4 w-full" 
                            size="sm"
                            onClick={() => handleViewDetails(car.id)}
                          >
                            Xem chi tiết
                          </Button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}