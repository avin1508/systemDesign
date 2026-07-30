// Event type → visual config
const EVENT_CONFIG = {
  "order.created":      { label: "Order Created",   color: "green",  icon: "🟢" },
  "order.ready":        { label: "Order Ready",     color: "yellow", icon: "🟡" },
  "order.cancelled":    { label: "Order Cancelled", color: "red",    icon: "🔴" },
  "payment.success":    { label: "Payment Success", color: "green",  icon: "💚" },
  "payment.failed":     { label: "Payment Failed",  color: "red",    icon: "💔" },
  "notification.email": { label: "Email Sent",      color: "blue",   icon: "📧" },
  "notification.sms":   { label: "SMS Sent",        color: "purple", icon: "📱" },
};

const COLOR_CLASSES = {
  green:  "border-green-500/50 bg-green-500/5",
  yellow: "border-yellow-500/50 bg-yellow-500/5",
  red:    "border-red-500/50 bg-red-500/5",
  blue:   "border-blue-500/50 bg-blue-500/5",
  purple: "border-purple-500/50 bg-purple-500/5",
  slate:  "border-slate-500/50 bg-slate-500/5",
};

const timeAgo = (timestamp) => {
  if (!timestamp) return "just now";
  const date = new Date(timestamp);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
};

const Badge = ({ color, icon, label }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium
                border-${color}-500/30 text-${color}-400`}
  >
    <span>{icon}</span>
    {label}
  </span>
);

export const EventCard = ({ event, index }) => {
  const config = EVENT_CONFIG[event.type] || {
    label: event.type,
    color: "slate",
    icon: "⚪",
  };

  const colorClass = COLOR_CLASSES[config.color] || COLOR_CLASSES.slate;
  const timeStr = timeAgo(event.timestamp);

  return (
    <div
      className={`rounded-xl border p-4 text-sm shadow-sm transition-all
                  ${colorClass} animate-fade-in`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <Badge color={config.color} icon={config.icon} label={config.label} />
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-mono">#{index + 1}</span>
          {event.server && (
            <>
              <span>•</span>
              <span className="font-mono">{event.server}</span>
            </>
          )}
          <span>•</span>
          <span>{timeStr}</span>
        </div>
      </div>

      <pre className="overflow-x-auto rounded-md bg-slate-900/50 p-2.5 text-xs text-slate-300">
        {JSON.stringify(event, null, 2)}
      </pre>
    </div>
  );
};
