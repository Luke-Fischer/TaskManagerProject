import styles from './TaskList.module.css';

function TaskList({ tasks }) {
  if (tasks.length === 0) return <p className={styles.text}>No tasks yet.</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Task List</h2>
      <div>
        {tasks.map(task => (
          <div key={task.id} className={styles.taskCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{task.title}</h3>
                <select
                className={`${styles.statusDropdown} ${styles[task.status.toLowerCase()]}`}
                value={task.status}
                onChange={(e) => console.log(`Task ${task.id} status changed to`, e.target.value)}
                >
                <option value="Todo" className={styles.todo}>Todo</option>
                <option value="InProgress" className={styles.inprogress}>In Progress</option>
                <option value="Completed" className={styles.completed}>Completed</option>
                <option value="Blocked" className={styles.blocked}>Blocked</option>
                </select>


            </div>
            <p>{task.description}</p>
            <p>
              <strong>Assignee:</strong>{' '}
                <select className={styles.assigneeDropdown} value={task.assignee?.id || ''} onChange={() => {}}>
                <option value="" style={{ fontWeight: 'bold' }}>Unassigned</option>
                <option value="1" style={{ fontWeight: 'bold' }}>Jordan Lee (Project Manager)</option>
                <option value="2" style={{ fontWeight: 'bold' }}>Alex Kim (Engineer)</option>
                <option value="3" style={{ fontWeight: 'bold' }}>Taylor Smith (Designer)</option>
                </select>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;

