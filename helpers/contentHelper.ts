// Models
import type BlogPostDTOModel from '../types/blogPostDTO';
import type ContentModel from '../types/content';

export default class ContentHelper {
    mapBlogPostDTO(name: string, content: ContentModel[]): BlogPostDTOModel {
        var resultContent = content.map(c => c.content).flat();
        var slug = name.replace(" ", "-");

        var blogPost: BlogPostDTOModel = {
            id: "",
            title: name,
            content: resultContent,
            slug: slug,
            summary: ""
        };

        return blogPost;
    }
}