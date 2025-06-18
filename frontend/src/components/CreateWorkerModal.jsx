import { useState } from 'react';
import styles from '../styles/CreateWorkerModal.module.css';
import { createWorker } from '../api';

function CreateWorkerModal({ onClose, onWorkerCreated }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      jobTitle,
    };

    try {
      const res = await createWorker(payload);
      onWorkerCreated?.(res.data.data);
      setFirstName('');
      setLastName('');
      setJobTitle('');
      onClose();
    } catch (err) {
      console.error('Failed to create worker:', err);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Create New Worker</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <div className={styles.actions}>
            <button type="submit">Create</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateWorkerModal;
