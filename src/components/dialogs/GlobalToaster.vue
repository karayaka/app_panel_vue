<template>
    <v-snackbar
      v-model="showResult"
      :timeout="2000"
      :color="color"
      absolute
      right
      rounded="pill"
      bottom>
      {{ result }}
    </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return{
      }
    },
    computed:{
      ...mapGetters({
        result:'globalToast/getResult',
      }),
      color:{
        get:function(){
          return this.$store.state.globalToast.messageColor
        }
      },    
      showResult:{
        set:function(value){
          this.$store.state.globalToast.showResult=value;
        },
        get:function(){
          return this.$store.state.globalToast.showResult;
        }
      }
    }
}
</script>

<style>
</style>