import { useState } from 'react';
import { Calendar, User, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NewsPageProps {
  news: any[];
}

export function NewsPage({ news }: NewsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const categories = ['all', 'Ra mắt xe mới', 'Khuyến mãi', 'Đánh giá xe', 'Tin tức'];

  const filteredNews = news.filter((article) => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Expanded mock news data for better display
  const expandedNews = [
    ...news,
    {
      id: 3,
      title: 'Hyundai Tucson 2024 - Thiết kế mới, công nghệ tiên tiến',
      summary: 'Hyundai Tucson thế hệ mới với ngoại hình táo bạo và nhiều tính năng an toàn hiện đại.',
      content: 'Hyundai Tucson 2024 được trang bị hệ thống an toàn SmartSense toàn diện, màn hình cảm ứng 10.25 inch...',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      date: '2024-01-25',
      category: 'Ra mắt xe mới',
      author: 'Nguyễn Văn Tú'
    },
    {
      id: 4,
      title: 'Top 5 xe sedan bán chạy nhất tháng 12/2023',
      summary: 'Tổng hợp những mẫu xe sedan được khách hàng Việt Nam yêu thích nhất trong tháng vừa qua.',
      content: 'Trong tháng 12/2023, Toyota Vios tiếp tục dẫn đầu phân khúc sedan với doanh số ấn tượng...',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      date: '2024-01-05',
      category: 'Đánh giá xe',
      author: 'Trần Thị Lan'
    },
    {
      id: 5,
      title: 'Chương trình bảo dưỡng miễn phí cho khách hàng thân thiết',
      summary: 'Auto 88 triển khai chương trình bảo dưỡng miễn phí và ưu đãi đặc biệt cho khách hàng VIP.',
      content: 'Từ ngày 1/2/2024, tất cả khách hàng mua xe tại Auto 88 sẽ được hưởng chế độ bảo dưỡng miễn phí...',
      image: 'https://images.unsplash.com/photo-1632823471565-1ecdf30e9e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      date: '2024-01-30',
      category: 'Tin tức',
      author: 'Lê Văn Minh'
    }
  ];

  const allNews = selectedCategory === 'all' ? expandedNews : expandedNews.filter(article => 
    selectedCategory === 'all' || article.category === selectedCategory
  );

  const filteredAllNews = allNews.filter((article) => {
    return searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedArticle(null)}
            className="mb-6"
          >
            ← Quay lại danh sách tin tức
          </Button>

          <article className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video overflow-hidden">
              <ImageWithFallback
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <Badge variant={selectedArticle.category === 'Khuyến mãi' ? 'destructive' : 'secondary'}>
                  {selectedArticle.category}
                </Badge>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(selectedArticle.date)}
                </div>
                {selectedArticle.author && (
                  <div className="flex items-center text-gray-600 text-sm">
                    <User className="w-4 h-4 mr-2" />
                    {selectedArticle.author}
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {selectedArticle.title}
              </h1>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed">
                  {selectedArticle.content}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tin tức & Khuyến mãi
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cập nhật những tin tức mới nhất về ô tô và các chương trình ưu đãi hấp dẫn từ Auto 88
          </p>
        </div>

        {/* Search and filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm tin tức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả danh mục</SelectItem>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured article */}
        {filteredAllNews.length > 0 && (
          <Card className="mb-8 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedArticle(filteredAllNews[0])}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <ImageWithFallback
                  src={filteredAllNews[0].image}
                  alt={filteredAllNews[0].title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge 
                    variant={filteredAllNews[0].category === 'Khuyến mãi' ? 'destructive' : 'secondary'}
                  >
                    {filteredAllNews[0].category}
                  </Badge>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(filteredAllNews[0].date)}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-red-600 transition-colors">
                  {filteredAllNews[0].title}
                </h2>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {filteredAllNews[0].summary}
                </p>
                <Button variant="outline">
                  Đọc thêm →
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* News grid */}
        {filteredAllNews.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAllNews.slice(1).map((article) => (
              <Card 
                key={article.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant={article.category === 'Khuyến mãi' ? 'destructive' : 'secondary'}
                      >
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(article.date)}
                      {article.author && (
                        <>
                          <span className="mx-2">•</span>
                          <User className="w-4 h-4 mr-2" />
                          {article.author}
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-red-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.summary}
                    </p>

                    <Button variant="ghost" className="p-0 h-auto text-red-600 hover:text-red-700">
                      Đọc thêm →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No results */}
        {filteredAllNews.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-gray-600 mb-6">
              Thử thay đổi từ khóa tìm kiếm hoặc danh mục để có kết quả tốt hơn.
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}>
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}