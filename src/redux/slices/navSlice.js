import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';

export const navSlice = createSlice({
  name: 'navigation',
  initialState: {
    currentPage: "Home",
    pageList: [],
    menuItems: [],
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageList: (state, action) => {
      state.pageList = action.payload
    },
    setMenuItems: (state, action) => {
      state.menuItems = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentPage, setPageList, setMenuItems} = navSlice.actions

export const clearStorage = () => ({ type: PURGE, key: 'navStorage', result: () => null });

export default navSlice.reducer