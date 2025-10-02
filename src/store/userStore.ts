import { create } from 'zustand';

type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  phone?: string;
  address?: string;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string, phone?: string, address?: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'Admin Auto88',
    email: 'admin@auto88.com',
    password: 'admin123',
    role: 'admin' as const,
    phone: '0901234567',
    address: '123 Nguyễn Văn Linh, Quận 7, TP.HCM'
  },
  {
    id: 2,
    name: 'Nguyễn Văn A',
    email: 'user@auto88.com',
    password: 'user123',
    role: 'customer' as const,
    phone: '0907654321',
    address: '456 Lê Văn Việt, Quận 9, TP.HCM'
  },
  {
    id: 3,
    name: 'Trần Thị B',
    email: 'customer@auto88.com',
    password: 'customer123',
    role: 'customer' as const,
    phone: '0909876543',
    address: '789 Nguyễn Thị Minh Khai, Quận 1, TP.HCM'
  }
];

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: (email: string, password: string) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      set({ 
        user: userWithoutPassword, 
        isAuthenticated: true 
      });
      return true;
    }
    return false;
  },

  register: (name: string, email: string, password: string, phone?: string, address?: string) => {
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return false; // Email already exists
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      role: 'customer' as const,
      phone,
      address
    };

    // Add to mock users (in real app, this would be sent to API)
    mockUsers.push(newUser);

    // Auto login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    set({ 
      user: userWithoutPassword, 
      isAuthenticated: true 
    });
    return true;
  },

  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },

  updateProfile: (data: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ 
        user: { ...currentUser, ...data }
      });
    }
  }
}));
