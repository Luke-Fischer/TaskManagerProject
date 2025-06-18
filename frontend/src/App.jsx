import { useEffect, useState } from 'react';
import TaskList from './components/Task/TaskList';
import StatusFilter from './components/StatusFilter';
import CreateTaskModal from './components/CreateTaskModal';
import CreateWorkerModal from './components/CreateWorkerModal';
import { useWorkers } from './hooks/useWorker';
import api from './api';
import './styles/theme.css';
import styles from './styles/App.module.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showWorkerModal, setShowWorkerModal] = useState(false);

  const { workers } = useWorkers();

  useEffect(() => {
    // Load tasks once when the app mounts
    api.get('/tasks')
      .then(res => setTasks(res.data.data))
      .catch(err => console.error('Failed to fetch tasks', err));
  }, []);

  // Apply status filter if set
  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Task Manager</h1>

      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={() => setShowTaskModal(true)}
        >
          + New Task
        </button>
        <button
          className={styles.actionButton}
          onClick={() => setShowWorkerModal(true)}
        >
          + New Worker
        </button>
      </div>

      <StatusFilter currentFilter={filter} onFilterChange={setFilter} />
      <TaskList tasks={filteredTasks} setTasks={setTasks} workers={workers} />

      {/* Only show task modal if open */}
      {showTaskModal && (
        <CreateTaskModal
          onClose={() => setShowTaskModal(false)}
          onTaskCreated={(newTask) => {
            // Append the new task to the list
            setTasks(prev => [...prev, newTask]);
            setShowTaskModal(false);
          }}
        />
      )}

      {/* Only show worker modal if open */}
      {showWorkerModal && (
        <CreateWorkerModal
          onClose={() => setShowWorkerModal(false)}
        />
      )}
    </div>
  );
}

export default App;

