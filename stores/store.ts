import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {

    // Globally available fields
    state: () => ({
        apiBaseurl: '',
        xApiKey: '',
        pages: [],
    }),

    // Globally available functions
    actions: {
        setConfig(runtimeConfig: any) {
            this.apiBaseurl = runtimeConfig.apiBaseurl;
            this.xApiKey = runtimeConfig.xApiKey;
        },
    },
})