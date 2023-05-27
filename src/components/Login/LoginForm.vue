<template>
  <form @submit.prevent="onSubmit" class="space-y-6 py-6">
    <div v-if="auth.showNameInput" >
      <input
          type="text"
          name="name"
          placeholder="Seu Nome"
          id="name"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400"
          v-model="name"
      />
    </div>
    <div>
      <input
          type="email"
          placeholder="Seu Email"
          name="email"
          id="email"
          v-model="email"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
      >
    </div>

    <div class="flex flex-col items-end">
      <input
          v-model="password"
          type="password"
          placeholder="Sua Senha"
          name="pass"
          id="pass"
          class="w-full py-3 px-6 ring-1 ring-gray-300 rounded-xl placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 invalid:ring-red-400 focus:invalid:outline-none"
      >
    </div>

    <div>
      <button type="submit" @click="loginOrRegister" class="w-full px-6 py-3 rounded-xl bg-yellow-500 transition hover:bg-yellow-600 focus:bg-yellow-600 active:bg-yellow-800">
        <span class="font-semibold text-white text-lg" >{{ auth.buttonLabel }}</span>
      </button>
      <a href="#" type="reset" class="w-max p-3 -ml-3">
        {{ auth.questionLabel }}
        <span class="text-sm tracking-wide text-yellow-600" @click="auth.toggleRegistration">{{ auth.buttonRegisterLabel }}</span>
      </a>
    </div>
  </form>
</template>

<script>
import { useAuthStore } from '@/store/auth/authStore';
import {inject, ref} from "vue";
import {encrypt} from "@/utils/utils";
export default {
  name: 'LoginForm',
  setup() {
    const swal = inject('$swal')
    const auth = useAuthStore();
    const email = ref('');
    const password = ref('');
    const user = ref(null);
    const token = ref(null);

    async function loginOrRegister() {
      if (auth.isRegistering) {
        if (!this.name || !this.email || !this.password) {
          swal({
            title: 'Erro ao cadastrar',
            imageUrl: 'https://media.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.gif',
            imageWidth: 150,
            imageHeight: 150,
            text: 'É necessário preencher todos os campos',
          });
        } else {
          window.location.href="/register-confirmation";
        }
      } else {
        if (!this.email || !this.password) {
          swal({
            title: 'Erro ao entrar',
            imageUrl: 'https://media.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.gif',
            imageWidth: 150,
            imageHeight: 150,
            text: 'É necessário preencher todos os campos',
          });
        } else if (this.email !== 'admin@email.com' || this.password !== '123456') {
          swal({
            title: 'Erro ao entrar',
            imageUrl: 'https://media.giphy.com/media/vyTnNTrs3wqQ0UIvwE/giphy.gif',
            imageWidth: 150,
            imageHeight: 150,
            text: 'Email ou senha incorretos',
          });
        } else {
          const email = encrypt(this.email, process.env.VUE_APP_ENCRYPT_KEY);
          sessionStorage.setItem('email', email);
          window.location.href="/";
        }
      }
    }
    return {
      auth,
      loginOrRegister,
      user,
      token,
      name,
      email,
      password
    };
  },
};
</script>

<style scoped>

</style>