<template>

  <v-row justify="center">
    <v-dialog
      v-model="openForm"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            :loading="loading"
            @click="openForm = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <slot name="confirmButton"></slot>
          </v-toolbar-items>
        </v-toolbar>
       <slot name="form"></slot>
        
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props:{
        value:{
            default:false,
            type:Boolean,
            required: true
        },
        title:{
            default:"Form",
        },
        loading:{
            default:false,
        },
        
    
    },
    data(){
        return{
            openForm:false,
        }
    },
    watch:{
        value(val){
            this.openForm=val;
        },
        openForm(val){
            this.$emit("input",this.openForm)
        }
    }
}
</script>

<style>

</style>