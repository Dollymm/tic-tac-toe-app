import {combineReducers, configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import winData from './winData'
const persistConfig={
    key:'root',
    storage
}

const rootReducer=combineReducers({
    winData:winData
})

const persistedReducer=persistReducer(persistConfig,rootReducer)

const store=configureStore({
    reducer:persistedReducer
})

let persistor=persistStore(store)

export {store,persistor};
