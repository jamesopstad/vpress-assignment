import { Link } from 'react-router-dom';
import { ThumbUpIcon } from '@heroicons/react/outline';
import { classNames } from '../../utils';
import type { PostPreview } from '../../services/types';

export function PreviewPost({
	post,
	isEven
}: {
	post: PostPreview;
	isEven: boolean;
}) {
	return (
		<Link to={`/post/${post.id}`}>
			<section
				className={classNames(
					'flex items-center px-2 py-6 gap-3 rounded-md hover:bg-gray-100',
					isEven && 'justify-between'
				)}
			>
				<img
					src={post.image}
					className={classNames('h-60 rounded-md', isEven && 'order-last')}
				/>
				<div className="flex flex-col justify-between">
					{new Date(post.publishDate).toLocaleDateString()}
					<p className="my-8">{post.text}</p>
					<span className="flex items-center gap-0.5">
						<ThumbUpIcon className="w-5 h-5" />
						{post.likes}
					</span>
				</div>
			</section>
		</Link>
	);
}
