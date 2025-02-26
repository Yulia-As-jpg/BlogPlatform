import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  user: {
    username: string
    email: string
    token: string
    image: string
  } | null
}

const initialState: UserState = {
  user: localStorage.getItem('user-data') ? JSON.parse(localStorage.getItem('user-data') as string) : null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser(state, action) {
      state.user = { ...action.payload }
      localStorage.setItem('user-data', JSON.stringify(action.payload))
    },
    logOutUser(state) {
      state.user = null
      localStorage.removeItem('user-data')
    },
    checkUserAuth(state) {
      state.user = {
        ...JSON.parse(localStorage.getItem('user-data') as string),
      }
    },
  },
})

export const { signInUser, logOutUser, checkUserAuth } = userSlice.actions

export default userSlice.reducer
