import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface News {
  id: number;
  title: string;
  summary: string;
  image: string;
  date: string;
  category: string;
}

interface NewsSectionProps {
  news: News[];
  onReadMore: (newsId: number) => void;
}

export default function NewsSection({ news, onReadMore }: NewsSectionProps) {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tin tức & Khuyến mãi</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Cập nhật những tin tức mới nhất về ô tô và các chương trình ưu đãi hấp dẫn</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {news.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <ImageWithFallback src={article.image} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4">
                    <Badge variant={article.category === 'Khuyến mãi' ? 'destructive' : 'secondary'}>{article.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(article.date)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
                  <Button variant="ghost" className="p-0 h-auto text-red-600 hover:text-red-700" onClick={() => onReadMore(article.id)}>
                    Đọc thêm
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" onClick={() => onReadMore(0)}>
            Xem tất cả tin tức
          </Button>
        </div>
      </div>
    </section>
  );
}
