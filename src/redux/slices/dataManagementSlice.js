import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';


export const dataManagementSlice = createSlice({
  name: 'data_management',
  initialState: {
    selectedModule: "all_data",
    showUploadDocumentsForm: false,
    showConnectApiForm: false,
    showConnectDatabaseForm: false,
  },
  reducers: {
    setAllDataSources: (state,action) => {
      state.allDataSources = action.payload
    },
    setModules: (state,action) => {
      state.modules = action.payload
    },
    setModule: (state,action) => {
      state.module = action.payload
    },
    setShowUploadDocumentsForm: (state,action) => {
      state.showUploadDocumentsForm = action.payload
    },
    setShowConnectApiForm: (state,action) => {
      state.showConnectApiForm = action.payload
    },
    setShowConnectDatabaseForm: (state,action) => {
      state.showConnectDatabaseForm = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setModules,
  setModule,
  setShowUploadDocumentsForm,
  setShowConnectApiForm,
  setShowConnectDatabaseForm
} = dataManagementSlice.actions

export const clearStorage = () => ({ type: PURGE, key: 'data_management', result: () => null });

export default dataManagementSlice.reducer