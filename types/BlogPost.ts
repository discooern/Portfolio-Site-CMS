// Models
import type ContentModel from './Content';

export default interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: ContentModel[];
    summary: string;
}