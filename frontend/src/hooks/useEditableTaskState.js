import { useState, useEffect } from 'react';

export function useEditableTaskState(task) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [assigneeId, setAssigneeId] = useState(task.assignee?.id || '');

  // Tracks the last saved version of the task
  const [original, setOriginal] = useState(task);
   
  const [hasChanges, setHasChanges] = useState(false);

  // Helper to update state values from a task object
  const applyTaskValues = (t) => {
    setTitle(t.title);
    setDescription(t.description);
    setStatus(t.status);
    setAssigneeId(t.assignee?.id || '');
  };

  // Whenever any input value changes, check if it's different from the original
  useEffect(() => {
    const changed =
      title !== original.title ||
      description !== original.description ||
      status !== original.status ||
      assigneeId !== (original.assignee?.id || '');
    setHasChanges(changed);
  }, [title, description, status, assigneeId, original]);

  // Reset to the last saved values
  const reset = () => {
    applyTaskValues(original);
  };

  // Called after a successful save to update the original snapshot
  const updateOriginal = (updatedTask) => {
    setOriginal(updatedTask);
    applyTaskValues(updatedTask);
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    assigneeId,
    setAssigneeId,
    hasChanges,
    reset,
    updateOriginal,
  };
}
