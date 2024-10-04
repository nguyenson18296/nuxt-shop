<script setup lang="ts">
import dayjs from 'dayjs';
import { PhChat, PhStar } from '@phosphor-icons/vue';

interface IReview {
  id: number;
  content: string;
  is_mine: boolean;
  created_at: string;
  user: {
    id: number;
    username: string;
    email: string;
    avatar: string;
  }
  replies: IReview[];
  rating: number;
}

const comment = defineModel<string>('comment', {
  default: ''
});

const reviews = ref<IReview[]>([]);
const route = useRoute()
const slug = route.params.slug[0];
const { authenticated, user } = useAuthStore();

onMounted(async () => {
  await fetchData();
});

async function fetchData() {
  const { data, execute, status } = useFetch<{
    data: IReview[];
    success: boolean;
  }>(`/api/product-reviews/${slug}`, {
    baseURL: 'http://localhost:1996',
    method: 'GET',
    key: `product-reviews-${slug}`,
  });

  // Execute the fetch and await its completion
  await execute();

  if (data.value?.success) {
    reviews.value = data.value.data;
  } else {
    // Handle errors or unsuccessful fetch
    console.error('Failed to fetch reviews: ', status);
  }
}

const toast = useNuxtApp().$toast;

const createComment = async (e: MouseEvent) => {
  e.preventDefault();
  try {
    const formData = {
      user_id: user.id,
      product_slug: slug,
      content: comment.value,
      rating: rating.value
    }
    await useFetch<{ success: boolean; data: IReview }>(`/api/product-reviews`, {
      baseURL: 'http://localhost:1996',
      method: 'POST',
      body: JSON.stringify(formData),
      onResponse: async ({ response }) => {
        if (response.ok) {
          const data = response._data.data
          reviews.value.push(data);
          comment.value = '';
          selectedRepliedId.value = 0;
          toast('Review submitted successfully', 5000, 'success');
        }
      },
      onResponseError: (error) => {
        toast('Submit review failed. Please try again.', 5000, 'error');
      }
    });
  } catch (e) {
    toast('Submit review failed. Please try again.', 5000, 'error');
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
        const parentComment = reviews.value.find((review: IReview) => review.id === replyId)
        if (parentComment) {
          parentComment.replies.push(data)
        }
        comment.value = '';
        selectedRepliedId.value = 0;
      }
    },
    onResponseError: (error) => {
      toast('Submit review failed. Please try again.', 5000, 'error');
    }
  });
}

const selectedRepliedId = defineModel<number>('selectedRepliedId', {
  default: 0
});

const onToggleReply = (replyId: number) => {
  selectedRepliedId.value = replyId
}

const rating = defineModel<number>('rating', {
  default: 5
});

const onRatingChange = (newRating: number) => {
  rating.value = newRating
}

const convertRatingToText = computed(() => {
  if (rating.value === 1) {
    return 'Poor'
  } else if (rating.value === 2) {
    return 'Fair'
  } else if (rating.value === 3) {
    return 'Good'
  } else if (rating.value === 4) {
    return 'Very Good'
  } else if (rating.value === 5) {
    return 'Excellent'
  }
})
</script>

<template>
  <div>
    <div class="user-ratings" v-if="reviews.length > 0">
      <div v-for="review in reviews" :key="review.id" class="product-ratings hover:bg-[#fbfbfb] flex items-start">
        <a class="avatar text-center w-10 mr-2.5">
          <div class="user-avatar h-10 w-10 border-0">
            <img v-if="review.user.avatar" :src="review.user.avatar" :alt="review.user.username" />
            <img v-else src="/img/avatar-placeholder.svg" :alt="review.user.username" />
          </div>
        </a>
        <div class="main-rating flex flex-col flex-1 mb-2">
          <a class="author-name font-bold text-[rgba(0,0,0,0.87)] text-xs no-underline">
            {{ review.user.username }}
          </a>
          <div class="mb-4">
            <div class="form-rating flex gap-1">
              <PhStar
                v-for="(v, i) of 5" 
                :key="i"
                size="16"
                color="#ffbf34"
                :weight="review.rating >= i + 1 ? 'fill' : 'light'"
                fill="#ffbf34"
              />
            </div>
            <p class="text-xs">
              {{ dayjs(review.created_at).format('MMMM DD, YYYY, HH:MM') }}
            </p>
            <p
              class="content mt-2 relative box-border text-sm leading-5 text-[rgba(0,0,0,0.87)] whitespace-pre-wrap mx-0 mt-1">
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
                <img v-if="reply.user.avatar" :src="reply.user.avatar" :alt="reply.user.username" />
                <img v-else src="/img/avatar-placeholder.svg" :alt="reply.user.username" />
              </div>
            </a>
            <div class="main-rating flex flex-col flex-1">
              <a class="author-name font-bold text-[rgba(0,0,0,0.87)] text-xs no-underline">
                {{ reply.user.username }}
              </a>
              <div class="mx-0 mt-1 mb-2">
                <p class="text-xs">
                  {{ dayjs(reply.created_at).format('MMMM DD, YYYY, HH:MM') }}
                </p>
                <p class="content mt-2 relative box-border text-sm leading-5 text-[rgba(0,0,0,0.87)] whitespace-pre-wrap">
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
          <form class="flex flex-col gap-2 flex-1">
            <textarea v-model="comment" class="w-full border border-gray-300 rounded-md p-2 h-[100px]"
              placeholder="Write a review" />
            <div class="form-rating mt-2 flex gap-1">
              <PhStar
                v-for="(v, i) of 5" 
                :key="i"
                size="16"
                color="#ffbf34"
                :weight="rating >= i + 1 ? 'fill' : 'light'"
                fill="#ffbf34"
                @click="() => onRatingChange(i + 1)"
                class="cursor-pointer"
              />
              <span class="ml-2 text-[#000000de] text-sm">
                {{ convertRatingToText }}
              </span>
            </div>
            <button @click="createComment" type="submit"
              class="mt-4 bg-blue-500 text-white rounded-md p-2 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              :disabled="!comment">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
