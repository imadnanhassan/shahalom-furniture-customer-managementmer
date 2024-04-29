import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/features/counter/counterSlice'
import checkBoxSlice from './features/checkBox/checkBoxSlice'
import themeSlice from './features/themes/themeSlice'

// import { baseApi } from './features/api/basaApi/baseApi'

export default configureStore({
  reducer: {
    // [baseApi.reducerPath]: baseApi.reducer,
    counter: counterReducer,
    checkBox: checkBoxSlice,
    theme: themeSlice,
  },

  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(baseApi.middleware),
})
