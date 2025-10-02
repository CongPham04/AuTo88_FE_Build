import { useState } from 'react';
import { Search, Car, Users, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface HeroSectionProps {
  onSearch: (term: string, category?: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = () => {
    onSearch(searchTerm, selectedCategory);
  };

  const stats = [
    { icon: Car, label: 'Xe có sẵn', value: '500+' },
    { icon: Users, label: 'Khách hàng hài lòng', value: '10,000+' },
    { icon: Award, label: 'Năm kinh nghiệm', value: '15+' },
    { icon: Shield, label: 'Bảo hành chính hãng', value: '100%' }
  ];

  return (
    <div className="relative">
      <div 
        className="h-96 bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1643142314913-0cf633d9bbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZWFsZXJzaGlwJTIwc2hvd3Jvb218ZW58MXx8fHwxNzU5MTg5Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080')`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Tìm chiếc xe <span className="text-red-500">hoàn hảo</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Hơn 500+ xe chính hãng từ các thương hiệu uy tín hàng đầu thế giới
            </p>

            <div className="bg-white rounded-lg p-6 shadow-2xl max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Tìm kiếm theo tên xe, hãng xe..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Loại xe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả loại xe</SelectItem>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Hatchback">Hatchback</SelectItem>
                      <SelectItem value="Pickup">Bán tải</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleSearch} className="h-12 px-6">
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <IconComponent className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
