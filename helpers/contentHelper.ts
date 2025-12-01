// Models
import type BlogPostDTOModel from '../types/BlogPostDTO';
import type ContentModel from '../types/Content';

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