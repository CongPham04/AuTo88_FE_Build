export const mockCars = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 1250000000,
    originalPrice: 1350000000,
    mileage: 0,
    fuelType: 'Xăng',
    transmission: 'Tự động',
    condition: 'Mới',
    category: 'Sedan',
    colors: ['Trắng', 'Đen', 'Bạc', 'Xanh'],
    selectedColor: 'Trắng',
    inStock: true,
    stockCount: 5,
    image: 'https://images.unsplash.com/photo-1577697071530-928b014eebd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBjYW1yeSUyMGNhciUyMHNob3dyb29tfGVufDF8fHx8MTc1OTIxNTczOHww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1577697071530-928b014eebd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBjYW1yeSUyMGNhciUyMHNob3dyb29tfGVufDF8fHx8MTc1OTIxNTczOHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Toyota Camry 2024 hoàn toàn mới với thiết kế hiện đại, động cơ mạnh mẽ và tiết kiệm nhiên liệu.',
    features: ['Camera lùi', 'Bluetooth', 'Cruise Control', 'Cổng USB', 'Màn hình cảm ứng', 'Cảnh báo điểm mù'],
    specs: {
      engine: '2.5L 4-cylinder',
      power: '206 HP',
      torque: '247 Nm',
      fuelConsumption: '7.8L/100km',
      seats: 5,
      weight: '1590 kg',
      length: '4885 mm',
      width: '1840 mm',
      height: '1445 mm'
    },
    promotion: 'Giảm 100 triệu + Tặng bảo hiểm'
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2024,
    price: 890000000,
    mileage: 0,
    fuelType: 'Xăng',
    transmission: 'Tự động',
    condition: 'Mới',
    category: 'Sedan',
    colors: ['Đỏ', 'Trắng', 'Đen', 'Xanh'],
    selectedColor: 'Đỏ',
    inStock: true,
    stockCount: 3,
    image: 'https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljfGVufDF8fHx8MTc1OTIxNTc0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGNpdmljfGVufDF8fHx8MTc1OTIxNTc0MXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: 'Honda Civic thế hệ mới với thiết kế thể thao, công nghệ Honda SENSING tiên tiến.',
    features: ['Honda SENSING', 'Màn hình 9 inch', 'Sạc không dây', 'Điều hòa tự động'],
    specs: {
      engine: '1.5L Turbo',
      power: '182 HP',
      torque: '240 Nm',
      fuelConsumption: '6.9L/100km',
      seats: 5,
      weight: '1370 kg',
      length: '4674 mm',
      width: '1802 mm',
      height: '1415 mm'
    }
  },
  {
    id: 3,
    make: 'Ford',
    model: 'Explorer',
    year: 2024,
    price: 2150000000,
    mileage: 0,
    fuelType: 'Xăng',
    transmission: 'Tự động',
    condition: 'Mới',
    category: 'SUV',
    colors: ['Đen', 'Trắng', 'Xanh', 'Nâu'],
    selectedColor: 'Đen',
    inStock: true,
    stockCount: 2,
    image: 'https://images.unsplash.com/photo-1653813893853-be3e6ecfe061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2fGVufDF8fHx8MTc1OTIxNTc0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1653813893853-be3e6ecfe061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JkJTIwc3V2fGVufDF8fHx8MTc1OTIxNTc0NXww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: 'Ford Explorer SUV 7 chỗ cao cấp với công nghệ 4WD và không gian rộng rãi.',
    features: ['4WD', '7 chỗ ngồi', 'Cửa sổ trời', 'Hệ thống âm thanh B&O'],
    specs: {
      engine: '3.0L EcoBoost V6',
      power: '400 HP',
      torque: '563 Nm',
      fuelConsumption: '10.2L/100km',
      seats: 7,
      weight: '2050 kg',
      length: '5050 mm',
      width: '2004 mm',
      height: '1778 mm'
    }
  },
  {
    id: 4,
    make: 'Mercedes',
    model: 'C-Class',
    year: 2024,
    price: 1850000000,
    mileage: 0,
    fuelType: 'Xăng',
    transmission: 'Tự động',
    condition: 'Mới',
    category: 'Sedan',
    colors: ['Bạc', 'Đen', 'Trắng', 'Xanh'],
    selectedColor: 'Bạc',
    inStock: true,
    stockCount: 1,
    image: 'https://images.unsplash.com/photo-1722088354078-89415751076c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGJlbnolMjBzZWRhbnxlbnwxfHx8fDE3NTkyMTU3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gallery: [
      'https://images.unsplash.com/photo-1722088354078-89415751076c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGJlbnolMjBzZWRhbnxlbnwxfHx8fDE3NTkyMTU3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    description: 'Mercedes-Benz C-Class sang trọng với công nghệ MBUX và hệ thống an toàn tiên tiến.',
    features: ['MBUX', 'Ghế massage', 'Hệ thống âm thanh Burmester', 'Điều hòa 4 vùng'],
    specs: {
      engine: '2.0L Turbo',
      power: '255 HP',
      torque: '400 Nm',
      fuelConsumption: '8.5L/100km',
      seats: 5,
      weight: '1665 kg',
      length: '4751 mm',
      width: '1820 mm',
      height: '1437 mm'
    }
  },
  {
    id: 5,
    make: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    price: 995000000,
    mileage: 0,
    fuelType: 'Xăng',
    transmission: 'Tự động',
    condition: 'Mới',
    category: 'SUV',
    colors: ['Trắng', 'Đen', 'Đỏ', 'Bạc'],
    selectedColor: 'Trắng',
    inStock: true,
    stockCount: 4,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Hyundai Tucson thế hệ mới với thiết kế đột phá và công nghệ SmartSense.',
    features: ['SmartSense', 'Sạc không dây', 'Cửa sổ trời panorama', 'Hệ thống Bose'],
    specs: {
      engine: '2.0L',
      power: '156 HP',
      torque: '192 Nm',
      fuelConsumption: '7.8L/100km',
      seats: 5,
      weight: '1670 kg',
      length: '4630 mm',
      width: '1865 mm',
      height: '1665 mm'
    },
    promotion: 'Ưu đãi lãi suất 0% + Phụ kiện'
  }
];

export const mockNews = [
  {
    id: 1,
    title: 'Toyota Camry 2024 chính thức ra mắt tại Việt Nam',
    summary: 'Mẫu sedan hạng D được nâng cấp toàn diện với nhiều công nghệ hiện đại.',
    content: 'Toyota Camry 2024 được trang bị động cơ 2.5L mới, hộp số tự động 8 cấp và hàng loạt tính năng an toàn Toyota Safety Sense 2.0...',
    image: 'https://images.unsplash.com/photo-1577697071530-928b014eebd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lvdGElMjBjYW1yeSUyMGNhciUyMHNob3dyb29tfGVufDF8fHx8MTc1OTIxNTczOHww&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-01-15',
    category: 'Ra mắt xe mới'
  },
  {
    id: 2,
    title: 'Khuyến mãi đặc biệt tháng 1: Giảm giá lên đến 200 triệu',
    summary: 'Chương trình ưu đãi hấp dẫn cho khách hàng mua xe trong tháng 1.',
    content: 'Auto 88 triển khai chương trình khuyến mãi đầu năm với mức giảm giá lên đến 200 triệu đồng cho các dòng xe...',
    image: 'https://images.unsplash.com/photo-1643142314913-0cf633d9bbb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBkZWFsZXJzaGlwJTIwc2hvd3Jvb218ZW58MXx8fHwxNzU5MTg5Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    date: '2024-01-10',
    category: 'Khuyến mãi'
  }
];
