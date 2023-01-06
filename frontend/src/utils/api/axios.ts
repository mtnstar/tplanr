import axios from 'axios';
import { getCurrentUser, logout } from '../services/authentication';

const adapter = () => {
  const adapter = axios.create({
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Authorization: userToken(),
    },
  });

  adapter.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        logout();
        return;
      }
      throw error;
    },
  );

  return adapter;
};

function userToken(): string {
  const user = getCurrentUser();
  if (!user) return '';

  const prefix = 'Bearer ';

  return prefix + user.token;
}

export default adapter;
