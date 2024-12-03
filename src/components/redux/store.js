import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import bookmarkSlice from './slices/bookMarkSlice';
import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  bookmark: bookmarkSlice.reducer,
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
