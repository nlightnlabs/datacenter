import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist';

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: {},
    userLoggedIn: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setUserLoggedIn } = authSlice.actions

export const clearStorage = () => ({ type: PURGE, key: 'authStorage', result: () => null });

export default authSlice.reducer
