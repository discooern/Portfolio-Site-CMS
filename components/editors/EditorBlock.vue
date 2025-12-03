<template>
    <div class="w-[100%] min-h-[100px]" v-if="'richText' == 'richText'">
        <RTEBlock @saveContent="saveContent" @deleteContent="deleteContent" v-if="selectedBlogPost != undefined" :contentJson="selectedBlogPost.contentJson"></RTEBlock>
    </div>
</template>

<script setup lang="ts">
    import type BlogPost from '~/types/BlogPost';
    import { RTEBlock } from '../../components';

    // Models
    import type ContentModel from '../../types/content';

    interface Props {
        blogPost: BlogPost;
        // item: ContentModel;
    }

    const selectedBlogPost = ref<BlogPost | undefined>(undefined);
    
    const props = defineProps<Props>();

    const emit = defineEmits(['saveContent', 'deleteContent']);

    onBeforeUpdate(() => {
        selectedBlogPost.value = props.blogPost;
    });

    function saveContent(content: string) {
        emit('saveContent', content);
    }

    function deleteContent() {
        emit('deleteContent');
    }
</script>