export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
  },
  PROJECTS: {
    LIST: `${API_BASE_URL}/projects`,
    CREATE: `${API_BASE_URL}/projects`,
    UPDATE: (id) => `${API_BASE_URL}/projects/${id}`,
    DELETE: (id) => `${API_BASE_URL}/projects/${id}`,
  },
  TASKS: {
    LIST: (projectId) => `${API_BASE_URL}/projects/${projectId}/tasks`,
    CREATE: (projectId) => `${API_BASE_URL}/projects/${projectId}/tasks`,
    UPDATE: (projectId, taskId) => `${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`,
    DELETE: (projectId, taskId) => `${API_BASE_URL}/projects/${projectId}/tasks/${taskId}`,
  },
  AI: {
    SUGGESTIONS: (projectId) => `${API_BASE_URL}/ai/suggestions/${projectId}`,
  },
};