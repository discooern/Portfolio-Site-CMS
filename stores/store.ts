import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {

    // Globally available fields
    state: () => ({
        apiBaseurl: 'http://localhost:5147',
        xApiKey: '',
        routes: [] as any,
    }),

    // Globally available functions
    actions: {
        setConfig(runtimeConfig: any) {
            this.apiBaseurl = import.meta.env.API_BASEURL;
            this.xApiKey = runtimeConfig.xApiKey;
        },
    },
})