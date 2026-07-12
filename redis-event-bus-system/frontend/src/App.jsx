const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/40">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Redis Event Bus
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Frontend is live with Vite and Tailwind CSS
        </h1>
        <p className="mt-4 text-lg text-slate-300">
          This React app is ready to connect to your backend event-driven workflow.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-cyan-500/15 px-4 py-2 text-sm text-cyan-300">
            React + Vite
          </span>
          <span className="rounded-full bg-fuchsia-500/15 px-4 py-2 text-sm text-fuchsia-300">
            Tailwind CSS
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
