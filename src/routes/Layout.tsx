import { NavLink, Outlet } from 'react-router-dom';
import { classNames } from '../utils';

export function Layout() {
	return (
		<div className="mx-2 mt-2 md:mx-6 text-gray-600">
			<nav className="flex justify-center">
				<NavLink
					to="posts"
					className={({ isActive }) =>
						classNames(
							'text-2xl font-bold hover:text-indigo-600',
							isActive && 'text-indigo-600'
						)
					}
				>
					Posts
				</NavLink>
			</nav>
			<Outlet />
		</div>
	);
}
