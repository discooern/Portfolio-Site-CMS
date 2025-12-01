import axios from 'axios';

import { useMainStore } from '../stores/store';

// Helpers
import ContentHelper from '../helpers/contentHelper';

// Models
import type ContentModel from '../types/Content';

export default class ProductService {
    store: any = useMainStore();

    // Helpers
    contentHelper: ContentHelper = new ContentHelper;

    async savePage(name: string, content: ContentModel[]): Promise<Array<any>> {
        try {
            var blogPost = this.contentHelper.mapBlogPostDTO(name, content);

            const response = await axios.get<Array<any>>(`${this.store.apiBaseurl}/content/savePage`, {
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

    async deletePage(id: string): Promise<Array<any>> {
        try {
            const response = await axios.get<Array<any>>(`${this.store.apiBaseurl}/content/deletePage`, {
                params: {
                    id: JSON.stringify(id)
                },
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': this.store.xApiKey
                }
            });

            return response.data;
        } catch (error) {
            throw new Error('Error deleting content: ' + error);
        }
    }
}