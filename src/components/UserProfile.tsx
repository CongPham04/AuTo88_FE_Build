import { useState } from 'react';
import { User, Package, Heart, Settings, Edit, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfileProps {
  user: any;
}

export function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: '0901234567',
    address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM',
    birthday: '01/01/1990'
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Mock order data
  const orders = [
    {
      id: 'DH001',
      date: '2024-01-15',
      status: 'Đã giao',
      total: 1250000000,
      items: [
        {
          id: 1,
          name: 'Toyota Camry 2024',
          color: 'Trắng',
          quantity: 1,
          price: 1250000000,
          image: 'https://images.unsplash.com/photo-1577697071530-928b014eebd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBjYW1yeSUyMGNhciUyMHNob3dyb29tfGVufDF8fHx8MTc1OTIxNTczOHww&ixlib=rb-4.1.0&q=80&w=200'
        }
      ]
    },
    {
      id: 'DH002',
      date: '2024-01-20',
      status: 'Đang xử lý',
      total: 890000000,
      items: [
        {
          id: 2,
          name: 'Honda Civic 2024',
          color: 'Đỏ',
          quantity: 1,
          price: 890000000,
          image: 'https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljfGVufDF8fHx8MTc1OTIxNTc0MXww&ixlib=rb-4.1.0&q=80&w=200'
        }
      ]
    }
  ];

  // Mock wishlist data
  const wishlist = [
    {
      id: 3,
      name: 'Ford Explorer 2024',
      price: 2150000000,
      image: 'https://images.unsplash.com/photo-1653813893853-be3e6ecfe061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2fGVufDF8fHx8MTc1OTIxNTc0NXww&ixlib=rb-4.1.0&q=80&w=200'
    },
    {
      id: 4,
      name: 'Mercedes C-Class 2024',
      price: 1850000000,
      image: 'https://images.unsplash.com/photo-1722088354078-89415751076c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGJlbnolMjBzZWRhbnxlbnwxfHx8fDE3NTkyMTU3NDh8MA&ixlib=rb-4.1.0&q=80&w=200'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã giao':
        return 'bg-green-600';
      case 'Đang giao':
        return 'bg-blue-600';
      case 'Đang xử lý':
        return 'bg-yellow-600';
      case 'Đã hủy':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tài khoản của tôi</h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân và đơn hàng</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{user.email}</p>
                <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                  {user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">
                  <User className="w-4 h-4 mr-2" />
                  Thông tin cá nhân
                </TabsTrigger>
                <TabsTrigger value="orders">
                  <Package className="w-4 h-4 mr-2" />
                  Đơn hàng
                </TabsTrigger>
                <TabsTrigger value="wishlist">
                  <Heart className="w-4 h-4 mr-2" />
                  Yêu thích
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Thông tin cá nhân</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Họ và tên</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthday">Ngày sinh</Label>
                        <Input
                          id="birthday"
                          value={profileData.birthday}
                          onChange={(e) => setProfileData({ ...profileData, birthday: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Địa chỉ</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    {isEditing && (
                      <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Hủy
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          Lưu thay đổi
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch sử đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-semibold">Đơn hàng #{order.id}</h3>
                                <p className="text-sm text-gray-600">
                                  Ngày đặt: {formatDate(order.date)}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status}
                                </Badge>
                                <p className="text-lg font-bold text-red-600 mt-1">
                                  {formatPrice(order.total)}
                                </p>
                              </div>
                            </div>

                            <Separator className="mb-4" />

                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                  <div className="w-16 h-12 overflow-hidden rounded">
                                    <ImageWithFallback
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-gray-600">
                                      Màu: {item.color} • Số lượng: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">{formatPrice(item.price)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-end mt-4 space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                Xem chi tiết
                              </Button>
                              {order.status === 'Đang xử lý' && (
                                <Button variant="outline" size="sm">
                                  Hủy đơn hàng
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Bạn chưa có đơn hàng nào</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>Danh sách yêu thích</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {wishlist.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {wishlist.map((item) => (
                          <div key={item.id} className="border rounded-lg p-4">
                            <div className="aspect-video overflow-hidden rounded-lg mb-4">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <p className="text-red-600 font-bold text-lg mb-4">
                              {formatPrice(item.price)}
                            </p>
                            <div className="flex space-x-2">
                              <Button size="sm" className="flex-1">
                                Xem chi tiết
                              </Button>
                              <Button variant="outline" size="sm">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Danh sách yêu thích trống</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}