export default interface BlogPostDTO {
    id: string;
    title: string;
    slug: string;
    content: any[] | undefined;
    summary: string;
}