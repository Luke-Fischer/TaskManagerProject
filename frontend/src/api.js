import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5294/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data);
};

export async function deleteTask(id) {
  return api.delete(`/tasks/${id}`);
}

export const createTask = (data) => api.post('/tasks', data);

export const createWorker = (workerData) => api.post('/workers', workerData);

export default api;
