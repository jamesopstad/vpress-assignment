import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { List, PostPreview } from './models';

interface GetPostsArg {
	page: number;
	limit: number;
}

export const dummyApi = createApi({
	reducerPath: 'dummyApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://dummyapi.io/data/v1/',
		prepareHeaders: (headers) => {
			headers.set('app-id', import.meta.env.VITE_APP_ID);

			return headers;
		}
	}),
	endpoints: (builder) => ({
		getPosts: builder.query<List<PostPreview>, GetPostsArg>({
			query: ({ page, limit }) => `post?page=${page}limit=${limit}`
		})
	})
});

export const { useGetPostsQuery } = dummyApi;
