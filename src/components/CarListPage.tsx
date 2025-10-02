import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { CarCard } from './CarCard';

interface CarListPageProps {
  cars: any[];
  searchTerm: string;
  filters: any;
  onFiltersChange: (filters: any) => void;
  onViewDetails: (carId: number) => void;
  onAddToCompare: (carId: number) => void;
  compareList: number[];
}

export function CarListPage({ 
  cars, 
  searchTerm, 
  filters, 
  onFiltersChange, 
  onViewDetails, 
  onAddToCompare,
  compareList 
}: CarListPageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(true);

  const filteredCars = useMemo(() => {
    let filtered = cars.filter((car) => {
      // Search term filter
      const searchMatch = searchTerm === '' || 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${car.year}`.includes(searchTerm);

      // Make filter
      const makeMatch = filters.make === 'Tất cả hãng' || car.make === filters.make;

      // Category filter
      const categoryMatch = filters.category === 'Tất cả loại xe' || car.category === filters.category;

      // Price range filter
      const priceMatch = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];

      // Year filter
      const yearMatch = filters.year === 'Tất cả năm' || car.year.toString() === filters.year;

      // Fuel type filter
      const fuelMatch = filters.fuelType === 'Tất cả nhiên liệu' || car.fuelType === filters.fuelType;

      // Transmission filter
      const transmissionMatch = filters.transmission === 'Tất cả hộp số' || car.transmission === filters.transmission;

      // Condition filter
      const conditionMatch = filters.condition === 'Tất cả tình trạng' || car.condition === filters.condition;

      // Color filter
      const colorMatch = filters.color === 'Tất cả màu sắc' || car.colors.includes(filters.color);

      return searchMatch && makeMatch && categoryMatch && priceMatch && yearMatch && 
             fuelMatch && transmissionMatch && conditionMatch && colorMatch;
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        filtered.sort((a, b) => b.year - a.year);
        break;
      case 'name':
        filtered.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [cars, searchTerm, filters, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const clearFilters = () => {
    onFiltersChange({
      make: 'Tất cả hãng',
      category: 'Tất cả loại xe',
      priceRange: [0, 3000000000],
      year: 'Tất cả năm',
      fuelType: 'Tất cả nhiên liệu',
      transmission: 'Tất cả hộp số',
      condition: 'Tất cả tình trạng',
      color: 'Tất cả màu sắc'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Danh sách xe ô tô</h1>
          
          {/* Search and controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm xe..."
                  value={searchTerm}
                  onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="price-asc">Giá tăng dần</SelectItem>
                  <SelectItem value="price-desc">Giá giảm dần</SelectItem>
                  <SelectItem value="year-desc">Năm mới nhất</SelectItem>
                  <SelectItem value="name">Tên A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden md:flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Bộ lọc tìm kiếm</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Xóa tất cả
                  </Button>
                </div>

                <Separator />

                {/* Make filter */}
                <div>
                  <Label>Hãng xe</Label>
                  <Select 
                    value={filters.make} 
                    onValueChange={(value) => onFiltersChange({ ...filters, make: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tất cả hãng">Tất cả hãng</SelectItem>
                      <SelectItem value="Toyota">Toyota</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                      <SelectItem value="Ford">Ford</SelectItem>
                      <SelectItem value="Mercedes">Mercedes</SelectItem>
                      <SelectItem value="BMW">BMW</SelectItem>
                      <SelectItem value="Hyundai">Hyundai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category filter */}
                <div>
                  <Label>Loại xe</Label>
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tất cả loại xe">Tất cả loại xe</SelectItem>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="Pickup">Bán tải</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price range */}
                <div>
                  <Label>Khoảng giá</Label>
                  <div className="mt-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
                      max={3000000000}
                      step={50000000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatPrice(filters.priceRange[0])}</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Other filters */}
                <div>
                  <Label>Năm sản xuất</Label>
                  <Select 
                    value={filters.year} 
                    onValueChange={(value) => onFiltersChange({ ...filters, year: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tất cả năm">Tất cả năm</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Loại nhiên liệu</Label>
                  <Select 
                    value={filters.fuelType} 
                    onValueChange={(value) => onFiltersChange({ ...filters, fuelType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tất cả nhiên liệu">Tất cả nhiên liệu</SelectItem>
                      <SelectItem value="Xăng">Xăng</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Điện">Điện</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Hộp số</Label>
                  <Select 
                    value={filters.transmission} 
                    onValueChange={(value) => onFiltersChange({ ...filters, transmission: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tất cả hộp số">Tất cả hộp số</SelectItem>
                      <SelectItem value="Tự động">Tự động</SelectItem>
                      <SelectItem value="Số sàn">Số sàn</SelectItem>
                      <SelectItem value="CVT">CVT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tình trạng</Label>
                  <Select 
                    value={filters.condition} 
                    onValueChange={(value) => onFiltersChange({ ...filters, condition: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tất cả tình trạng">Tất cả tình trạng</SelectItem>
                      <SelectItem value="Mới">Mới</SelectItem>
                      <SelectItem value="Đã qua sử dụng">Đã qua sử dụng</SelectItem>
                      <SelectItem value="Chứng nhận">Chứng nhận</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-600">
                Tìm thấy {filteredCars.length} xe phù hợp
              </p>
            </div>

            {filteredCars.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onViewDetails={onViewDetails}
                    onAddToCompare={onAddToCompare}
                    isInCompareList={compareList.includes(car.id)}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  Không tìm thấy xe nào phù hợp với tiêu chí của bạn
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}