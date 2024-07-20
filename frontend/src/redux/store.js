import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import restaurantReducer from './user/restaurantSlice';
import{persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user: userReducer, restaurant: restaurantReducer});

const persistConfig = {
    key: 'root', //name of the data we save in localstorage
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer) //data will be stored in localstorage and we do not need to add them again and again when refresh

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),

});

export const persistor = persistStore(store);