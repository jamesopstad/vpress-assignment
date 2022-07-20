import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetPostsQuery } from './services/dummyApi';

const defaultSearchParams: Record<string, string> = { page: '0', limit: '10' };

export function Posts() {
	const [searchParams, setSearchParams] = useSearchParams();
	const {
		isError,
		isSuccess,
		error,
		data: posts
	} = useGetPostsQuery({
		page: searchParams.get('page') || defaultSearchParams.page,
		limit: searchParams.get('limit') || defaultSearchParams.limit,
		user: searchParams.get('user'),
		tag: searchParams.get('tag')
	});

	useEffect(() => {
		for (const param in defaultSearchParams) {
			if (!searchParams.has(param)) {
				searchParams.set(param, defaultSearchParams[param]);
			}
		}

		setSearchParams(searchParams, { replace: true });
	}, []);

	if (isSuccess) {
		console.log(posts);
	}

	return <h1>Posts</h1>;
}
