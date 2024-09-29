import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';

export const envSlice = createSlice({
  name: 'environment',
  initialState: {  
    appName: "",
    dbName: "",
    fileStorageBucket: "",
    logoFile: "",
    theme: ""
  },
  reducers: {
    setAppName: (state, action) => {
      state.appName = action.payload
    },
    setDbName: (state, action) => {
      state.dbName = action.payload
    },
    setFileStorageBucket: (state, action) => {
      state.fileStorageBucket = action.payload
    },
    setLogoFile: (state, action) => {
      state.logoFile = action.payload
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAppName, setDbName, setFileStorageBucket, setLogoFile, setTheme} = envSlice.actions

export const clearStorage = () => ({ type: PURGE, key: 'envStorage', result: () => null });

export default envSlice.reducer

