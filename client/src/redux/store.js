import { configureStore } from '@reduxjs/toolkit'
import throttle from 'lodash/throttle';
import { saveState, loadState } from './localStorage';
import { saveSession, loadSession } from './sessionStorage';

import counterReducer from '../components/Counter/counterSlice'
import authReducer from './authSlice'

const persistedState = loadState()
const sessionState = loadSession()

const store =  configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  },
  preloadedState: {
    ...persistedState,
    ...sessionState
  }
})
export default store

// Adding persistance of LocalStorage and SessionStorage

store.subscribe(throttle(()=>{
  saveState({// add state to localStorage for persistance 
    // counter: store.getState().counter  
  })
  saveSession({ // add state to persist over only a session
    auth: store.getState().auth
  })
},1000))

