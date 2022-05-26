<template>
  <v-app>
    <block-ui></block-ui>
    <global-toaster></global-toaster>
    <router-view/> 
  </v-app>
</template>

<script>
import blockUi from './components/core/Block_UI.vue'
import GlobalToaster  from './components/dialogs/GlobalToaster.vue'
export default {
  name: 'App',
  components:{
    GlobalToaster
  },
  data: () => ({
  }),
};
</script>
