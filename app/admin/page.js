"use client";

import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Orders");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No admin authentication token found. Please log in as admin.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders from backend");
      }

      const rawOrders = Array.isArray(data) ? data : data.orders || [];

      const formattedOrders = rawOrders.map((o) => {
        let currentStatus = o.orderStatus || o.status;
        if (!currentStatus) {
          if (o.isDelivered) {
            currentStatus = "Delivered";
          } else if (o.isCancelled) {
            currentStatus = "Cancelled";
          } else {
            currentStatus = "Pending";
          }
        }

        return {
          id: o._id,
          customerName:
            o.shippingAddress?.fullName ||
            o.shippingAddress?.name ||
            o.user?.name ||
            "Guest Customer",
          email: o.shippingAddress?.email || o.user?.email || "No email",
          phone: o.shippingAddress?.phone || "N/A",
          street: o.shippingAddress?.street || o.shippingAddress?.address || "",
          city: o.shippingAddress?.city || "",
          postalCode: o.shippingAddress?.postalCode || "",
          items: o.orderItems || [],
          totalAmount: Number(o.totalPrice || o.totalAmount || 0),
          paymentMethod: o.paymentMethod || "Card",
          date: o.createdAt
            ? new Date(o.createdAt).toLocaleDateString("en-US", {
                month: "numeric",
                day: "numeric",
                year: "numeric",
              })
            : new Date().toLocaleDateString(),
          status: currentStatus,
        };
      });

      setOrders(formattedOrders);
      setError("");
    } catch (err) {
      console.error("Admin Fetch Orders Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  const totalSales = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((acc, curr) => {
      const itemsCount = curr.items?.reduce(
        (sum, item) => sum + (Number(item.quantity) || 1),
        0
      );
      return acc + (itemsCount || 1);
    }, 0);

  const totalOrders = orders.length;

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    const previousOrders = [...orders];

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    try {
      const token = localStorage.getItem("token");

      let response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderStatus: newStatus,
          status: newStatus,
          isDelivered: newStatus === "Delivered",
          isCancelled: newStatus === "Cancelled",
        }),
      });

      if (!response.ok) {
        response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderStatus: newStatus,
            status: newStatus,
            isDelivered: newStatus === "Delivered",
            isCancelled: newStatus === "Cancelled",
          }),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save status in Database");
      }
    } catch (e) {
      console.error("Failed to update status on backend:", e);
      alert("Status save error: " + e.message);
      setOrders(previousOrders);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders =
    activeFilter === "All Orders"
      ? orders
      : orders.filter((o) => o.status === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-neutral-50/50 min-h-screen">
      <div className="border-b border-neutral-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-amber-800 font-bold">
            E-Commerce Control Panel
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1">
            Order Management System
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="px-3 py-1.5 bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors shadow-sm cursor-pointer"
          >
            ↻ Sync Live Data
          </button>
          <div className="text-xs text-emerald-700 font-mono font-bold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Database
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center justify-between">
          <span>⚠️ {error}</span>
          <button
            onClick={fetchOrders}
            className="underline text-rose-900 font-bold ml-2 cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Total Revenue
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-emerald-700 font-medium">
            ✓ Live calculated earnings
          </p>
        </div>

        <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Total Units Sold
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            {totalSales} <span className="text-xs font-sans text-neutral-500">Items</span>
          </p>
          <p className="text-[11px] text-neutral-500">Across active catalog</p>
        </div>

        <div className="bg-white p-6 border border-neutral-200 shadow-sm space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Total Orders
          </p>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900">
            {totalOrders}
          </p>
          <p className="text-[11px] text-amber-800 font-medium">
            {orders.filter((o) => o.status === "Pending").length} Pending fulfillment
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between border-b border-neutral-200 pb-4 mb-6 gap-4">
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900">
          Store Orders ({filteredOrders.length})
        </h2>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {["All Orders", "Pending", "Delivered", "Cancelled"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 sm:px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === filter
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-neutral-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-neutral-500 font-serif space-y-2">
            <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono uppercase tracking-wider">
              Fetching live store orders...
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-neutral-500 font-serif text-sm">
            No orders found matching status "{activeFilter}".
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-100/70 border-b border-neutral-200 text-neutral-800 font-bold uppercase tracking-wider">
                  <th className="py-4 px-5">Customer Details</th>
                  <th className="py-4 px-5">Delivery Address</th>
                  <th className="py-4 px-5">Ordered Products</th>
                  <th className="py-4 px-4 text-center">Total Qty</th>
                  <th className="py-4 px-5">Total Amount</th>
                  <th className="py-4 px-4">Order Date</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-5 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200/80 text-neutral-700">
                {filteredOrders.map((order) => {
                  const totalQty = order.items.reduce(
                    (sum, i) => sum + (Number(i.quantity) || 1),
                    0
                  );

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-neutral-50/80 transition-colors"
                    >
                      <td className="py-4 px-5 align-top max-w-[200px]">
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                            {order.customerName.charAt(0).toUpperCase()}
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-neutral-900 font-bold text-xs leading-tight">
                              {order.customerName}
                            </p>
                            <p className="text-neutral-500 text-[11px]">
                              📞 {order.phone}
                            </p>
                            {order.email && order.email !== "No email" && (
                              <p className="text-neutral-400 text-[10px] truncate max-w-[150px]">
                                ✉️ {order.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-5 align-top max-w-[180px]">
                        <div className="text-neutral-600 text-[11px] leading-relaxed space-y-0.5">
                          <p className="font-semibold text-neutral-800">
                            {order.street || "Standard Delivery"}
                          </p>
                          <p>
                            {order.city} {order.postalCode ? `(${order.postalCode})` : ""}
                          </p>
                        </div>
                      </td>

                      <td className="py-4 px-5 align-top max-w-[320px]">
                        <div className="flex flex-wrap gap-1.5">
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 border border-neutral-200/90 text-[11px] px-2.5 py-1 font-medium leading-snug"
                              >
                                <span>{item.title || item.name || "Product"}</span>
                                {item.selectedSize && (
                                  <span className="text-[9px] bg-neutral-200 px-1 py-0.2 font-mono uppercase font-bold text-neutral-700">
                                    {item.selectedSize}
                                  </span>
                                )}
                                <span className="text-amber-800 font-bold text-[10px]">
                                  ×{item.quantity || 1}
                                </span>
                              </span>
                            ))
                          ) : (
                            <span className="text-neutral-400 italic">No item list available</span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-center align-top font-bold text-xs text-neutral-900">
                        {totalQty || 1}
                      </td>

                      <td className="py-4 px-5 align-top">
                        <p className="font-bold text-neutral-900 text-sm font-mono">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                        <span className="text-[10px] text-neutral-400 font-mono uppercase">
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="py-4 px-4 align-top font-mono text-neutral-500 text-[11px] whitespace-nowrap">
                        {order.date}
                      </td>

                      <td className="py-4 px-4 text-center align-top whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            order.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              : order.status === "Pending"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-rose-100 text-rose-900 border border-rose-300"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right align-top whitespace-nowrap">
                        <select
                          value={order.status}
                          disabled={updatingId === order.id}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className="bg-white border border-neutral-300 text-xs font-bold text-neutral-900 px-3 py-1.5 focus:outline-none focus:border-neutral-900 cursor-pointer shadow-sm hover:border-neutral-400 disabled:opacity-50"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}