<template>
    <div class="relative">
        <div class="absolute -top-0 -right-0 flex">
            <button class="add text-[.8em] p-[.2em] px-[.8em] m-[.5em]" @click="saveContent">Save</button>
            <button class="delete text-[.8em] p-[.2em] px-[.8em] m-[.5em]" @click="deleteContent">Delete</button>
        </div>

        <!-- Quill editor container -->
        <div ref="editorRef"></div>
    </div>
</template>

<script setup lang="ts">
import type Quill from 'quill';
import { ref, onMounted } from 'vue'

interface Props {
  contentJson: any;
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'saveContent', content: string): void
  (e: 'deleteContent'): void
}>()

const editorRef = ref<HTMLDivElement | null>(null)
let quillInstance: Quill | undefined = undefined;

onMounted(async () => {
  if (!editorRef.value) return;

  const Quill = (await import('quill')).default;
  await import('quill/dist/quill.core.css');
  await import('quill/dist/quill.snow.css');

  quillInstance = new Quill(editorRef.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['link', 'image', 'code-block', 'video', 'formula'],
        ['clean']
      ],
      clipboard: {
        matchVisual: false
      }
    }
  });

  // Load initial content
  if (props.contentJson) {
	console.log(props.contentJson);
	quillInstance.setContents(props.contentJson);
  }
})

function saveContent() {
  if (!quillInstance) return;
  emit('saveContent', quillInstance.root.innerHTML);
}

function deleteContent() {
  emit('deleteContent');
}
</script>
