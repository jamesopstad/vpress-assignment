import { Link } from 'react-router-dom';
import { ThumbUpIcon } from '@heroicons/react/outline';
import { classNames } from '../../utils';
import type { PostPreview } from '../../services/types';

export function PreviewPost({
	post,
	isOdd
}: {
	post: PostPreview;
	isOdd: boolean;
}) {
	return (
		<Link to={`/post/${post.id}`}>
			<section
				className={classNames(
					'flex items-center px-2 py-6 gap-3 rounded-md hover:bg-gray-100',
					isOdd && 'justify-between'
				)}
			>
				<img
					src={post.image}
					className={classNames(
						'h-40 md:h-60 rounded-md',
						isOdd && 'order-last'
					)}
				/>
				<div className="flex flex-col justify-between">
					<span className="font-medium">
						{new Date(post.publishDate).toLocaleDateString()}
					</span>
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
