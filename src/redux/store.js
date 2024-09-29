import { configureStore, combineReducers, applyMiddleWare } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/authSlice';
import navReducer from './slices/navSlice';
import dataManagementReducer from './slices/dataManagementSlice';
import appsReducer from './slices/appsSlice';
import modelsReducer from './slices/modelsSlice';
import envReducer from './slices/envSlice';

const persistConfig = {
  key: 'root', // Key for the storage
  storage, // Storage engine to use
  stateReconciler: autoMergeLevel2,
  whitelist: ['authentication', 'navigation', 'data_management', 'models', 'apps', 'environment'], // Reducers to persist
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  authentication: authReducer,
  navigation: navReducer,
  data_management: dataManagementReducer,
  models: modelsReducer,
  apps: appsReducer,
  environment: envReducer
}));


// Async action creator to fetch and store data
// export const fetchData = () => async (dispatch, getState) => {
//   // Fetch data here (e.g., using fetch or axios)
//   try {
//     const response = await fetch('your-api-endpoint');
//     const data = await response.json();
//     dispatch({ type: 'FETCH_SUCCESS', payload: data });
//   } catch (error) {
//     dispatch({ type: 'FETCH_ERROR', payload: error.message });
//   }
// };


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
});

const persistor = persistStore(store);

export { store, persistor };

export const clearAllStorage = () => ({
  type: 'persist/PURGE', // Use 'persist/PURGE' for redux-persist v6
  keys: ['authStorage', 'navStorage', 'data_management', 'models', 'apps','environment'], // Add keys for all your slices
  result: () => null,
});
