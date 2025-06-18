import { useState } from 'react';
import styles from '../styles/CreateTaskModal.module.css';
import { createTask } from '../api';
import { useWorkers } from '../hooks/useWorker';

function CreateTaskModal({ onClose, onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [assigneeId, setAssigneeId] = useState('');

  // Fetch current list of workers for dropdown
  const { workers } = useWorkers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, description, status, workerId: assigneeId || null, };

    try {
      const res = await createTask(payload);
      // Let parent update task list
      onTaskCreated(res.data.data);
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Todo">Todo</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
          <label style={{ color: '#fff' }}>Assignee</label>
            <select
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', width: '100%' }}
            >
            <option value="">Unassigned</option>
            {workers.map(w => (
                <option key={w.id} value={w.id}>
                {w.firstName} {w.lastName} ({w.jobTitle})
                </option>
            ))}
            </select>
          <div className={styles.actions}>
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal;
