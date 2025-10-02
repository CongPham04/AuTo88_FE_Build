import { Car, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-red-600 p-2 rounded-lg">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AUTO 88</h1>
                <p className="text-sm text-gray-400">Uy tín - Chất lượng - Giá tốt</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">Auto 88 là đơn vị kinh doanh chuyên cung cấp các dòng xe ô tô chính hãng từ nhiều thương hiệu lớn trên thị trường với hơn 15 năm kinh nghiệm.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 h-auto cursor-pointer hover:bg-gray-800 transition-colors"><Facebook className="w-5 h-5" /></Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto cursor-pointer hover:bg-gray-800 transition-colors"><Instagram className="w-5 h-5" /></Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto cursor-pointer hover:bg-gray-800 transition-colors"><Youtube className="w-5 h-5" /></Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Liên kết nhanh</h3>
            <ul className="space-y-3">
              <li><button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Trang chủ</button></li>
              <li><button onClick={() => navigate('/cars')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Xe ô tô</button></li>
              <li><button onClick={() => navigate('/news')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Tin tức</button></li>
              <li><button onClick={() => navigate('/comparison')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">So sánh xe</button></li>
              <li><button onClick={() => navigate('/news')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Khuyến mãi</button></li>
              <li><button onClick={() => navigate('/profile')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Liên hệ</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Danh mục xe</h3>
            <ul className="space-y-3">
              <li><button onClick={() => navigate('/cars?category=Sedan')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Sedan</button></li>
              <li><button onClick={() => navigate('/cars?category=SUV')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">SUV</button></li>
              <li><button onClick={() => navigate('/cars?category=Hatchback')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Hatchback</button></li>
              <li><button onClick={() => navigate('/cars?category=Pickup')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Bán tải</button></li>
              <li><button onClick={() => navigate('/cars?category=Electric')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Xe điện</button></li>
              <li><button onClick={() => navigate('/cars?category=Hybrid')} className="text-gray-400 hover:text-white transition-colors cursor-pointer">Xe hybrid</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Liên hệ</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-red-500" />
                <div>
                  <p className="text-gray-400">123 Nguyễn Văn Linh, Quận 7,<br />TP. Hồ Chí Minh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-500" />
                <p className="text-gray-400">1900-1234</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-500" />
                <p className="text-gray-400">info@auto88.com</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-3">Đăng ký nhận tin</h4>
              <div className="flex space-x-2">
                <Input placeholder="Email của bạn" className="bg-gray-800 border-gray-700 text-white" />
                <Button variant="secondary" size="sm">Đăng ký</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">© 2024 Auto 88. Tất cả quyền được bảo lưu.</div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Điều khoản sử dụng</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo hành</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
