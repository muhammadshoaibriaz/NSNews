import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';

// slices
import bookmarkSlice from './slices/bookMarkSlice';
import followingSlice from './slices/followingSlice';
import articleSlice from './slices/articleSlice';
import loginSlice from './slices/loginSlice';
import profileSlice from './slices/profileSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  bookmark: bookmarkSlice.reducer,
  following: followingSlice.reducer,
  login: loginSlice.reducer,
  profile: profileSlice.reducer,
  article: articleSlice.reducer,
});

const persistReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
