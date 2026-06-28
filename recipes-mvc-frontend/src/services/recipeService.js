const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://recipie-app-3.onrender.com/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

export const getAllRecipes = () => request('/recipes');
export const createRecipe = (payload) =>
  request('/recipes', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
export const updateRecipe = (id, payload) =>
  request(`/recipes/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload)
  });
export const deleteRecipe = (id) =>
  request(`/recipes/${id}`, {
    method: 'DELETE'
  });
