import { Outlet } from "react-router-dom";
import Header from "@/components/layout-parts/user/Header";
import Footer from "@/components/layout-parts/user/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
