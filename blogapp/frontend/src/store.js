import { configureStore } from '@reduxjs/toolkit'

import flashmessageReducer from './reducers/flashmessageReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store =  configureStore({
    reducer: {
        notification: flashmessageReducer,
        blogs: blogReducer,
        user: userReducer

    }
  })  

export default store