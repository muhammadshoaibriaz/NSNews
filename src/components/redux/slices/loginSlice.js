// import {createSlice} from '@reduxjs/toolkit';

// const loginSlice = createSlice({
//   initialState: {user: null},
//   name: 'login',
//   reducers: {
//     setLogin(state, action) {
//       state.user = action.payload;
//     },
//   },
// });

// export default loginSlice;
// export const {setLogin} = loginSlice.actions;

import axios from 'axios';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl} from '../../../db/IP';

export const fetchLogin = createAsyncThunk('user/fetchLogin', async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/api/register`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    console.log('res', response.data);
    return response.data; // Return updated user data
  } catch (error) {
    console.log('Error fetching user data:', error.message);
    throw error;
  }
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLogin.pending, state => {
        state.loading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchLogin.rejected, state => {
        state.loading = false;
      });
  },
});

export const {setLogin} = loginSlice.actions;
export default loginSlice;
