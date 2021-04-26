<template>
  <div>
    <app-Layout />
  </div>
</template>

<script>
import Layout from './components/Layout.vue';
export default {
  components: {
    'app-Layout': Layout
  }
}
</script>

<style>
*{
  -webkit-tap-highlight-color: transparent !important;
}
</style>
