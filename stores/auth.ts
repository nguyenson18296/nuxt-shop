import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}

export interface UserInterface {
  id: number;
  email: string;
  username: string;
  avatar: string;
}

interface IAuthState {
  authenticated: boolean;
  user: UserInterface;
}

export const useAuthStore = defineStore('auth', {
  state: (): IAuthState => ({
    authenticated: false,
    user: {
      id: 0,
      email: '',
      username: '',
      avatar: '',
    }
  }),
  actions: {
    async login(payload: UserPayloadInterface) {
      try {
        const { data } = await useFetch<{
          access_token: string;
          data: UserInterface;
        }>('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        console.log('data', data.value)
        if (data.value) {
          this.authenticated = true;
          this.user.id = data.value.data.id;
          this.user.email = data.value.data.email;
          this.user.username = data.value.data.username;
          this.user.avatar = data.value.data.avatar;
          const token = useCookie('token');
          console.log('token', token)
          token.value = data.value.access_token;
        }
      } catch (e) {
        console.error(e);
      }
    },
    setUser(userPayload: UserInterface) {
      this.authenticated = true;
      this.user.id = userPayload.id;
      this.user.email = userPayload.email;
      this.user.username = userPayload.username;
      this.user.avatar = userPayload.avatar;
    },
    async logout() {
      console.log('Logging out');
      this.authenticated = false;
    },
  }
})