import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useUserStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
      setIsLoading(false);
      return;
    }

    const success = register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone || undefined,
      formData.address || undefined
    );

    if (success) {
      toast.success('Đăng ký thành công! Chào mừng bạn đến với Auto 88!');
      navigate('/');
    } else {
      toast.error('Email này đã được sử dụng! Vui lòng chọn email khác.');
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Đăng ký tài khoản
          </CardTitle>
          <p className="text-center text-gray-600">
            Tạo tài khoản để trải nghiệm dịch vụ tốt nhất
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Họ và tên *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nhập họ và tên"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0901234567"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="address">Địa chỉ</Label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Nhập địa chỉ của bạn"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="password">Mật khẩu *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Tối thiểu 6 ký tự"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button type="submit" className="w-full cursor-pointer hover:bg-red-700 transition-colors" disabled={isLoading}>
              {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => navigate('/auth/login')}
                className="text-red-600 hover:text-red-700 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
