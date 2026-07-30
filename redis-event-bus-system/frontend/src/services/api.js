const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const request = async (method, path, body) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || `HTTP ${response.status}`);
  }

  return data;
};

// ─── Orders ───────────────────────────────────────────────
export const createOrder = (payload) =>
  request("POST", "/orders", payload);

export const readyOrder = (orderId) =>
  request("POST", `/orders/${orderId}/ready`);

export const cancelOrder = (orderId) =>
  request("POST", `/orders/${orderId}/cancel`);

// ─── Payments ─────────────────────────────────────────────
export const paymentSuccess = (payload) =>
  request("POST", "/payments/success", payload);

export const paymentFailed = (payload) =>
  request("POST", "/payments/failed", payload);

// ─── Notifications ────────────────────────────────────────
export const sendEmail = (payload) =>
  request("POST", "/notifications/email", payload);

export const sendSMS = (payload) =>
  request("POST", "/notifications/sms", payload);
