import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';

export const modelsSlice = createSlice({
  name: 'models',
  initialState: {
    models:[],
  },
  reducers: {
    setModels: (state,action) => {
      state.models = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setModels } = modelsSlice.actions

export const clearStorage = () => ({ type: PURGE, key: 'models', result: () => null });

export default modelsSlice.reducer