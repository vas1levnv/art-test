<script setup lang="ts">
const isShowModalPost = ref<boolean>(false); 
const toggleModalPost = () => {
  isShowModalPost.value = !isShowModalPost.value;
};
</script>

<template>
  <div class="container mx-auto px-5 my-5">
    <header class="sticky top-0 bg-white py-5">
      <UICutomButton @click="toggleModalPost">
        Добавить пост
      </UICutomButton>
    </header>
    <PostsList/>
    <UIModal v-if="isShowModalPost" @closeModal="toggleModalPost"/>
  </div>
</template>
