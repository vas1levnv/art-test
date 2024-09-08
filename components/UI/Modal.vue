<script setup lang="ts">
import { toRaw } from 'vue';
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()
const store = usePostsStore();
const title = ref<string>('');
const body = ref<string>('');
const errorMessage = ref<any>('');
const errorMessageEmpty = ref<any>('');
const isLoading = ref<boolean>(false);

const onAddPost = async() => {
    if(!title.value || !body.value){
        return errorMessageEmpty.value = 'Заполните пожалуйста все поля';
    }
    const post = {
        title: toRaw(title.value),
        body: toRaw(body.value),
        userId: 1,
    }
    try{
        isLoading.value = true;
        await store.addPost(post);
        title.value = '';
        body.value = '';
        errorMessageEmpty.value = '';
        emit('closeModal');
    }catch(error: unknown){
        if (error instanceof Error) {
            errorMessage.value = error.message;
            console.log("Error:", errorMessage);
          } else {
            console.log("Неизвестная ошибка:", error);
          }
    }finally{
        isLoading.value = false;
    }
    
};
const handleClose = () => {
    emit('closeModal');
}

</script>

<template>
    <div class="modal" @click="handleClose">
        <div class="modal-content relative" @click.stop>
            <button class="absolute top-5 right-5 p-2" @click="handleClose">X</button>
            <h2 class="text-4xl text-center mb-5">Создать пост:</h2>
            <div v-if="errorMessageEmpty" class="text-red-600">{{ errorMessageEmpty }}</div>
            <div v-if="isLoading">Идет отправка поста...</div>
            <div v-else-if="errorMessage" class="text-red-600">{{errorMessage}}</div>
            <div v-else class="grid gap-4">
                <label>
                    <div>Title:</div>
                    <UICutomInput v-model="title" placeholder="введите title"/>
                </label>
                <label>
                    <div>Body:</div>
                    <UICutomInput v-model="body" placeholder="введите body"/>
                </label>
                <UICutomButton @click="onAddPost">
                    Создать пост
                </UICutomButton>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .modal{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0,0,0,.4);
        padding: 20px;
    }
    .modal-content{
        width: 100%;
        max-width: 600px;
        padding: 20px;
        border-radius: 20px;
        background-color: white;
    }
</style>