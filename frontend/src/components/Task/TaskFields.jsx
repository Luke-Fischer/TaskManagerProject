import styles from '../../styles/EditableTask.module.css';

function TaskFields({ title, setTitle, description, setDescription, status, setStatus, assigneeId, setAssigneeId, workers }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <input
          className={styles.editableInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className={`${styles.statusDropdown} ${styles[status.toLowerCase()]}`}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Todo" className={styles.todo}>Todo</option>
          <option value="InProgress" className={styles.inprogress}>In Progress</option>
          <option value="Completed" className={styles.completed}>Completed</option>
          <option value="Blocked" className={styles.blocked}>Blocked</option>
        </select>
      </div>

      <textarea
        className={styles.editableTextarea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <p>
        <strong>Assignee:</strong>{' '}
        <select
          value={assigneeId}
          onChange={(e) => {
            const val = e.target.value;
            setAssigneeId(val === "" ? "" : Number(val));
          }}
        >
          <option value="">Unassigned</option>
          {workers.map(w => (
            <option key={w.id} value={w.id}>
              {w.firstName} {w.lastName} ({w.jobTitle})
            </option>
          ))}
        </select>
      </p>
    </>
  );
}

export default TaskFields;
