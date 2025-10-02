import { Car, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
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
            <p className="text-gray-400 mb-6">
              Auto 88 là đơn vị kinh doanh chuyên cung cấp các dòng xe ô tô chính hãng 
              từ nhiều thương hiệu lớn trên thị trường với hơn 15 năm kinh nghiệm.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 h-auto">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Liên kết nhanh</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trang chủ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Xe ô tô</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tin tức</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">So sánh xe</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Khuyến mãi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Liên hệ</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Danh mục xe</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sedan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">SUV</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hatchback</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bán tải</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Xe điện</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Xe hybrid</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Liên hệ</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-red-500" />
                <div>
                  <p className="text-gray-400">
                    123 Nguyễn Văn Linh, Quận 7,<br />
                    TP. Hồ Chí Minh
                  </p>
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

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Đăng ký nhận tin</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Email của bạn" 
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button variant="secondary" size="sm">
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 Auto 88. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Chính sách bảo mật
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Điều khoản sử dụng
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Chính sách bảo hành
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}