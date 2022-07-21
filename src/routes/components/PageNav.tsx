import { Link } from 'react-router-dom';
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

export function PageNav({ list, maxPage }: { list: List; maxPage: number }) {
	const pageLinks = setPageLinks(list.page, maxPage);

	return (
		<>
			{list.page !== 0 && (
				<Link to={`?page=${list.page - 1}&limit=${list.limit}`}>Previous</Link>
			)}
			{pageLinks.map((value, i) => (
				<p key={i} className={`${value === list.page ? 'font-bold' : ''}`}>
					{value === -1 ? '...' : value + 1}
				</p>
			))}
			{list.page !== maxPage && (
				<Link to={`?page=${list.page + 1}&limit=${list.limit}`}>Next</Link>
			)}
		</>
	);
}
