import { combineReducers, configureStore } from '@reduxjs/toolkit';
import showTimeReducer from './Slice/showTimeSlice'
import   ownerReducer  from './Owner/OwnerSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
   payment:showTimeReducer ,
   owner:ownerReducer
  });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})

export const persistor = persistStore(store);