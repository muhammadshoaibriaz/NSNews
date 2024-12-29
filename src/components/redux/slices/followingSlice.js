import {createSlice} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';

const followingSlice = createSlice({
  name: 'following',
  initialState: {
    following: [],
  },
  reducers: {
    addFollowing(state, action) {
      // Add only if the item isn't already in the list
      if (
        !state.following.some(f => f.login.uuid === action.payload.login.uuid)
      ) {
        state.following.push(action.payload);
        ToastAndroid.show(
          `You started following ${action?.payload?.name?.first}!`,
          3000,
        );
      }
    },
    removeFollowing(state, action) {
      // Remove by comparing unique IDs
      state.following = state.following.filter(
        f => f.login.uuid !== action.payload.login.uuid,
      );
      ToastAndroid.show(`UnFollowed ${action?.payload?.name?.first}!`, 3000);
    },
  },
});

export const {addFollowing, removeFollowing} = followingSlice.actions;
export default followingSlice;
