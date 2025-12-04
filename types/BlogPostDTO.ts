export default interface BlogPostDTO {
    title: string;
    slug: string;
    contentJson: any[] | string | undefined;
    summary: string;
	isPublished: boolean;
	authorId: number;
}