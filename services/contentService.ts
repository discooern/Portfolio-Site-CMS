import axios, { Axios, type AxiosResponse } from 'axios';

import { useMainStore } from '../stores/store';

// Helpers
import ContentHelper from '../helpers/contentHelper';

// Models
import type ContentModel from '../types/content';
import type BlogPost from '~/types/BlogPost';

export default class ProductService {
    store: any = useMainStore();

    // Helpers
    contentHelper: ContentHelper = new ContentHelper;

    async savePage(name: string, content: ContentModel[]): Promise<any> {
        try {
            var blogPost = this.contentHelper.mapBlogPostDTO(name, content);

            const response = await axios.get<any>(`${this.store.apiBaseurl}/content/savePage`, {
                params: {
                    blogPost: JSON.stringify(blogPost)
                },
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': this.store.xApiKey
                }
            });

            return response.data;
        } catch (error) {
            throw new Error('Error saving content: ' + error);
        }
    }

    async deletePage(id: number): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.delete<any>(`${this.store.apiBaseurl}/blogposts/delete`, {
                params: {
                    id: id
                },
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': this.store.xApiKey
                }
            });

			// Assume successful.
            return response;
        } catch (error) {
            throw new Error('Error deleting content: ' + error);
        }
    }

    async getPages(): Promise<Array<any>> {
        try {
            const response = await axios.get<Array<any>>(`${this.store.apiBaseurl}/blogposts/routes`, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': this.store.xApiKey
                }
            });

            return response.data;
        } catch (error) {
            throw new Error('Error getting content: ' + error);
        }
    }

    async getArticleContent(id: number): Promise<AxiosResponse<BlogPost>> {
        try {
            const response = await axios.get<BlogPost>(`${this.store.apiBaseurl}/blogposts/id`, {
                params: {
                    id: id
                },
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': this.store.xApiKey
                }
            });

            return response;
        } catch (error) {
            throw new Error('Error getting content: ' + error);
        }
    }
}