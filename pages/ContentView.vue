<template>
    <div class="p-[1rem] w-[100%]">
        <div class="flex flex-row space-around">
        </div>
        <div class="flex flex-row space-around">
            <div class="flex flex-col text-[1.1em] font-bold w-[20vw] py-[1rem] bg-[gray] items-center gap-[.8rem]">
                <div>
                    <div v-for="(item, currentPageIndex) in store.pages" class="w-[130px] flex justify-center p-0 m-0">
                        <input class="w-[130px] p-[.2rem] py-[.4rem] my-[.3rem] text-[.8em] bg-[white] cursor-pointer hover:text-[gray]"
                        type="text" v-model="item.title"
                    :class="currentlySelectedPageIndex == currentPageIndex ? 'text-[gray]' : ''"
                    @click="setIndex(currentPageIndex)"></input>
                        <p class="my-auto ml-[.5rem] text-[red] text-[1.2em] cursor-pointer hover:text-[pink]" style="-webkit-text-stroke: .5px black;" @click="deletePage(currentPageIndex)">X</p>
                    </div>
                </div>
                <button class="w-[80%] p-0" @click="createPage">Create Page</button>
            </div>
            <div class="content-edit-box flex flex-col">
                <div
                    class="flex flex-col border-[6px] w-[65vw] h-[fit-content] min-h-[65vh] max-h-[65vh] border-[gray] overflow-y-scroll">
                    <!-- Display component with content dynamically generated from prop of site we are editing -->
                    <EditorBlock v-if="store.pages[currentlySelectedPageIndex] != null"
                        v-for="(item, itemIndex) in store.pages[currentlySelectedPageIndex].content" :item="item"
                        @saveContent="saveContent($event, itemIndex)" @deleteContent="deleteContent(itemIndex)">
                    </EditorBlock>
                </div>
            </div>
        </div>
    </div>
    <button @click="saveChanges">Save Changes</button>
    <button @click="addContentToggled = true">Add Item</button>
    <PopupModal @addItem="addItem" @closeModal="closeModal" :toggled="addContentToggled"></PopupModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { PopupModal, EditorBlock } from '../components';
import { useMainStore } from '../stores/store';

// Services
import ContentService from '../services/contentService';

// Models
import type BlogPostModel from '../types/blogPost';
import type ContentModel from '../types/content';

const store: any = useMainStore();

// Services
const contentService: ContentService = new ContentService;

// Fields
let currentlySelectedPageIndex = ref(0);
let addContentToggled = ref(false);

// Functions
function addItem(item: ContentModel) {
    store.pages[currentlySelectedPageIndex.value].content.push(item)
    addContentToggled.value = false
}

function saveContent(content: string, index: number) {
    store.pages[currentlySelectedPageIndex.value].content[index].content = content;
}

function deleteContent(index: number) {
    const page = store.pages[currentlySelectedPageIndex.value]
    if (!page || !Array.isArray(page.content)) return
    page.content.splice(index, 1)
}

function setIndex(index: number) {
    currentlySelectedPageIndex.value = index;
    console.log("new index", currentlySelectedPageIndex.value)
}

function closeModal() {
    addContentToggled.value = false;
    console.log("no")
}

function createPage() {
    const blogPost: BlogPostModel =
    {
        id: "",
        title: "New Page",
        slug: "New-Page",
        content: [],
        summary: "",
    };

    currentlySelectedPageIndex.value = store.pages.length;
    store.pages.push(blogPost);
}

async function deletePage(index: number) {
    var pageId = store.pages[index].id;
    const result = await contentService.deletePage(pageId);

    // if (result.success) {
    //     const page = store.pages[index]
    //     if (!store.pages) return
    //         store.pages.splice(index, 1)
    // }
}

async function saveChanges(pageName: string) {
    var pageToSave = store.pages[0];
    await contentService.savePage(pageName, pageToSave);
}
</script>