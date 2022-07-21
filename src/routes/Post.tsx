import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '../services/dummyApi';
import { Loading } from './components/Loading';
import { DisplayError } from './DisplayError';
import { ThumbUpIcon } from '@heroicons/react/outline';

export function Post() {
	const { postId } = useParams();
	const { isLoading, isError, error, data: post } = useGetPostQuery(postId!);

	if (isLoading) {
		return <Loading />;
	}

	if (isError || !post) {
		return <DisplayError error={(error as Error).message} />;
	}

	return (
		<article className="px-2 py-6">
			<img src={post.image} className="float-left mr-4 mb-4 rounded-md h-96" />
			<span className="font-medium">
				{new Date(post.publishDate).toLocaleDateString()}
			</span>
			<p className="my-8">{post.text}</p>
			<span className="flex items-center gap-0.5">
				<ThumbUpIcon className="w-5 h-5" />
				{post.likes}
			</span>
		</article>
	);
}
