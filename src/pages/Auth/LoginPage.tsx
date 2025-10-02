import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUserStore();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = login(loginData.email, loginData.password);
    
    if (success) {
      toast.success('Đăng nhập thành công!');
      // Navigate based on user role
      const user = useUserStore.getState().user;
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      toast.error('Email hoặc mật khẩu không đúng!');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Chào mừng đến với Auto 88
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger className="cursor-pointer hover:bg-gray-100 transition-colors" value="login">Đăng nhập</TabsTrigger>
              <TabsTrigger className="cursor-pointer hover:bg-gray-100 transition-colors" value="demo">Tài khoản demo</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full cursor-pointer hover:bg-red-700 transition-colors" disabled={isLoading}>
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Chưa có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/auth/register')}
                    className="text-red-600 hover:text-red-700 font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              </div>
            </TabsContent>

            <TabsContent value="demo" className="space-y-4">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Tài khoản Admin</h3>
                  <p className="text-sm text-blue-700 mb-2">Email: admin@auto88.com</p>
                  <p className="text-sm text-blue-700">Mật khẩu: admin123</p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => {
                      setLoginData({ email: 'admin@auto88.com', password: 'admin123' });
                    }}
                  >
                    Sử dụng tài khoản Admin
                  </Button>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Tài khoản Khách hàng</h3>
                  <p className="text-sm text-green-700 mb-2">Email: user@auto88.com</p>
                  <p className="text-sm text-green-700">Mật khẩu: user123</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setLoginData({ email: 'user@auto88.com', password: 'user123' });
                    }}
                  >
                    Sử dụng tài khoản Khách hàng
                  </Button>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Tài khoản Khách hàng 2</h3>
                  <p className="text-sm text-purple-700 mb-2">Email: customer@auto88.com</p>
                  <p className="text-sm text-purple-700">Mật khẩu: customer123</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setLoginData({ email: 'customer@auto88.com', password: 'customer123' });
                    }}
                  >
                    Sử dụng tài khoản Khách hàng 2
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
