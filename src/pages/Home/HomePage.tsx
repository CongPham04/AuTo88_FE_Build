import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import BrandSection from '@/components/sections/BrandSection';
import FeaturedCars from '@/components/sections/FeaturedCars';
import NewsSection from '@/components/sections/NewsSection';
import { mockCars, mockNews } from '@/data/mockData';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (term: string, category?: string) => {
    const params = new URLSearchParams();
    if (term) params.set('q', term);
    if (category && category !== 'all') params.set('category', category);
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div>
      <HeroSection onSearch={handleSearch} />
      <CategorySection onCategoryClick={(category) => navigate(`/cars?category=${encodeURIComponent(category)}`)} />
      <BrandSection onBrandClick={(brand) => navigate(`/cars?make=${encodeURIComponent(brand)}`)} />
      <FeaturedCars 
        cars={mockCars.slice(0, 4)}
        onViewDetails={(id) => id ? navigate(`/cars/${id}`) : navigate('/cars')}
        onAddToCompare={() => navigate('/comparison')}
      />
      <NewsSection news={mockNews} onReadMore={() => navigate('/news')} />
    </div>
  );
}
