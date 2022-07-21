import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dummyApi } from './services/dummyApi';

export const store = configureStore({
	reducer: {
		[dummyApi.reducerPath]: dummyApi.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(dummyApi.middleware)
});

setupListeners(store.dispatch);
