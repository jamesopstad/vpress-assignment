import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { List, PostPreview } from './models';

interface GetPostsArg {
	page: string;
	limit: string;
	user: string | null;
	tag: string | null;
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
			query: ({ page, limit, user, tag }) => {
				const searchParams = new URLSearchParams({ page, limit });

				return user
					? `user/${user}/post?${searchParams}`
					: tag
					? `tag/${tag}/post?${searchParams}`
					: `post?${searchParams}`;
			}
		})
	})
});

export const { useGetPostsQuery } = dummyApi;
