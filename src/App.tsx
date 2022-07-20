import { useGetPostsQuery } from './services/dummyApi';

export function App() {
	const { isSuccess, data: posts } = useGetPostsQuery({ page: 0, limit: 20 });

	if (isSuccess) {
		console.log(posts);
	}

	return null;
}
