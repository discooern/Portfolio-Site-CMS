// Models
import type ContentModel from './content';

export default interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: ContentModel[];
    summary: string;
}