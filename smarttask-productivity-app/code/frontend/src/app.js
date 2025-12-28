// Plain JS frontend for SmartTask
// Loads tasks from the backend and renders them into #root

const root = document.getElementById('root');
root.innerHTML = `
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">
    <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
      <header class="bg-gradient-to-r from-sky-500 to-indigo-600 text-white p-6">
        <h1 class="text-2xl font-extrabold">SmartTask</h1>
        <p class="text-sm opacity-90">Your simple task manager</p>
      </header>

      <main class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Tasks</h2>
          <span id="status-badge" class="text-sm text-slate-500">Loading…</span>
        </div>
        <div id="tasks-area"><p class="text-sm text-slate-500">Loading…</p></div>
      </main>

      <footer class="bg-slate-100 p-4 text-center text-sm text-slate-600">Built with care • Local demo</footer>
    </div>
  </div>
`;

const tasksArea = document.getElementById('tasks-area');

const apiBase = (import.meta && import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:8000';

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function (m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

function renderTasks(tasks) {
  if (!tasks || tasks.length === 0) {
    tasksArea.innerHTML = '<p class="text-sm text-slate-500">No tasks found.</p>';
    document.getElementById('status-badge').textContent = '';
    return;
  }

  const list = document.createElement('div');
  list.className = 'space-y-3';
  tasks.forEach(t => {
    const item = document.createElement('div');
    item.className = 'flex items-center justify-between p-3 border rounded-lg bg-white';
    const left = document.createElement('div');
    left.innerHTML = `<div class="font-medium text-slate-800">${escapeHtml(t.title)}</div>`;
    const right = document.createElement('div');
    right.innerHTML = t.completed ? '<span class="text-green-500">✅ Completed</span>' : '<span class="text-sm text-slate-400">Pending</span>';
    item.appendChild(left);
    item.appendChild(right);
    list.appendChild(item);
  });

  tasksArea.innerHTML = '';
  tasksArea.appendChild(list);
  document.getElementById('status-badge').textContent = '';
}

fetch(`${apiBase}/tasks/`)
  .then(res => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  })
  .then(data => renderTasks(data))
  .catch(err => {
    console.error('Failed to fetch tasks', err);
    tasksArea.innerHTML = '<p class="text-sm text-red-500">Failed to load tasks.</p>';
    document.getElementById('status-badge').textContent = 'Error';
  });
