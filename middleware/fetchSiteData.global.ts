import { useMainStore } from '../stores/store';

// Services
import ContentService from '../services/contentService';

export default defineNuxtRouteMiddleware(async (to: any) => {
    var contentService: ContentService = new ContentService; 

    if (!to.path || to.path === "/null") {
        console.error("Invalid route detected:", to.path);
        return;
    }
    if (import.meta.server) console.log("started middleware server");
    if (import.meta.client) console.log("started middleware client");

    // Store
    const store: any = useMainStore();

    const config = useRuntimeConfig();

    if (import.meta.server) {
        // store.setConfig({
        //     apiBaseurl: config.apiBaseurl,
        //     // xApiKey: config.xApiKey,
        // });

        var pages = await contentService.getPages();
        store.routes = pages;
        // console.log("pages", pages);
    }
});