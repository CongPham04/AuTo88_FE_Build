import { ImageWithFallback } from './figma/ImageWithFallback';

interface BrandSectionProps {
  onBrandClick: (brand: string) => void;
}

export function BrandSection({ onBrandClick }: BrandSectionProps) {
  const brands = [
    {
      name: 'Toyota',
      logo: 'https://images.unsplash.com/photo-1577697071530-928b014eebd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBjYW1yeSUyMGNhciUyMHNob3dyb29tfGVufDF8fHx8MTc1OTIxNTczOHww&ixlib=rb-4.1.0&q=80&w=200',
      count: '45 xe',
      popular: true
    },
    {
      name: 'Honda',
      logo: 'https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljfGVufDF8fHx8MTc1OTIxNTc0MXww&ixlib=rb-4.1.0&q=80&w=200',
      count: '38 xe',
      popular: true
    },
    {
      name: 'Ford',
      logo: 'https://images.unsplash.com/photo-1653813893853-be3e6ecfe061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2fGVufDF8fHx8MTc1OTIxNTc0NXww&ixlib=rb-4.1.0&q=80&w=200',
      count: '32 xe',
      popular: true
    },
    {
      name: 'Mercedes',
      logo: 'https://images.unsplash.com/photo-1722088354078-89415751076c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGJlbnolMjBzZWRhbnxlbnwxfHx8fDE3NTkyMTU3NDh8MA&ixlib=rb-4.1.0&q=80&w=200',
      count: '28 xe',
      popular: false
    },
    {
      name: 'BMW',
      logo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '25 xe',
      popular: false
    },
    {
      name: 'Hyundai',
      logo: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '42 xe',
      popular: true
    },
    {
      name: 'Audi',
      logo: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '22 xe',
      popular: false
    },
    {
      name: 'Volkswagen',
      logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      count: '18 xe',
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thương hiệu nổi bật
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Xe chính hãng từ các thương hiệu uy tín được ưa chuộng nhất
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group cursor-pointer"
              onClick={() => onBrandClick(brand.name)}
            >
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative">
                {brand.popular && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Hot
                  </div>
                )}
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <ImageWithFallback
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 text-center mb-2">
                  {brand.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {brand.count}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={() => onBrandClick('Tất cả hãng')}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Xem tất cả thương hiệu →
          </button>
        </div>
      </div>
    </section>
  );
}