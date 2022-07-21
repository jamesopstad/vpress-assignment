import {
	BrowserRouter,
	Routes,
	Route,
	Outlet,
	Navigate
} from 'react-router-dom';
import { Layout } from './routes/Layout';
import { Posts } from './routes/Posts';
import { Post } from './routes/Post';
import { DisplayError } from './routes/DisplayError';

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Navigate to={`/posts`} replace={true} />} />
					<Route path="posts" element={<Posts />} />
					<Route path="post/:postId" element={<Post />} />
				</Route>
				<Route path="*" element={<DisplayError error="route not found" />} />
			</Routes>
		</BrowserRouter>
	);
}
