import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetPostsQuery } from '../services/dummyApi';
import { useScroll } from '../hooks';
import { PreviewPost } from './components/PreviewPost';
import { PageNav } from './components/PageNav';
import { DisplayError } from './DisplayError';
import type { List } from '../services/types';

const defaultSearchParams = { page: '0', limit: '20' };

function setShowing({ data, page, limit }: List) {
	const startIndex = page * limit;
	const endIndex = startIndex + data.length;

	return { startIndex, endIndex };
}

export function Posts() {
	const [searchParams, setSearchParams] = useSearchParams();
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
		return null;
	}

	if (isError) {
		return null;
	}

	if (!posts) {
		return null;
	}

	const maxPage = Math.floor(posts.total / posts.limit);

	if (page[0] === '-' || posts.page > maxPage) {
		return <DisplayError error="page not found" />;
	}

	const { startIndex, endIndex } = setShowing(posts);

	return (
		<div>
			<header>
				<p>
					Showing {startIndex} to {endIndex} of {posts.total} results
				</p>
			</header>
			<main className="py-2">
				{posts.data.map((post, i) => (
					<PreviewPost post={post} isEven={!!(i % 2)} key={post.id} />
				))}
			</main>
			<footer className="">
				<PageNav list={posts} maxPage={maxPage} isFetching={isFetching} />
			</footer>
		</div>
	);
}
