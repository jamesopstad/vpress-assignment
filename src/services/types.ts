export interface List<T = unknown> {
	data: T[];
	total: number;
	page: number;
	limit: number;
}

export interface UserPreview {
	id: string;
	title: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr' | '';
	firstName: string;
	lastName: string;
	picture: string;
}

export interface PostPreview {
	id: string;
	text: string;
	image: string;
	likes: number;
	tags: string[];
	publishDate: string;
	owner: UserPreview;
}

export interface Post extends PostPreview {
	link: string;
}
