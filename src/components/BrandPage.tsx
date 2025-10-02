import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CarFilters } from './CarFilters';
import { CarCard } from './CarCard';
import { CarDetailsModal } from './CarDetailsModal';
import { ArrowLeft, Search } from 'lucide-react';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location: string;
  image: string;
  condition: 'New' | 'Used' | 'Certified';
  description?: string;
  features?: string[];
}

interface BrandPageProps {
  brandName: string;
  cars: Car[];
  onBackToHome: () => void;
}

export function BrandPage({ brandName, cars, onBackToHome }: BrandPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filters, setFilters] = useState({
    make: brandName,
    priceRange: [0, 100000] as [number, number],
    year: 'All Years',
    fuelType: 'All Fuel Types',
    transmission: 'All Transmissions',
    condition: 'All Conditions',
  });

  const brandCars = cars.filter(car => car.make === brandName);

  const filteredCars = useMemo(() => {
    return brandCars.filter((car) => {
      // Search term filter
      const searchMatch = searchTerm === '' || 
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${car.year}`.includes(searchTerm);

      // Price range filter
      const priceMatch = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];

      // Year filter
      const yearMatch = filters.year === 'All Years' || car.year.toString() === filters.year;

      // Fuel type filter
      const fuelMatch = filters.fuelType === 'All Fuel Types' || car.fuelType === filters.fuelType;

      // Transmission filter
      const transmissionMatch = filters.transmission === 'All Transmissions' || car.transmission === filters.transmission;

      // Condition filter
      const conditionMatch = filters.condition === 'All Conditions' || car.condition === filters.condition;

      return searchMatch && priceMatch && yearMatch && fuelMatch && transmissionMatch && conditionMatch;
    });
  }, [brandCars, searchTerm, filters]);

  const clearFilters = () => {
    setFilters({
      make: brandName,
      priceRange: [0, 100000],
      year: 'All Years',
      fuelType: 'All Fuel Types',
      transmission: 'All Transmissions',
      condition: 'All Conditions',
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBackToHome}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang chủ
            </Button>
            <div className="flex-1">
              <h1>Xe {brandName}</h1>
              <p className="text-gray-600">
                Khám phá {brandCars.length} mẫu xe {brandName} chất lượng
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CarFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              showPriceFilter={true}
              hideMakeFilter={true}
            />
          </div>

          {/* Cars Grid */}
          <div className="lg:col-span-3">
            {/* Search and Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h2>Có sẵn {filteredCars.length} xe {brandName}</h2>
                <p className="text-gray-600">
                  Tìm thấy {filteredCars.length} xe phù hợp
                </p>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <Input
                  placeholder="Tìm kiếm model xe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64"
                />
                <Button variant="outline">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onViewDetails={setSelectedCar}
                />
              ))}
            </div>

            {/* No Results */}
            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  Không tìm thấy xe {brandName} nào phù hợp với tiêu chí của bạn
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Car Details Modal */}
      <CarDetailsModal
        car={selectedCar}
        isOpen={!!selectedCar}
        onClose={() => setSelectedCar(null)}
      />
    </div>
  );
}