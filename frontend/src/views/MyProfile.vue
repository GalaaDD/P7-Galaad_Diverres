<template>
  <div class="flex flex-col">
    <h2 class="block m-auto text-2xl">My Profile</h2>
    <hr />
    <label class="py-1 flex">
      <span class="w-24">Username: </span>
      <input class="shadow p-1 bg-gray-100 w-64" v-model="username" />
    </label>
    <label class="py-1 flex">
      <span class="w-24">Email:</span>
      <input class="shadow p-1 bg-gray-100 w-64" type="email" v-model="email" />
    </label>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "../store/index.js";

export default defineComponent({
  setup() {
    const store = useStore();

    const username = computed({
      get: () => store.getUsername.value,
      set: store.updateUsername,
    });

    const email = computed({
      get: () => store.getEmail.value,
      set: store.updateEmail,
    });

    return {
      username,
      email,
    };
  },
});
</script>