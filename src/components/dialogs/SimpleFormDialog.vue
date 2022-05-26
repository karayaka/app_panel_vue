<template>
  <v-row justify="center">
      <v-dialog
        v-model="dialogModel"
        persistent
        max-width="600px"
      >
      <v-card>
          <v-card-title>{{title}}</v-card-title>
          <v-card-text>
            <slot name="form"></slot>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <slot name="action"></slot>            
        </v-card-actions>
      </v-card>

      </v-dialog>
  </v-row>
</template>

<script>
export default {
    props:{
        dialogModel:false,

        title:{
            default:"Form",
        },
    },
    data(){
        return{
            
        }
    },


}
</script>

<style>

</style>