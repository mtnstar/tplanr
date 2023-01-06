import axios from 'axios';
import User from '../../model/User';

export const login = (email?: string, password?: string) => {
  return axios
    .post('/api/auth/login', {
      email,
      password,
    })
    .then((response) => {
      const attrs = response.data.data.attributes;
      if (attrs.token) {
        const user = { token: attrs.token, firstName: attrs.first_name };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }

      return undefined;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        return undefined;
      }

      throw error;
    });
};

export function logout() {
  localStorage.removeItem('user');
}

export function getCurrentUser() {
  const currentUser = localStorage.getItem('user');
  if (!currentUser) return undefined;

  return JSON.parse(currentUser) as User;
}
