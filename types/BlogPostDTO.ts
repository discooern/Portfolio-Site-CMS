export default interface BlogPostDTO {
    title: string;
    slug: string;
    contentJson: any[] | undefined;
    summary: string;
	isPublished: boolean;
	authorId: number;
}