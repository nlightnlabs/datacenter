import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';

export const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    allAppsModule: "",
    app: {},
    singlAppModule: ""
  },
  reducers: {
    setAllAppsModule: (state,action) => {
      state.allAppsModule = action.payload
    },
    setApp: (state,action) => {
      state.app = action.payload
    },
    setSingleAppModule: (state,action) => {
      state.singlAppModule = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllAppsModule, setApp, setSingleAppModule } = appsSlice.actions

export const clearStorage = () => ({ type: PURGE, key: 'apps', result: () => null });

export default appsSlice.reducer