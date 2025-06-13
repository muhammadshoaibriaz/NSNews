import {createSlice} from '@reduxjs/toolkit';
<<<<<<< HEAD
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../db/IP';

export const fetchNews = createAsyncThunk('user/fetchNewsData', async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/posts`);
    console.log('news fetched', response.data);
    return response.data; // Return updated news data
  } catch (error) {
    console.log('Error fetching news data:', error.message);
    throw error;
  }
});
=======
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {
<<<<<<< HEAD
    setArticles(state, action) {
      // i want to save previous articles too
      state.articles = [...state.articles, ...action.payload];
    },
=======
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
    getArticlesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getArticlesSuccess(state, action) {
      state.loading = false;
      state.articles = action.payload;
    },
    getArticlesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
<<<<<<< HEAD
export const {
  getArticlesRequest,
  getArticlesSuccess,
  getArticlesFailure,
  setArticles,
} = articleSlice.actions;
=======
export const {getArticlesRequest, getArticlesSuccess, getArticlesFailure} =
  articleSlice.actions;
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
export default articleSlice; // export the reducer to be used in the store
