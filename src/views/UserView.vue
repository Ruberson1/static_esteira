<template>
  <div class="container mx-auto mt-12">
    <div class="py-6 hidden md:block">
      <h1 class="text-6xl text-center dark:text-gray-50">
        Usuários:
      </h1>
    </div>

    <!--  DIALOG  -->

    <Dialog v-model:visible="visible"  modal header="Editar Usuário" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
      <div class="flex flex-wrap flex justify-content-center p-4">
        <div class="card justify-content-center p-2 w-full " :class="{'pointer-events-none': !master}">
          <p>Status</p><InputSwitch v-model="user.active" @click="user.active = !user.active"/>
        </div>
        <div class="card justify-content-center p-2 w-full">
          <span class="p-float-label">
            <InputText id="{{user.id}}" class="w-full p-inputtext-sm" v-model="user.name" />
            <label for="username">Nome</label>
          </span>
        </div>
        <div class="card  w-full justify-content-center p-2">
          <span class="p-float-label">
              <InputText id="{{user.id}}" class="w-full p-inputtext-sm" v-model="user.email" />
              <label for="username">Email</label>
          </span>
        </div>
        <div class="card flex justify-content-center w-64 p-2">
          <Dropdown v-model="user.profile" :options="profiles" optionLabel="name" placeholder="Selecione o Perfil" class="w-full p-inputtext-sm md:w-14rem" />
        </div>
        <div class="card flex flex-wrap gap-3 w-full justify-content-center pl-2">
          <a @click="editUserById(user.id); visible = false;" class="cursor-pointer bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">Salvar</a>
        </div>
      </div>
    </Dialog>

    <!--  TABLE  -->

    <div class="overflow-auto rounded-lg shadow dark:shadow-cyan-500/50 hidden md:block">
      <table class="w-full">
        <thead class="bg-gray-50 dark:bg-gray-600 border-b-2 border-gray-200 dark:border-gray-50">
        <tr>
          <th class="w-0.5 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">ID</th>
          <th class="w-36 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Nome</th>
          <th class="w-72 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Email</th>
          <th class="w-24 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Status</th>
          <th class="w-32 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Perfil</th>
          <th class="w-5 p-3 text-sm font-semibold text-gray-700 dark:text-gray-50 tracking-wide text-left">Ação</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
        <tr v-for="(user, index) in users" :key="index" class="bg-white dark:bg-gray-800">
          <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
            <span class="font-bold  ">{{ user.id }}</span>
          </td>
          <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
            {{ user.name }}
          </td>
          <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">{{ user.email }}

          </td>
          <td class="p-3 text-sm text-gray-700 dark:text-cyan-300  whitespace-nowrap">
            <div  class="card flex justify-content-center ">
              <span :class="[user.active ? 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300' : 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300']"
                    class="inline-flex items-center justify-center w-20 text-sm font-medium">
                {{ user.active ? 'ATIVO' : 'INATIVO' }}
              </span>
            </div>
          </td>
          <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
            {{ user.profile.name }}
          </td>
          <td class="p-3 text-sm text-gray-700 dark:text-cyan-300 whitespace-nowrap">
            <svg @click="visible = true;"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!--  CARD  -->

    <div  class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
      <div class="py-2 ">
        <h1 class="text-3xl text-center dark:text-gray-50">
          Usuários:
        </h1>
      </div>
      <div v-for="(user, index) in users" :key="index" class="bg-white dark:bg-gray-800 space-y-3 p-4 rounded-lg shadow dark:shadow-cyan-500/50">
        <div class="flex items-center space-x-8 text-sm">
          <div>
            <a href="#" class=" font-bold">{{user.id}}</a>
          </div>
          <div class="text-gray-500 dark:text-cyan-300">{{ user.profile.name }}</div>
          <div>
            <div  class="card flex justify-content-center ">
              <span :class="[user.active ? 'text-green-800 bg-green-100 rounded dark:bg-green-900 dark:text-green-300' : 'text-red-800 bg-red-100 rounded dark:bg-red-900 dark:text-red-300']"
                    class="inline-flex items-center justify-center w-20 text-sm font-medium">
                {{ user.active ? 'ATIVO' : 'INATIVO' }}
              </span>
            </div>
          </div>
          <div>
            <svg @click=" visible = true;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer dark:text-cyan-300">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </div>
        </div>
        <div class="text-sm text-gray-700 dark:text-gray-50">
          {{ user.name }}
        </div>
        <div class="text-sm font-medium dark:text-cyan-300 text-black">
          {{ user.email }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useSidebarstore} from "@/store/sidebarStore";
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {decrypt} from "@/utils/utils";
import {ref, inject} from "vue";
import api from "@/main";
import "primevue/resources/themes/md-light-indigo/theme.css";

export default {
  name: "UserView",
  components: {
    InputSwitch,
    Dropdown,
    Dialog,
    InputText,
    Button
  },
  setup() {
    const active = ref(false);
    const visible = ref(false);
    const value = ref();
    const profiles = ref([]);
    const users = ref([
      {
        id: 1,
        name: 'Tony Stark',
        active: true,
        email: 'sextafeira@gmail.com',
        profile: {
          name: 'MASTER'
        }
      },
      {
        id: 2,
        name: 'Walter White',
        active: true,
        email: 'hisemberg@gmail.com',
        profile: {
          name: 'MASTER'
        }
      },
      {
        id: 3,
        name: 'Daenerys',
        active: true,
        email: 'drogon@gmail.com',
        profile: {
          name: 'TESTER'
        }
      },
      {
        id: 4,
        name: 'John Snow',
        active: false,
        email: 'johnjohn@gmail.com',
        profile: {
          name: 'DEV'
        }
      }
    ]);
    const user = ref({});
    const selectedProfile = ref();

    return {
      visible,
      value,
      profiles,
      selectedProfile,
      users,
      user,
      active
    }
  },

  beforeMount() {
    const visible = useSidebarstore();
    visible.isSidebarVisible = true
  },
}
</script>

<style scoped>

</style>