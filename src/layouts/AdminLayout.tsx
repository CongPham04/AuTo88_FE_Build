import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/layout-parts/admin/AdminHeader";
import Sidebar from "@/components/layout-parts/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
