import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl} from '../../../db/IP';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/api/register`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log('fetchUserData', response.data);
      return response.data; // Return updated user data
    } catch (error) {
      console.log('Error fetching user data:', error.message);
      throw error;
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {},
    loading: false,
    error: null,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    getProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getProfileSuccess(state, action) {
      state.loading = false;
      state.profile = action.payload;
    },
    getProfileFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        console.log('Redux Updated Profile:', action.payload); // Debugging Redux
        state.loading = false;
        state.profile = action.payload; // ✅ Store API data in Redux
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  getProfileFailure,
  getProfileRequest,
  getProfileSuccess,
  setProfile,
} = profileSlice.actions;
export default profileSlice;
