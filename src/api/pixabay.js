import axios from 'axios';

const pixabay = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

pixabay.interceptors.request.use(config => {
  config.params = {
    key: '41067468-719d564db60da357cea4b901d',
    image_type: 'photo',
    orientation: 'horizontal',
    ...config.params,
  };
  return config;
});

const getImages = async params => {
  const { data } = await pixabay.get('', { params });
  return data;
};

export default getImages;
