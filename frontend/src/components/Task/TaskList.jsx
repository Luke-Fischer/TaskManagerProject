import styles from '../../styles/TaskList.module.css';
import EditableTask from './EditableTask';

function TaskList({ tasks, setTasks, workers }) {
  if (tasks.length === 0) return <p className={styles.text}>No tasks yet.</p>;

  // Update a task in state after edits
  const handleTaskUpdate = (updatedTask) => {
    setTasks(prev =>
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Task List</h2>
      <div>
        {tasks.map(task => (
          <EditableTask key={task.id} task={task} onTaskUpdate={handleTaskUpdate} workers={workers} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
