import {configureStore} from "@reduxjs/toolkit";
import { userApi } from "./Api/userApi";
import userSlice from "./Reducer/userSlice";

export const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [userSlice.reducerPath]:userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
