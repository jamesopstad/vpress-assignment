import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGetPostsQuery } from '../services/dummyApi';
import { useScroll } from '../hooks';
import { Loading } from './components/Loading';
import { DisplayError } from './DisplayError';
import { Select } from './components/Select';
import { PreviewPost } from './components/PreviewPost';
import { PageNav } from './components/PageNav';
import type { List } from '../services/types';

const defaultSearchParams = { page: '0', limit: '20' };
const limitOptions = ['5', '10', '20'];

function setShowing({ data, page, limit }: List) {
	const startIndex = page * limit;
	const endIndex = startIndex + data.length;

	return { startIndex: startIndex + 1, endIndex };
}

export function Posts() {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const page = searchParams.get('page') || defaultSearchParams.page;
	const limit = searchParams.get('limit') || defaultSearchParams.limit;
	const {
		isLoading,
		isFetching,
		isError,
		error,
		data: posts
	} = useGetPostsQuery({ page, limit });
	useScroll(posts?.page);

	useEffect(() => {
		searchParams.set('page', page);
		searchParams.set('limit', limit);
		setSearchParams(searchParams, { replace: true });
	}, [searchParams]);

	if (isLoading) {
		return <Loading />;
	}

	if (isError || !posts) {
		return <DisplayError error={(error as Error).message} />;
	}

	const maxPage = Math.floor(posts.total / posts.limit);

	if (page[0] === '-' || posts.page > maxPage) {
		return <DisplayError error="page not found" />;
	}

	const { startIndex, endIndex } = setShowing(posts);

	return (
		<div>
			<header className="px-2 pt-2 flex justify-between items-center">
				<p>
					Showing {startIndex} to {endIndex} of {posts.total} results
				</p>
				<Select
					items={limitOptions}
					selectedItem={limit}
					label="Items per page"
					onChange={(limit) => navigate(`/posts?limit=${limit}`)}
				/>
			</header>
			<main className="py-4">
				{posts.data.map((post, i) => (
					<PreviewPost post={post} isOdd={!!(i % 2)} key={post.id} />
				))}
			</main>
			<footer>
				<PageNav list={posts} maxPage={maxPage} isFetching={isFetching} />
			</footer>
		</div>
	);
}
