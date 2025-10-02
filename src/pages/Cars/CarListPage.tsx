import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CarListPage as CarList } from '@/components/CarListPage';
import { mockCars } from '@/data/mockData';
import { useCompareStore } from '@/store/compareStore';
import { toast } from 'sonner';

export default function CarListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('q') || '');
  const [filters, setFilters] = useState<any>({
    make: searchParams.get('make') || 'Tất cả hãng',
    category: searchParams.get('category') || 'Tất cả loại xe',
    priceRange: [0, 3000000000] as [number, number],
    year: 'Tất cả năm',
    fuelType: 'Tất cả nhiên liệu',
    transmission: 'Tất cả hộp số',
    condition: 'Tất cả tình trạng',
    color: 'Tất cả màu sắc'
  });
  const { compareList, addToCompare, removeFromCompare } = useCompareStore();

  const handleAddToCompare = (id: number) => {
    const success = addToCompare(id);
    if (success) {
      toast.success('Đã thêm xe vào danh sách so sánh');
    } else if (compareList.includes(id)) {
      toast.info('Xe này đã có trong danh sách so sánh');
    } else {
      toast.error('Chỉ có thể so sánh tối đa 3 xe');
    }
  };

  return (
    <CarList
      cars={mockCars}
      searchTerm={searchTerm}
      filters={filters}
      onFiltersChange={(next: any) => {
        setFilters(next);
        if (typeof next.searchTerm === 'string') setSearchTerm(next.searchTerm);
      }}
      onViewDetails={(id: number) => navigate(`/cars/${id}`)}
      onAddToCompare={handleAddToCompare}
      compareList={compareList}
    />
  );
}
