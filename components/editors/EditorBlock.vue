<template>
    <div class="w-[100%] min-h-[100px]" v-if="item.type == 'richText'">
        <RTEBlock @saveContent="saveContent" @deleteContent="deleteContent" :content="item.content"></RTEBlock>
    </div>
</template>

<script setup lang="ts">
    import { RTEBlock } from '../../components';

    // Models
    import type ContentModel from '../../types/content';

    interface Props {
        item: ContentModel
    }

    const props = defineProps<Props>();

    const emit = defineEmits(['saveContent', 'deleteContent'])

    function saveContent(content: string) {
        emit('saveContent', content);
    }

    function deleteContent() {
        emit('deleteContent');
    }
</script>