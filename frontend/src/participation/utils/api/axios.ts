import axios from 'axios';

const adapter = () => {
  const adapter = axios.create({
    headers: {
      'Content-Type': 'application/vnd.api+json',
    },
  });

  return adapter;
};

export default adapter;
