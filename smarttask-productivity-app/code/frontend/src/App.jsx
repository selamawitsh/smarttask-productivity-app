import React, { useEffect, useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
    fetch(`${apiBase}/tasks/`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">SmartTask</h1>
          <p className="text-gray-500 mt-1">
            Your simple task manager
          </p>
        </header>

        {/* Main */}
        <main>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Tasks
          </h2>

          {loading ? (
            <p className="text-gray-400 text-center">Loading…</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-400 text-center">
              No tasks found.
            </p>
          ) : (
            <ul className="space-y-3">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-3 hover:shadow-sm transition"
                >
                  <span
                    className={`font-medium ${
                      t.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {t.title}
                  </span>

                  {t.completed && <span>✅</span>}
                </li>
              ))}
            </ul>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 mt-6">
          Built with care • Local demo
        </footer>
      </div>
    </div>
  );
};

export default App;

