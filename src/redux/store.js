import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import colorReducer from './colorSlice'

const persistConfig = {
    key: 'knowEdge',
    storage
}
const persistedColorReducer = persistReducer(persistConfig, colorReducer)

export const store = configureStore({
    reducer: {
        color: persistedColorReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)