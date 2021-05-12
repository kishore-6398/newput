<template>
    <div>
      <p>Page start</p>

      {{ name }} 
      {{ email }}
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    //console.log(username)
    var name = computed(() => store.getters.getUsername);
    var email = computed(() => store.getters.getuserEmail);
    return{
      name,
      email
    }
  }
}
</script>

<style>

</style>