import {createSlice} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
const bookmarkSlice = createSlice({
  initialState: [],
  name: 'bookmark',
  reducers: {
    addBookMark: (state, action) => {
      state.push(action.payload);
      ToastAndroid.show('Added to bookmark!', 3000);
    },
    removeBookMark: (state, action) => {
      state = state.filter(item => item.title !== action.payload?.title);
      ToastAndroid.show('Removed from bookmark!', 3000);
      return state;
    },
  },
});

export const {addBookMark, removeBookMark} = bookmarkSlice.actions;
export default bookmarkSlice;
