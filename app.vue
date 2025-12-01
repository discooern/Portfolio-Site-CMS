<template>
  <body class="overflow-x-hidden">
    <div class="flex flex-col justify-between">
      <PageHeader>

      </PageHeader>
      <main class="max-w-[90vw] mx-auto">
        <NuxtLayout>
          <NuxtPage>

          </NuxtPage>
        </NuxtLayout>
      </main>
      <PageFooter>

      </PageFooter>
    </div>
  </body>
</template>

<script lang="ts">
// Components
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';

export default defineComponent({
  name: 'HomePage',
  components: { PageHeader, PageFooter },
})
</script>