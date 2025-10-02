import { useNavigate } from 'react-router-dom';
import { ComparisonPage as Comparison } from '@/components/ComparisonPage';
import { mockCars } from '@/data/mockData';
import { useCompareStore } from '@/store/compareStore';
import { Button } from '@/components/ui/button';
import { Car, ArrowLeft } from 'lucide-react';

export default function ComparisonPage() {
  const navigate = useNavigate();
  const { compareList, removeFromCompare } = useCompareStore();
  const cars = mockCars.filter(c => compareList.includes(c.id));

  const handleRemoveFromCompare = (id: number) => {
    removeFromCompare(id);
  };

  // If no cars selected, show empty state
  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/cars')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách xe
          </Button>

          {/* Empty state */}
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Car className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Chưa có xe nào để so sánh
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Hãy chọn ít nhất 2 xe từ danh sách để bắt đầu so sánh các tính năng và giá cả.
            </p>
            <Button 
              onClick={() => navigate('/cars')}
              size="lg"
              className="bg-red-600 hover:bg-red-700"
            >
              <Car className="w-5 h-5 mr-2" />
              Xem danh sách xe
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If only 1 car selected, show message
  if (compareList.length === 1) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/cars')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách xe
          </Button>

          {/* Single car state */}
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
              <Car className="w-12 h-12 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cần thêm xe để so sánh
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Bạn đã chọn 1 xe. Hãy chọn thêm ít nhất 1 xe nữa để bắt đầu so sánh.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/cars')}
                size="lg"
                className="bg-red-600 hover:bg-red-700"
              >
                <Car className="w-5 h-5 mr-2" />
                Chọn thêm xe
              </Button>
              <Button 
                onClick={() => useCompareStore.getState().clearCompare()}
                variant="outline"
                size="lg"
              >
                Xóa xe đã chọn
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Comparison
      cars={cars}
      onRemoveFromCompare={handleRemoveFromCompare}
      onBack={() => navigate('/cars')}
    />
  );
}
