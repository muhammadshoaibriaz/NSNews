import axios from 'axios';
import {baseUrl} from './IP';

export const fetchArticles = async userId => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/register/${userId}/articles`,
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles', error);
  }
};

export const getRecommendedNews = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/get-recommended-news`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('Error while getting recommended news', error.message);
  }
};
