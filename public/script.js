const API = 'http://localhost:3000';
async function load() {
  const res = await fetch(API + '/todos');
  const data = await res.json();
  document.getElementById('list').innerHTML = data.map(t => `
    <div class="task-item ${t.done ? 'done' : ''}">
      <div class="task-content">
        <span class="task-id">#${t.id}</span>
        <span class="task-text">${t.task}</span>
      </div>
      <div class="task-actions">
        ${t.done ?
      '<span class="status-done">✓ Done</span>' :
      `<button class="btn-mark" onclick="mark(${t.id})">Mark Done</button>`
    }
      </div>
    </div>
  `).join('');
}
async function add() {
  const task = document.getElementById('task').value.trim();
  if (!task) return alert('Enter task');
  await fetch(API + '/todos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task }) });
  document.getElementById('task').value = ''; load();
}
async function mark(id) {
  await fetch(API + '/todos/' + id, { method: 'PATCH' });
  load();
}
document.getElementById('add').addEventListener('click', add);
load();
