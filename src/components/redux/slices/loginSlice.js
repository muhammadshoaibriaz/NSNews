import {createSlice} from '@reduxjs/toolkit';

const loginSlice = createSlice({
  initialState: {user: null},
  name: 'login',
  reducers: {
    setLogin(state, action) {
      state.user = action.payload;
    },
  },
});

export default loginSlice;
export const {setLogin} = loginSlice.actions;
