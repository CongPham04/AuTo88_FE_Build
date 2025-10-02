import { Car, Truck, Users, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface CategorySectionProps {
  onCategoryClick: (category: string) => void;
}

export function CategorySection({ onCategoryClick }: CategorySectionProps) {
  const categories = [
    {
      id: 'Sedan',
      name: 'Sedan',
      description: 'Xe du lịch sang trọng',
      icon: Car,
      count: '120+ xe',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'SUV',
      name: 'SUV',
      description: 'Xe đa dụng cao cấp',
      icon: Truck,
      count: '80+ xe',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'Hatchback',
      name: 'Hatchback',
      description: 'Xe cỡ nhỏ tiện dụng',
      icon: Users,
      count: '60+ xe',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'Pickup',
      name: 'Bán tải',
      description: 'Xe tải nhẹ chuyên dụng',
      icon: Truck,
      count: '40+ xe',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Danh mục xe ô tô
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập xe đa dạng từ các thương hiệu hàng đầu thế giới
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                onClick={() => onCategoryClick(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {category.description}
                  </p>
                  <div className="text-sm text-red-600 font-medium">
                    {category.count}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}