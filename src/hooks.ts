import { useState, useEffect } from 'react';

export function useScroll(page: number | undefined) {
	const [previousPage, setPreviousPage] = useState<number>();

	useEffect(() => {
		if (page !== previousPage) {
			window.scrollTo(0, 0);
			setPreviousPage(page);
		}
	}, [page, previousPage]);
}
