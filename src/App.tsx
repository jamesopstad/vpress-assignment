import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Posts } from './routes/Posts';
import { DisplayError } from './routes/DisplayError';

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to={'/posts'} replace={true} />} />
				<Route path="posts" element={<Posts />} />
				<Route path="*" element={<DisplayError error="route not found" />} />
			</Routes>
		</BrowserRouter>
	);
}
