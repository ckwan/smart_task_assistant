import { ENDPOINTS } from '../utils/constants';

async function apiCall(url, options = {}) {
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) throw new Error('API request failed');
  return response.json();
}

export const tasksAPI = {
  getAll: (projectId) => apiCall(ENDPOINTS.TASKS.LIST(projectId)),

  create: (projectId, data) => apiCall(ENDPOINTS.TASKS.CREATE(projectId), {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  update: (projectId, taskId, data) => apiCall(ENDPOINTS.TASKS.UPDATE(projectId, taskId), {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  delete: (projectId, taskId) => apiCall(ENDPOINTS.TASKS.DELETE(projectId, taskId), {
    method: 'DELETE',
  }),
};