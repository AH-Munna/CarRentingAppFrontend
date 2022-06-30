import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { Reducer } from "./Reducer";

const Store = configureStore({
    reducer: {
        state: Reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
export default Store;