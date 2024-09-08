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
    <div v-else-if="store.errorMessage" class="spinner">{{store.errorMessage}}</div>
    <div v-else>
      <div class="sticky top-8 d-flex mb-3">
        <UICutomButton @click="store.sortPostsById">Отсортировать по id</UICutomButton>
        <UICutomButton @click="store.sortPostsByTitle">Отсортировать по title</UICutomButton>
      </div>
      <div v-for="post in store.postsList"
      class="border border-orange-500 rounded-lg mb-3 px-2"
      :key="post.id">
        <p>id: {{ post.id }}</p>
        <p>userId: {{ post.userId }}</p>
        <p>title: {{ post.title }}</p>
        <p>body: {{ post.body }}</p>
      </div>
      <UICutomButton v-if="store.isExistNextPage" @click="handleShowMore">{{ store.isLoadingPosts ? 'Идет загрузка постов...' : 'Показать еще'}}</UICutomButton>
    </div>
  </div>
</template>
