import { AdminDashboard as Admin } from '@/components/AdminDashboard';
import { mockCars, mockNews } from '@/data/mockData';

export default function AdminDashboard() {
  return <Admin cars={mockCars} news={mockNews} />;
}
