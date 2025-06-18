import styles from '../styles/StatusFilter.module.css';

function StatusFilter({ currentFilter, onFilterChange }) {
  const statusOptions = ['All', 'Todo', 'InProgress', 'Completed', 'Blocked'];

  return (
    <div className={styles.filterContainer}>
      {statusOptions.map(status => (
        <div
          key={status}
          onClick={() => onFilterChange(status)}
          className={`${styles.filterButton} ${currentFilter === status ? styles.active : ''}`}
        >
          {status}
        </div>
      ))}
    </div>
  );
}

export default StatusFilter;
