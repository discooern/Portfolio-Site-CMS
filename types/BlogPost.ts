// Models
import type ContentModel from './content';

export default interface BlogPost {
    id: number;
    title: string;
    slug: string;
    contentJson: any[] | undefined;
    summary: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt: Date;
	isPublished: boolean;
	authorId: number;
}