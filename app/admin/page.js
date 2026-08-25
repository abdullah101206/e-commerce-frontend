"use client";

import { useState } from "react";

const INITIAL_ORDERS = [
  {
    id: "ORD-9021",
    customerName: "Sophia Reynolds",
    phone: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace, Springfield, OR 97477",
    product: "Structured Tailored Blazer",
    quantity: 1,
    totalAmount: 280,
    date: "2026-08-10",
    status: "Pending",
  },
  {
    id: "ORD-9022",
    customerName: "Marcus Vance",
    phone: "+1 (555) 876-5432",
    address: "104 West 57th St, Apt 12B, New York, NY 10019",
    product: "Minimalist Linen Overshirt",
    quantity: 2,
    totalAmount: 280,
    date: "2026-08-09",
    status: "Delivered",
  },
  {
    id: "ORD-9023",
    customerName: "Elena Rostova",
    phone: "+1 (555) 345-6789",
    address: "450 Sutter Street, Suite 800, San Francisco, CA 94108",
    product: "Gold Rimmed Aviator Frame",
    quantity: 1,
    totalAmount: 195,
    date: "2026-08-08",
    status: "Cancelled",
  },
  {
    id: "ORD-9024",
    customerName: "Arthur Pendelton",
    phone: "+1 (555) 901-2345",
    address: "1200 Beacon St, Boston, MA 02446",
    product: "Monochrome Trench Coat",
    quantity: 1,
    totalAmount: 350,
    date: "2026-08-11",
    status: "Pending",
  },
];

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeFilter, setActiveFilter] = useState("All Orders");

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const totalSales = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((acc, curr) => acc + curr.quantity, 0);

  const totalOrders = orders.length;

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders =
    activeFilter === "All Orders"
      ? orders
      : orders.filter((o) => o.status === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Banner */}
      <div className="border-b border-neutral-200 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
            Management Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1">
            Admin Dashboard
          </h1>
        </div>
        <div className="text-xs text-neutral-500 font-mono">
          System Time: Aug 2026 | Live Store Status
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Total Revenue
          </p>
          <p className="font-serif text-3xl font-bold text-neutral-900">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-700">✓ Calculated from active orders</p>
        </div>

        <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Total Items Sold
          </p>
          <p className="font-serif text-3xl font-bold text-neutral-900">
            {totalSales} <span className="text-sm font-sans text-neutral-500">Units</span>
          </p>
          <p className="text-[11px] text-neutral-500">Across all categories</p>
        </div>

        <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Total Orders
          </p>
          <p className="font-serif text-3xl font-bold text-neutral-900">{totalOrders}</p>
          <p className="text-[11px] text-amber-800 font-medium">
            {orders.filter((o) => o.status === "Pending").length} Orders Pending Action
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-4 mb-6 gap-4">
        <h2 className="font-serif text-2xl font-bold text-neutral-900">Store Orders</h2>
        <div className="flex gap-2">
          {["All Orders", "Pending", "Delivered", "Cancelled"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === filter
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-neutral-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-900 font-bold uppercase tracking-wider">
              <th className="p-4">Customer Details</th>
              <th className="p-4">Delivery Address</th>
              <th className="p-4">Ordered Product</th>
              <th className="p-4 text-center">Qty</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Order Date</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 text-neutral-700">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="p-4 font-medium">
                    <p className="text-neutral-900 font-bold">{order.customerName}</p>
                    <p className="text-neutral-400 font-mono text-[11px]">{order.phone}</p>
                  </td>
                  <td className="p-4 max-w-xs text-neutral-600 leading-snug">
                    {order.address}
                  </td>
                  <td className="p-4 font-semibold text-neutral-900">{order.product}</td>
                  <td className="p-4 text-center font-bold">{order.quantity}</td>
                  <td className="p-4 font-bold text-neutral-900">${order.totalAmount}</td>
                  <td className="p-4 font-mono text-neutral-500">{order.date}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none ${
                        order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "Pending"
                          ? "bg-amber-100 text-amber-900"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-neutral-50 border border-neutral-200 text-xs font-semibold px-2.5 py-1.5 focus:outline-none focus:border-neutral-900 cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-8 text-center text-neutral-500 font-serif text-base">
                  No orders found matching status "{activeFilter}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}