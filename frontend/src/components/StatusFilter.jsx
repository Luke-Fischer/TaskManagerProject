// src/components/StatusFilter.jsx
function StatusFilter({ currentFilter, onFilterChange }) {
  const statusOptions = ['All', 'Todo', 'InProgress', 'Completed', 'Blocked'];

  return (
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {statusOptions.map(status => (
        <div
          key={status}
          onClick={() => onFilterChange(status)}
          style={{
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '999px',
            backgroundColor: currentFilter === status ? '#facc15' : '#2e2e2e',
            color: currentFilter === status ? '#000' : '#fff',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            transition: 'background-color 0.2s ease-in-out',
          }}
        >
          {status}
        </div>
      ))}
    </div>
  );
}

export default StatusFilter;
