import type { PostsItem } from "~/types"

export type PostsState ={
    url: string,
    postsList: PostsItem[],
    isLoadingPosts: boolean,
    errorMessage: any,
    limit: number,
    offset: number,
    total: number,
}

export const usePostsStore = defineStore('postsStore', {
    state: () =>({
      url: "https://jsonplaceholder.typicode.com/posts",
      postsList: [],
      isLoadingPosts: false,
      errorMessage: null,
      limit: 10,
      offset: 0,
      total: 0,
    } as unknown as PostsState),
    getters:{
      isExistNextPage():boolean{
        return this.total > this.offset;
      }
    },
    actions: {
      async fetch(isFirstFetch: boolean) {
        if(isFirstFetch){
          this.offset = 0;
        }
        this.isLoadingPosts = true;
        try{
          const response: any = await fetch(`${this.url}?_limit=${this.limit}&_start=${this.offset}`);
          this.total = +response.headers.get('x-total-count');
          const data = await response.json();
          this.postsList = [...this.postsList,  ...data];
          this.offset += this.limit;
        }catch (error: unknown) {
          if (error instanceof Error) {
            this.errorMessage = error.message;
            console.log("Error:", this.errorMessage.message);
          } else {
            console.log("Неизвестная ошибка:", error);
          }
        }finally{
          this.isLoadingPosts = false;
        }
      },
      // 5) Добавить возможность ordering таблицы по ID
      // странная просьба, так как посты уже отсортированы по id, добавил сортировку по тайтлу еще
      sortPostsById(){
        this.postsList.sort((a:PostsItem, b:PostsItem) => a.id - b.id);
      },
      sortPostsByTitle(){
        this.postsList.sort((a:PostsItem, b:PostsItem) => a.title.localeCompare(b.title));
      },
      async addPost(post: any){
        const response: PostsItem = await $fetch(this.url, {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        this.postsList.unshift(response);
      }
    }
  })