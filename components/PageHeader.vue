<template>
    <div class="flex flex-row justify-between items-center p-[1rem] bg-[lightgray]">
        <h2 class="text-xl font-bold my-auto">
            CMS Site Header
        </h2>
        <div class="flex flex-row gap-[1em]">
            <a class="text-black font-bold hover:cursor-pointer">Link</a>
			<nuxt-link v-for="item in store.routes" :to="'contentview'" class="text-black font-bold hover:cursor-pointer">{{ item.title }}</nuxt-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMainStore } from '../stores/store';

const store = useMainStore();
</script>