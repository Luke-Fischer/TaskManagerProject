import { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import api from './api';
import StatusFilter from './components/StatusFilter';
import './styles/theme.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data.data))
      .catch(err => console.error('Failed to fetch tasks', err));
  }, []);

  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#facc15' }}>Task Manager</h1>
      <StatusFilter currentFilter={filter} onFilterChange={setFilter} />
      <TaskList tasks={filteredTasks} />
    </div>
  );
}

export default App;

