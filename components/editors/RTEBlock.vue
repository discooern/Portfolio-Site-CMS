<template>
    <div class="relative">
        <div class="absolute -top-0 -right-0 flex">
            <button class="add text-[.8em] p-[.2em] px-[.8em] m-[.5em]" @click="saveContent">Save</button>
            <button class="delete text-[.8em] p-[.2em] px-[.8em] m-[.5em]" @click="deleteContent">Delete</button>
        </div>
        <div ref="editorRef"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  content: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'saveContent', content: string): void, (e: 'deleteContent'): void }>()

const editorRef = ref<HTMLDivElement | null>(null)
let quillInstance: any = null

onMounted(async () => {
  // Only run on client
  if (editorRef.value) {
    const Quill = (await import('quill')).default
    await import('quill/dist/quill.core.css')
    await import('quill/dist/quill.snow.css')

    quillInstance = new Quill(editorRef.value, {
      theme: 'snow'
    })

    if (props.content != undefined) {
        quillInstance.root.innerHTML = props.content;
    }
  }
})

function saveContent() {
  if (quillInstance) {
    const content = quillInstance.root.innerHTML
    emit('saveContent', content)
  }
}

function deleteContent() {
    if (quillInstance) {
        emit('deleteContent')
    }
}
</script>