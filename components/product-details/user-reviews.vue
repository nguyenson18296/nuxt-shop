<script setup lang="ts">
import { PhChat } from '@phosphor-icons/vue';
interface IReview {
  id: number;
  content: string;
  is_mine: boolean;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string;
  }
  replies: IReview[];
}

const comment = defineModel<string>('comment', {
  default: ''
});

const route = useRoute()
const slug = route.params.slug[0];
const { authenticated, user } = useAuthStore();

const { data } = await useFetch<{ data: IReview[] }>(`/api/product-reviews/${slug}`, {
  baseURL: 'http://localhost:1996',
  method: 'GET'
});

const reviews = data.value?.data ?? [] as IReview[];

console.log('reviews', reviews)

const createComment = async () => {
  try {
    const formData = {
      user_id: user.id,
      product_slug: slug,
      content: comment.value
    }
    await useFetch<{ success: boolean; data: IReview }>(`/api/product-reviews`, {
      baseURL: 'http://localhost:1996',
      method: 'POST',
      body: JSON.stringify(formData),
      onResponse: async ({ response }) => {
        if (response.ok) {
          const data = response._data.data
          reviews.push(data)
          comment.value = ''
        }
      },
      onResponseError: (error) => {
        console.error('error', error)
      }
    });
  } catch (e) {
    console.error('error', e)
  }
}

const createReplyComment = async (replyId: number) => {
  const formData = {
    user_id: user.id,
    product_slug: slug,
    content: comment.value,
    parent_comment_id: replyId
  }
  await useFetch<{ success: boolean; data: IReview }>(`/api/product-reviews`, {
    baseURL: 'http://localhost:1996',
    method: 'POST',
    body: JSON.stringify(formData),
    onResponse: async ({ response }) => {
      if (response.ok) {
        const data = response._data.data
        const parentComment = reviews.find((review: IReview) => review.id === replyId)
        if (parentComment) {
          parentComment.replies.push(data)
        }
        comment.value = ''
      }
    },
    onResponseError: (error) => {
      console.error('error', error)
    }
  });
}

const selectedRepliedId = defineModel<number>('selectedRepliedId', {
  default: 0
});

const onToggleReply = (replyId: number) => {
  selectedRepliedId.value = replyId
}
</script>

<template>
  <div class="user-ratings">
    <div v-for="review in reviews" :key="review.id" class="product-ratings flex items-start">
      <a class="avatar text-center w-10 mr-2.5">
        <div class="user-avatar h-10 w-10 border-0">
          <img v-if="review.user.avatar" :src="review.user.avatar" :alt="review.user.name" />
          <img v-else src="/img/avatar-placeholder.svg" :alt="review.user.name" />
        </div>
      </a>
      <div class="main-rating flex-1">
        <a class="author-name text-[rgba(0,0,0,0.87)] text-xs no-underline">
          {{ review.user.name }}
        </a>
        <div>
          <p
            class="content relative box-border text-sm leading-5 text-[rgba(0,0,0,0.87)] whitespace-pre-wrap mx-0 my-2">
            {{ review.content }}
          </p>
          <div class="flex items-center max-h-2xl shrink overflow-hidden mb-2">
            <button @click="() => onToggleReply(review.id)"
              class="flex items-center gap-1 text-sm hover:bg-[#dde2e6] px-4 py-1 rounded-lg cursor-pointer">
              <PhChat size="16" />
              <span>
                Reply
              </span>
            </button>
          </div>
          <div class="comment-form mt-4" v-if="authenticated && selectedRepliedId === review.id">
            <div class="flex items-start">
              <div class="commentator-avatar text-center w-10 mr-2.5">
                <img v-if="user.avatar" :src="user.avatar" :alt="user.username" />
                <img v-else src="/img/avatar-placeholder.svg" :alt="user.username" />
              </div>
              <div class="flex-1">
                <form class="flex items-center gap-2 flex-1">
                  <textarea v-model="comment" class="w-full border border-gray-300 rounded-md p-2 h-[100px]"
                    placeholder="Write a review" />
                </form>
                <button @click="() => createReplyComment(review.id)" type="submit"
                  class="mt-4 bg-blue-500 text-white rounded-md p-2">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div v-for="reply in review.replies" :key="reply.id" class="product-ratings flex items-start">
          <a class="avatar text-center w-10 mr-2.5">
            <div class="user-avatar h-10 w-10 border-0">
              <img v-if="reply.user.avatar" :src="reply.user.avatar" :alt="reply.user.name" />
              <img v-else src="/img/avatar-placeholder.svg" :alt="reply.user.name" />
            </div>
          </a>
          <div class="main-rating flex-1">
            <a class="author-name text-[rgba(0,0,0,0.87)] text-xs no-underline">
              {{ reply.user.name }}
            </a>
            <div class="mx-0 my-2">
              <p class="content relative box-border text-sm leading-5 text-[rgba(0,0,0,0.87)] whitespace-pre-wrap">
                {{ reply.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="comment-form mt-4" v-if="authenticated">
    <div class="flex items-start">
      <div class="commentator-avatar text-center w-10 mr-2.5">
        <img v-if="user.avatar" :src="user.avatar" :alt="user.username" />
        <img v-else src="/img/avatar-placeholder.svg" :alt="user.username" />
      </div>
      <div class="flex-1">
        <form class="flex items-center gap-2 flex-1">
          <textarea v-model="comment" class="w-full border border-gray-300 rounded-md p-2 h-[100px]"
            placeholder="Write a review" />
        </form>
        <button
          @click="createComment" 
          type="submit" 
          class="mt-4 bg-blue-500 text-white rounded-md p-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          :disabled="!comment"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
