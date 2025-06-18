import styles from '../../styles/EditableTask.module.css';

function TaskActions({ onSave, onCancel, onDelete, showSaveCancel }) {
  return (
    <div className={styles.actionButtons}>
      {showSaveCancel && (
        <>
          <button className={styles.saveButton} onClick={onSave}>Save</button>
          <button className={styles.cancelButton} onClick={onCancel}>Cancel</button>
        </>
      )}
      <button className={styles.deleteButton} onClick={onDelete}>Delete</button>
    </div>
  );
}

export default TaskActions;

