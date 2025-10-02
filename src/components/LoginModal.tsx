import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Separator } from "./ui/separator";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onLogin,
}: LoginModalProps) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(loginData.email, loginData.password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      registerData.password !== registerData.confirmPassword
    ) {
      alert("Mật khẩu không khớp!");
      return;
    }
    // Handle registration logic here
    onLogin(registerData.email, registerData.password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Chào mừng đến với Auto 88
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Đăng nhập</TabsTrigger>
            <TabsTrigger value="register">Đăng ký</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="example@email.com"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="login-password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>

              <div className="text-center">
                <Button variant="link" size="sm">
                  Quên mật khẩu?
                </Button>
              </div>
            </form>

            <Separator />

            <div className="text-center text-sm text-gray-600">
              <p>Tài khoản demo:</p>
              <p>Admin: admin@auto88.com / password</p>
              <p>Khách hàng: user@auto88.com / password</p>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form
              onSubmit={handleRegister}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="register-name">Họ và tên</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="example@email.com"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-phone">
                  Số điện thoại
                </Label>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="0901234567"
                  value={registerData.phone}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      phone: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-password">
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password">
                  Xác nhận mật khẩu
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    placeholder="Nhập lại mật khẩu"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword,
                      )
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Đăng ký
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}