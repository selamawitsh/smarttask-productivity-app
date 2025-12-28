import React, { useEffect, useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");

  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(`${apiBase}/tasks/`)
      .then((res) => res.json())
      .then(setTasks)
      .finally(() => setLoading(false));
  };

  const addTask = (e) => {
    e.preventDefault();
    fetch(`${apiBase}/tasks/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks((prev) => [...prev, newTask]);
        setTitle("");
      });
  };

  const toggleComplete = (id) => {
    fetch(`${apiBase}/tasks/${id}/toggle/`, { method: "POST" })
      .then(() => fetchTasks());
  };

  const deleteTask = (id) => {
    fetch(`${apiBase}/tasks/${id}/delete/`, { method: "DELETE" })
      .then(() => fetchTasks());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold">SmartTask</h1>
          <p className="text-gray-500">Your simple task manager</p>
        </header>

        {/* Add Task */}
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            className="flex-1 border rounded-lg px-3 py-2"
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button className="bg-black text-white px-4 rounded-lg">Add</button>
        </form>

        {/* Tasks */}
        {loading ? (
          <p className="text-center text-gray-400">Loading…</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-400">No tasks found.</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li
                key={t.id}
                className={`flex justify-between items-center bg-gray-50 border rounded-lg px-4 py-3 ${
                  t.completed ? "line-through text-gray-400" : ""
                }`}
              >
                <span>{t.title}</span>
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => toggleComplete(t.id)}
                  >
                    {t.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteTask(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <footer className="text-center text-sm text-gray-400 mt-6">
          Built with care • Local demo
        </footer>
      </div>
    </div>
  );
};

export default App;
