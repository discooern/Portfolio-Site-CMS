<template>
    <div class="p-[1rem] w-[100%]">
        <div class="flex flex-row space-around">
        </div>
        <div class="flex flex-row space-around">
            <div class="flex flex-col text-[1.1em] font-bold w-[20vw] py-[1rem] bg-[gray] items-center gap-[.8rem]">
                <div>
                    <div v-for="(item, currentPageIndex) in store.routes" class="w-[130px] flex justify-center p-0 m-0">
                        <input class="w-[130px] p-[.2rem] py-[.4rem] my-[.3rem] text-[.8em] bg-[white] cursor-pointer hover:text-[gray]"
                        type="text" v-model="item.title"
                    :class="currentlySelectedPageIndex == currentPageIndex ? 'text-[gray]' : ''"
                    @click="setIndex(currentPageIndex)"></input>
                        <p class="my-auto ml-[.5rem] text-[red] text-[1.2em] cursor-pointer hover:text-[pink]" style="-webkit-text-stroke: .5px black;" @click="deletePage(item.id)">X</p>
                    </div>
                </div>
                <button class="w-[80%] p-0" @click="createPage">Create Page</button>
            </div>
            <div class="content-edit-box flex flex-col">
                <div class="flex flex-col border-[6px] w-[65vw] h-[fit-content] min-h-[65vh] max-h-[65vh] border-[gray] overflow-y-scroll">
                    <!-- Display component with content dynamically generated from prop of site we are editing -->
                    <EditorBlock v-if="selectedBlogPost != undefined"
                        :blogPost="selectedBlogPost"
                        @saveContent="saveContent($event, selectedBlogPost.id)" @deleteContent="deleteContent(selectedBlogPost.id)">
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
import type BlogPostDTO from '../types/blogPostDTO';
import type ContentModel from '../types/content';
import type BlogPost from '../types/blogPost';

const store: any = useMainStore();

// Services
const contentService: ContentService = new ContentService;

// Fields
let currentlySelectedPageIndex = ref(0);
let addContentToggled = ref(false);
let selectedBlogPost: BlogPost | undefined;

setIndex(0);

// Functions
function addItem(item: ContentModel) {
    store.routes[currentlySelectedPageIndex.value].content.push(item)
    addContentToggled.value = false
}

function saveContent(content: string, index: number) {
    store.routes[currentlySelectedPageIndex.value].content[index].content = content;
}

function deleteContent(index: number) {
    const page = store.routes[currentlySelectedPageIndex.value]
    if (!page || !Array.isArray(page.content)) return
    page.content.splice(index, 1)
}

async function setIndex(index: number) {
	currentlySelectedPageIndex.value = index;
    console.log("new index", currentlySelectedPageIndex.value)
	
	let page = store.routes[index];
	
    const result = await contentService.getArticleContent(page.id);
	console.log("result", result);
	selectedBlogPost = result.data;
}

function closeModal() {
    addContentToggled.value = false;
    console.log("no")
}

function createPage() {
    const blogPost: BlogPostDTO =
    {
		title: "New Page",
		slug: "New-Page",
		contentJson: [],
		summary: "",
		isPublished: false,
		authorId: 0
	};

    currentlySelectedPageIndex.value = store.routes.length;
    store.routes.push(blogPost);
}

async function deletePage(id: string) {
	var page = store.routes.find((route: any) => route.id === id);

	let pageIndex = store.routes.indexOf(page);
	
    const result = await contentService.deletePage(page.id);

    if (result.status === 200) {
        const page = store.routes[pageIndex]

        if (!store.routes) return

		store.routes.splice(pageIndex, 1);
    }
}

async function saveChanges(pageName: string) {
    var pageToSave = store.routes[0];
    await contentService.savePage(pageName, pageToSave);
}
</script>