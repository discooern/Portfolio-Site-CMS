// Models
import type BlogPostDTOModel from '../types/blogPostDTO';
import type ContentModel from '../types/content';

export default class ContentHelper {
    mapBlogPostDTO(name: string, content: ContentModel[]): BlogPostDTOModel {
        var resultContent = content.map(c => c.content).flat();
        var slug = name.replace(" ", "-");

        var blogPost: BlogPostDTOModel = {
            title: name,
            contentJson: resultContent,
            slug: slug,
            summary: "",
            isPublished: false,
            authorId: 0
        };

        return blogPost;
    }
}