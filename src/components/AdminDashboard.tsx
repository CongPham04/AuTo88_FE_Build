import { useState } from 'react';
import { Car, Users, Package, TrendingUp, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AdminDashboardProps {
  cars: any[];
  news: any[];
}

export function AdminDashboard({ cars, news }: AdminDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  // Mock statistics
  const stats = [
    {
      title: 'Tổng xe trong kho',
      value: '156',
      change: '+12%',
      icon: Car,
      color: 'text-blue-600'
    },
    {
      title: 'Đơn hàng tháng này',
      value: '48',
      change: '+23%',
      icon: Package,
      color: 'text-green-600'
    },
    {
      title: 'Khách hàng mới',
      value: '127',
      change: '+8%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Doanh thu tháng',
      value: '15.2 tỷ',
      change: '+18%',
      icon: TrendingUp,
      color: 'text-red-600'
    }
  ];

  // Mock orders
  const orders = [
    {
      id: 'DH001',
      customer: 'Nguyễn Văn A',
      car: 'Toyota Camry 2024',
      date: '2024-01-15',
      status: 'Đã giao',
      total: 1250000000
    },
    {
      id: 'DH002',
      customer: 'Trần Thị B',
      car: 'Honda Civic 2024',
      date: '2024-01-20',
      status: 'Đang xử lý',
      total: 890000000
    },
    {
      id: 'DH003',
      customer: 'Lê Văn C',
      car: 'Ford Explorer 2024',
      date: '2024-01-22',
      status: 'Đang giao',
      total: 2150000000
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản trị hệ thống</h1>
          <p className="text-gray-600">Bảng điều khiển Auto 88</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="cars">Quản lý xe</TabsTrigger>
            <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
            <TabsTrigger value="news">Tin tức</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-sm text-green-600">{stat.change}</p>
                        </div>
                        <IconComponent className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recent orders */}
            <Card>
              <CardHeader>
                <CardTitle>Đơn hàng gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">#{order.id} - {order.customer}</h4>
                        <p className="text-sm text-gray-600">{order.car}</p>
                        <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cars" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quản lý xe</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm xe mới
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4">Hình ảnh</th>
                        <th className="text-left p-4">Tên xe</th>
                        <th className="text-left p-4">Giá</th>
                        <th className="text-left p-4">Tồn kho</th>
                        <th className="text-left p-4">Trạng thái</th>
                        <th className="text-left p-4">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cars.map((car) => (
                        <tr key={car.id} className="border-b">
                          <td className="p-4">
                            <ImageWithFallback
                              src={car.image}
                              alt={`${car.make} ${car.model}`}
                              className="w-16 h-12 object-cover rounded"
                            />
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{car.make} {car.model} {car.year}</p>
                              <p className="text-sm text-gray-600">{car.category}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="font-medium text-red-600">{formatPrice(car.price)}</p>
                          </td>
                          <td className="p-4">
                            <Badge variant={car.stockCount > 3 ? "default" : "destructive"}>
                              {car.stockCount} xe
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge className={car.inStock ? "bg-green-600" : "bg-red-600"}>
                              {car.inStock ? 'Còn hàng' : 'Hết hàng'}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>
              <div className="flex space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Lọc theo trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="pending">Đang xử lý</SelectItem>
                    <SelectItem value="shipping">Đang giao</SelectItem>
                    <SelectItem value="completed">Đã giao</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4">Mã đơn</th>
                        <th className="text-left p-4">Khách hàng</th>
                        <th className="text-left p-4">Sản phẩm</th>
                        <th className="text-left p-4">Ngày đặt</th>
                        <th className="text-left p-4">Tổng tiền</th>
                        <th className="text-left p-4">Trạng thái</th>
                        <th className="text-left p-4">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="p-4">
                            <p className="font-medium">#{order.id}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-medium">{order.customer}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm">{order.car}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm">{formatDate(order.date)}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-medium text-red-600">{formatPrice(order.total)}</p>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm người dùng
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Chức năng quản lý người dùng sẽ được phát triển</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Quản lý tin tức</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm bài viết
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {news.map((article) => (
                <Card key={article.id}>
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <ImageWithFallback
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={article.category === 'Khuyến mãi' ? 'destructive' : 'secondary'}>
                          {article.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Xem
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Sửa
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}