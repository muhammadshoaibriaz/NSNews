import {createSlice} from '@reduxjs/toolkit';

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {
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
export const {getArticlesRequest, getArticlesSuccess, getArticlesFailure} =
  articleSlice.actions;
export default articleSlice; // export the reducer to be used in the store
