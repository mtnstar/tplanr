import axios from 'axios';

export const adapter = axios.create({
  headers: {
    'Content-Type': 'application/vnd.api+json',
  },
});
