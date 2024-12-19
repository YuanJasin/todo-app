import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "./todolist"


const store = configureStore({
  reducer: {
    todos:todoReducer
  }
})
export default store;
