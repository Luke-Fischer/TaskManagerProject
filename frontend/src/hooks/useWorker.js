import { useEffect, useState } from 'react';
import api from '../api';

export function useWorkers() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all workers on mount
    api.get('/workers')
      .then(res => setWorkers(res.data.data))
      .catch(err => console.error('Failed to fetch workers', err))
      .finally(() => setLoading(false));
  }, []);

  return { workers, loading };
}
