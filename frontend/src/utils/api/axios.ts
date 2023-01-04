import axios from 'axios';

const adapter = axios.create({
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Authorization: userToken(),
  },
});

function userToken(): string {
  const userJson = localStorage.getItem('user');
  console.log(userJson);
  if (!userJson) return '';

  const user = JSON.parse(userJson);
  const prefix = 'Bearer ';

  return prefix + user.token;
}

/**
 * Catch the AunAuthorized Request
 */
adapter.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/login';
    }
  },
);

export default adapter;
