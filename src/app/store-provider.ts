import { Action } from 'redux';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootReducer from '../slices';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client/build/esm/socket';

export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => {
    //     const middlewares = getDefaultMiddleware({
    //         thunk: {
    //             extraArgument: {
    //                 client: io('http://192.168.1.6:3000'),
    //             },
    //         },
    //     });
    //
    //     if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //         const createDebugger = require('redux-flipper').default;
    //         middlewares.concat(createDebugger());
    //     }
    //    return middlewares;
    // },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type ExtraArgs = {
    extra: { client: Socket };
};
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
