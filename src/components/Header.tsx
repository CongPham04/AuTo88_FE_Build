import { Car, Search, ShoppingCart, GitCompare, User, Menu, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface HeaderProps {
  user: any;
  cartCount: number;
  compareCount: number;
  onNavigate: (page: string) => void;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ user, cartCount, compareCount, onNavigate, onLogin, onLogout }: HeaderProps) {
  const menuItems = [
    { label: 'Trang chủ', page: 'home' },
    { label: 'Xe ô tô', page: 'cars' },
    { label: 'Tin tức', page: 'news' },
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Hotline: 1900-1234</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@auto88.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Showroom: 123 Nguyễn Văn Linh, Quận 7, TP.HCM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-red-600 p-2 rounded-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AUTO 88</h1>
              <p className="text-xs text-gray-500">Uy tín - Chất lượng - Giá tốt</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Compare */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('compare')}
              className="relative"
            >
              <GitCompare className="w-5 h-5" />
              {compareCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {compareCount}
                </Badge>
              )}
              <span className="hidden lg:inline ml-2">So sánh</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('cart')}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="hidden lg:inline ml-2">Giỏ hàng</span>
            </Button>

            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="w-5 h-5" />
                    <span className="hidden lg:inline ml-2">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    Thông tin cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    Đơn hàng của tôi
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onNavigate('admin')}>
                        Quản trị hệ thống
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onLogin} size="sm">
                <User className="w-4 h-4 mr-2" />
                Đăng nhập
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="space-y-4 mt-8">
                  {menuItems.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => onNavigate(item.page)}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}