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

export const projectsAPI = {
  getAll: () => apiCall(ENDPOINTS.PROJECTS.LIST),

  create: (data) => apiCall(ENDPOINTS.PROJECTS.CREATE, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  update: (id, data) => apiCall(ENDPOINTS.PROJECTS.UPDATE(id), {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  delete: (id) => apiCall(ENDPOINTS.PROJECTS.DELETE(id), {
    method: 'DELETE',
  }),
};