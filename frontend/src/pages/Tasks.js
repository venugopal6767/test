import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', { title, description }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTitle('');
    setDescription('');
    fetchTasks();
  };

  const toggleTask = async (id, status) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, { status: !status }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">My Tasks</h1>
      <form onSubmit={addTask} className="mb-4">
        <input className="border p-2 mr-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="border p-2 mr-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </form>
      <ul>
        {tasks.map(t => (
          <li key={t.id} className="flex justify-between p-2 border-b">
            <span className={t.status ? "line-through" : ""}>{t.title} - {t.description}</span>
            <div>
              <button className="mr-2 text-sm text-green-600" onClick={() => toggleTask(t.id, t.status)}>
                {t.status ? "Undo" : "Complete"}
              </button>
              <button className="text-sm text-red-600" onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}