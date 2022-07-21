import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { List, PostPreview, Post } from './types';

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
		getPosts: builder.query<List<PostPreview>, { page: string; limit: string }>(
			{
				query: ({ page, limit }) => `post?page=${page}&limit=${limit}`
			}
		),
		getPost: builder.query<Post, string>({
			query: (id) => `post/${id}`
		})
	})
});

export const { useGetPostsQuery, useGetPostQuery } = dummyApi;
