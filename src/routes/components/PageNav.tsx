import { Link } from 'react-router-dom';
import {
	ArrowNarrowLeftIcon,
	ArrowNarrowRightIcon
} from '@heroicons/react/solid';
import { classNames } from '../../utils';
import type { List } from '../../services/types';

function setPageLinks(page: number, maxPage: number) {
	const values = [0];

	if (page < 3) {
		const max = maxPage < 3 ? maxPage : 3;

		for (let i = 1; i <= max; i++) {
			values.push(i);
		}

		if (maxPage === 4) values.push(4);
	} else {
		values.push(-1);

		const min = page > maxPage - 3 ? maxPage - 3 : page - 1;
		const max = min + 3 === maxPage ? maxPage : min + 2;

		for (let i = min; i <= max; i++) {
			values.push(i);
		}
	}

	if (values[values.length - 1] !== maxPage) {
		values.push(-1, maxPage);
	}

	return values;
}

function NextOrPrevious({
	type,
	list,
	isDisabled
}: {
	type: 'Next' | 'Previous';
	list: List;
	isDisabled: boolean;
}) {
	const content = (
		<>
			{type === 'Previous' && <ArrowNarrowLeftIcon className="w-5 h-5" />}
			{type}
			{type === 'Next' && <ArrowNarrowRightIcon className="w-5 h-5" />}
		</>
	);

	return isDisabled ? (
		<span className="flex items-center gap-x-3 p-3 text-gray-300 cursor-default">
			{content}
		</span>
	) : (
		<Link
			to={`?page=${list.page + (type === 'Next' ? 1 : -1)}&limit=${list.limit}`}
			className="flex items-center gap-x-2 p-3 hover:bg-gray-100 hover:text-indigo-600"
		>
			{content}
		</Link>
	);
}

export function PageNav({
	list,
	maxPage,
	isFetching
}: {
	list: List;
	maxPage: number;
	isFetching: boolean;
}) {
	return (
		<nav className="flex justify-evenly pb-2 border-t-2">
			<NextOrPrevious
				type="Previous"
				list={list}
				isDisabled={list.page === 0 || isFetching}
			/>
			<div className="hidden md:flex">
				{setPageLinks(list.page, maxPage).map((value, i) => {
					const isEllipsis = value === -1;
					const isCurrent = value === list.page;
					const displayValue = value + 1;

					return isEllipsis ? (
						<span className="p-3 cursor-default" key={i}>
							...
						</span>
					) : (
						<Link
							to={`?page=${value}&limit=${list.limit}`}
							className={classNames(
								'p-3 hover:bg-gray-200',
								isCurrent &&
									'mt-[-2px] font-bold text-indigo-600 border-t-2 border-indigo-600'
							)}
							key={i}
						>
							{displayValue}
						</Link>
					);
				})}
			</div>
			<NextOrPrevious
				type="Next"
				list={list}
				isDisabled={list.page === maxPage || isFetching}
			/>
		</nav>
	);
}
