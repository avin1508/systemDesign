import { useState, useEffect } from "react";
import { EventLog } from "../components/EventLog";
import {
  connectSocket,
  onEvent,
  disconnectSocket,
} from "../services/socket";
import {
  createOrder,
  readyOrder,
  cancelOrder,
  paymentSuccess,
  paymentFailed,
  sendEmail,
  sendSMS,
} from "../services/api";

const SOCKET_EVENTS = [
  "order.created",
  "order.ready",
  "order.cancelled",
  "payment.success",
  "payment.failed",
  "notification.email",
  "notification.sms",
];

// ─── Reusable Input ──────────────────────────────────────
const Input = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="block text-xs font-medium text-slate-400 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
    />
  </div>
);

// ─── Reusable Form Section ─────────────────────────────────
const FormSection = ({ title, fields, onSubmit, submitLabel, loading }) => {
  const [formData, setFormData] = useState(
    fields.reduce(
      (acc, f) => ({ ...acc, [f.name]: f.default || "" }),
      {}
    )
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-xl border border-slate-800 bg-slate-900/30 p-4"
    >
      <h3 className="mb-3 text-sm font-semibold text-cyan-400">{title}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <Input
            key={f.name}
            label={f.label}
            name={f.name}
            value={formData[f.name]}
            onChange={handleChange}
            placeholder={f.placeholder}
          />
        ))}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-3 w-full rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-500/30 disabled:opacity-50"
      >
        {loading ? "Publishing…" : submitLabel}
      </button>
    </form>
  );
};

// ─── Dashboard ───────────────────────────────────────────
const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [socketStatus, setSocketStatus] = useState("disconnected");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);

  // ─── Socket.IO ────────────────────────────────────────
  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect", () => setSocketStatus("connected"));
    socket.on("disconnect", () => setSocketStatus("disconnected"));

    SOCKET_EVENTS.forEach((eventName) => {
      onEvent(eventName, (data) => {
        setEvents((prev) => [
          {
            type: eventName,
            timestamp: new Date().toISOString(),
            ...data,
          },
          ...prev,
        ]);
      });
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  // ─── API Helper ────────────────────────────────────────
  const handleApiCall = async (apiFn, payload, msg) => {
    setLoading(msg);
    setMessage({ type: "loading", text: msg });
    try {
      await apiFn(payload);
      setMessage({ type: "success", text: `${msg} — event published!` });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(null);
    }
  };

  // ─── Handlers ────────────────────────────────────────
  const handleCreateOrder = (data) => {
    let items = [];
    if (data.items) {
      try {
        items = JSON.parse(data.items);
      } catch {
        items = [{ name: data.items, qty: 1 }];
      }
    }
    handleApiCall(
      createOrder,
      {
        orderId: data.orderId || `ORD-${Date.now()}`,
        customerName: data.customerName,
        items,
      },
      "Order Created"
    );
  };

  const handleReadyOrder = (data) =>
    handleApiCall(readyOrder, data.orderId, "Order Ready");

  const handleCancelOrder = (data) =>
    handleApiCall(cancelOrder, data.orderId, "Order Cancelled");

  const handlePaymentSuccess = (data) =>
    handleApiCall(
      paymentSuccess,
      {
        orderId: data.orderId,
        amount: parseFloat(data.amount),
        method: data.method,
      },
      "Payment Success"
    );

  const handlePaymentFailed = (data) =>
    handleApiCall(
      paymentFailed,
      { orderId: data.orderId, reason: data.reason },
      "Payment Failed"
    );

  const handleSendEmail = (data) =>
    handleApiCall(
      sendEmail,
      {
        orderId: data.orderId,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        subject: data.subject,
        message: data.message,
      },
      "Email Sent"
    );

  const handleSendSMS = (data) =>
    handleApiCall(
      sendSMS,
      {
        orderId: data.orderId,
        customerName: data.customerName,
        phoneNumber: data.phoneNumber,
        message: data.message,
      },
      "SMS Sent"
    );

  const clearEvents = () => setEvents([]);

  // ─── Render ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Redis Event Bus Dashboard</h1>
            <p className="text-sm text-slate-500">
              Real-time event monitoring & publishing
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={clearEvents}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-800"
            >
              Clear Events
            </button>
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  socketStatus === "connected"
                    ? "bg-green-400"
                    : "bg-red-400"
                }`}
              />
              <span className="text-xs text-slate-400">
                Socket.IO: {socketStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 rounded-lg p-3 text-sm ${
              message.type === "error"
                ? "bg-red-500/10 text-red-400"
                : message.type === "success"
                ? "bg-green-500/10 text-green-400"
                : "bg-cyan-500/10 text-cyan-400"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Forms */}
          <div className="space-y-6 xl:col-span-2">
            {/* Order Management */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-slate-300">
                📦 Order Management
              </h2>
              <FormSection
                title="Create Order"
                fields={[
                  {
                    name: "customerName",
                    label: "Customer Name",
                    placeholder: "John Doe",
                  },
                  {
                    name: "orderId",
                    label: "Order ID",
                    placeholder: "ORD-123 (auto if empty)",
                  },
                  {
                    name: "items",
                    label: "Items (JSON)",
                    placeholder: '[{"name":"Burger","qty":2}]',
                  },
                ]}
                onSubmit={handleCreateOrder}
                submitLabel="Publish Order Created"
                loading={loading === "Order Created"}
              />
              <FormSection
                title="Ready Order"
                fields={[
                  {
                    name: "orderId",
                    label: "Order ID",
                    placeholder: "ORD-123",
                  },
                ]}
                onSubmit={handleReadyOrder}
                submitLabel="Publish Order Ready"
                loading={loading === "Order Ready"}
              />
              <FormSection
                title="Cancel Order"
                fields={[
                  {
                    name: "orderId",
                    label: "Order ID",
                    placeholder: "ORD-123",
                  },
                ]}
                onSubmit={handleCancelOrder}
                submitLabel="Publish Order Cancelled"
                loading={loading === "Order Cancelled"}
              />
            </div>

            {/* Payment Processing */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-slate-300">
                💳 Payment Processing
              </h2>
              <FormSection
                title="Payment Success"
                fields={[
                  {
                    name: "orderId",
                    label: "Order ID",
                    placeholder: "ORD-123",
                  },
                  {
                    name: "amount",
                    label: "Amount",
                    placeholder: "99.99",
                  },
                  {
                    name: "method",
                    label: "Method",
                    placeholder: "credit_card",
                  },
                ]}
                onSubmit={handlePaymentSuccess}
                submitLabel="Publish Payment Success"
                loading={loading === "Payment Success"}
              />
              <FormSection
                title="Payment Failed"
                fields={[
                  {
                    name: "orderId",
                    label: "Order ID",
                    placeholder: "ORD-123",
                  },
                  {
                    name: "reason",
                    label: "Reason",
                    placeholder: "Insufficient funds",
                  },
                ]}
                onSubmit={handlePaymentFailed}
                submitLabel="Publish Payment Failed"
                loading={loading === "Payment Failed"}
              />
            </div>

            {/* Notifications */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-slate-300">
                📨 Notifications
              </h2>
              <FormSection
                title="Send Email"
                fields={[
                  {
                    name: "orderId",
                    label: "Order ID",
                    placeholder: "ORD-123",
                  },
                  {
                    name: "customerName",
                    label: "Customer Name",
                    placeholder: "John Doe",
                  },
                  {
                    name: "customerEmail",
                    label: "Email",
                    placeholder: "john@example.com",
                  },
                  {
                    name: "subject",
                    label: "Subject",
                    placeholder: "Order Confirmation",
                  },
                  {
                    name: "message",
                    label: "Message",
                    placeholder: "Your order has been placed.",
                  },
                ]}
                onSubmit={handleSendEmail}
                submitLabel="Publish Email Notification"
                loading={loading === "Email Sent"}
              />
              <FormSection
                title="Send SMS"
                fields={[
                  {
                    name: "orderId",
                    label: "Order ID",
                    placeholder: "ORD-123",
                  },
                  {
                    name: "customerName",
                    label: "Customer Name",
                    placeholder: "John Doe",
                  },
                  {
                    name: "phoneNumber",
                    label: "Phone",
                    placeholder: "+919876543210",
                  },
                  {
                    name: "message",
                    label: "Message",
                    placeholder: "Your order has been placed.",
                  },
                ]}
                onSubmit={handleSendSMS}
                submitLabel="Publish SMS Notification"
                loading={loading === "SMS Sent"}
              />
            </div>
          </div>

          {/* Event Log */}
          <div className="xl:col-span-1">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-300">
                📡 Event Log
              </h2>
              <span className="text-xs text-slate-500">
                {events.length} events
              </span>
            </div>
            <div className="h-[600px]">
              <EventLog events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
