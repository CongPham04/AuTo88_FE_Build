import { NewsPage as News } from '@/components/NewsPage';
import { mockNews } from '@/data/mockData';

export default function NewsPage() {
  return <News news={mockNews} />;
}
