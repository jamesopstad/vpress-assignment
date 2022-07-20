import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Posts } from './Posts';

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to={'/posts'} replace={true} />} />
				<Route path="posts" element={<Posts />} />
			</Routes>
		</BrowserRouter>
	);
}
