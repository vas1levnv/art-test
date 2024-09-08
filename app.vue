<script setup lang="ts">
const isShowModalPost = ref<boolean>(false); 
const toggleModalPost = () => {
  isShowModalPost.value = !isShowModalPost.value;
};
</script>

<template>
  <div class="container mx-auto px-5 my-5">
    <UICutomButton class="sticky top-0 mb-5" @click="toggleModalPost">
      Добавить пост
    </UICutomButton>
    <PostsList/>
    <UIModal v-if="isShowModalPost" @closeModal="toggleModalPost"/>
  </div>
</template>
