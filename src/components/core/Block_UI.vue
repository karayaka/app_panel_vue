<template>
  <v-overlay :value="blogUI">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters({
            blogUI:"globalToast/getBlockUI"
        }),  
    }

}
</script>

<style>

</style>