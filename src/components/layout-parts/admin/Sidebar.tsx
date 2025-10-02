export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4 hidden md:block">
      <nav className="space-y-2">
        <a className="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</a>
        <a className="block px-3 py-2 rounded hover:bg-gray-100">Cars</a>
        <a className="block px-3 py-2 rounded hover:bg-gray-100">Orders</a>
        <a className="block px-3 py-2 rounded hover:bg-gray-100">Users</a>
      </nav>
    </aside>
  );
}
