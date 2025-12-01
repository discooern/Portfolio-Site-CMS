<template>
    <div v-if="toggled" class="bg-[gray] border-[1px] border-solid border-black h-[80vh] w-[80vw] fixed inset-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div class="py-[1rem] border-black border-solid border-b-[1px]">
            <h2 class="font-bold text-xl text-black relative text-center m-0">Choose a content type</h2>
            <p class="absolute -right-0 -top-0 m-[.5em] text-black text-[1.2em] hover:underline cursor-pointer" @click="closeModal()">Close</p>
        </div>
        <div class="p-[1rem] gap-[1rem] grid grid-cols-[1fr_1fr_1fr_1fr]">
            <button @click="addItem({ type: 'richText', content: undefined })">Rich text</button>
        </div>
    </div>
</template>

<script setup lang="ts">
    // Models
    import type ContentModel from '../types/Content';

    interface Props {
        toggled: boolean
    }

    const props = defineProps<Props>();

    const emit = defineEmits(['addItem', 'closeModal'])

    function addItem(item: ContentModel) {
        emit('addItem', item);
    }

    function closeModal() {
        emit('closeModal');
    }
</script>