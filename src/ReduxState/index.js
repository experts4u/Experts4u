import {configureStore} from '@reduxjs/toolkit';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Slices from 'ReduxState/Slices';

const persisitConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persisitConfig, Slices);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PERSIST, REHYDRATE, PURGE, REGISTER, PAUSE],
      },
    }),
});

export let persistor = persistStore(store);
