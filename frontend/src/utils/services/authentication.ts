import axios from 'axios';

export function login(email?: string, password?: string) {
  return axios
    .post('/api/auth/login', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }

      return response.data;
    });
}

export function logout() {
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user') || '');
}
