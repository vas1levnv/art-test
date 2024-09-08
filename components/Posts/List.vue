<script setup lang="ts">
const store = usePostsStore();
const handleShowMore = () => {
  store.fetch(false);
}

onMounted(() => {
  store.fetch(true);
});  
</script>

<template>
  <div>
    <div v-if="store.isLoadingPosts && !store.postsList.length" class="spinner">Идет загрузка постов...</div>
    <div v-else-if="store.errorMessage">{{store.errorMessage}}</div>
    <div v-else>
      <div class="sticky top-12 d-flex mb-3 bg-white py-2">
        <UICutomButton @click="store.sortPostsValue('id')">Отсортировать по id</UICutomButton>
        <UICutomButton @click="store.sortPostsValue('title')">Отсортировать по title</UICutomButton>
      </div>
      <div class="grid gap-3 grid-cols-1 md:grid-cols-3">
        <div v-for="post in store.sortedPostList"
        class="border border-orange-500 rounded-lg mb-3 px-2"
        :key="post.id">
          <p>id: {{ post.id }}</p>
          <p>userId: {{ post.userId }}</p>
          <p>title: {{ post.title }}</p>
          <p>body: {{ post.body }}</p>
        </div>
      </div>
      <UICutomButton v-if="store.isExistNextPage" @click="handleShowMore">{{ store.isLoadingPosts ? 'Идет загрузка постов...' : 'Показать еще'}}</UICutomButton>
    </div>
  </div>
</template>
