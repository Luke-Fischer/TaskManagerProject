import styles from '../../styles/EditableTask.module.css';
import { updateTask, deleteTask } from '../../api';
import { useEditableTaskState } from '../../hooks/useEditableTaskState';
import TaskFields from './TaskFields';
import TaskActions from './TaskActions';


function EditableTask({ task, workers = [] }) {
  const {
    title, setTitle,
    description, setDescription,
    status, setStatus,
    assigneeId, setAssigneeId,
    hasChanges, reset, updateOriginal
  } = useEditableTaskState(task);

  const handleSave = async () => {
    const payload = {
      title,
      description,
      status,
      workerId: assigneeId === "" ? null : assigneeId  // always send workerId on every update due to backend specifications
    };

    try {
      await updateTask(task.id, payload);

      updateOriginal({
        ...task,
        title,
        description,
        status,
        assignee: workers.find(w => w.id === assigneeId) || null
      });
    } catch (err) {
      console.error('Update failed:', err);
    }
  };


  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      window.location.reload();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className={styles.taskCard}>
      <TaskFields
      title={title} setTitle={setTitle}
      description={description} setDescription={setDescription}
      status={status} setStatus={setStatus}
      assigneeId={assigneeId} setAssigneeId={setAssigneeId}
      workers={workers}
      />
      <TaskActions
      onSave={handleSave}
      onCancel={reset}
      onDelete={handleDelete}
      showSaveCancel={hasChanges}
      />
    </div>
  );
}

export default EditableTask;
