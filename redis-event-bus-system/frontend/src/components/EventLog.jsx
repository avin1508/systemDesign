import { useEffect, useRef } from "react";
import { EventCard } from "./EventCard";

export const EventLog = ({ events }) => {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new events arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  if (events.length === 0) {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 rounded-xl border border-slate-800 bg-slate-900/30 p-8 text-center">
        <span className="text-5xl">📡</span>
        <p className="text-slate-400">
          Waiting for events…
        </p>
        <p className="text-xs text-slate-600">
          Events will appear here in real-time via Socket.IO
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 overflow-y-auto pr-2">
      {events.map((event, index) => (
        <EventCard key={event.eventId || index} event={event} index={index} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
