import axios from 'axios';

axios.defaults.baseURL = 'https://64679c42e99f0ba0a81353e2.mockapi.io/users';
// const BASE_URL = 'https://64679c42e99f0ba0a81353e2.mockapi.io/users/users';
// export async function fetchInfo() {
//   const info = await axios.get('/users');
//   return info;
// }

export const fetchInfo = async (page, limit, selected) => {
  try {
    if (page && limit) {
      const info = await axios.get(
        `/users?page=${page}&limit=${limit}&followed=${selected}`
      );
      return info;
    }
    const info = await axios.get(`/users?followed=${selected}`);
    return info;
  } catch (error) {
    alert(error);
  }
};
