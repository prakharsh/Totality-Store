import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice'
import countReducer from './cartCountSlice'
const localStorageMiddleware = ({ getState }) => {
  return next => action => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(getState()));
    return result;
  };
};
const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
  }
};
const store=configureStore({
  preloadedState: reHydrateStore(),
    reducer:{
        cart:cartReducer,
        count: countReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(localStorageMiddleware),
}) ;
export default store 