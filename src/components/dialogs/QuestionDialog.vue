<template>
  <v-row justify="center">
       <v-dialog
        v-model="openDialog"
        persistent
        max-width="600px"
      >
      <v-card>
        <v-card-title class="text-h5">
          {{title}}
        </v-card-title>
        <v-card-text>{{context}}</v-card-text>
        <v-card-actions class="justify-end">
            <v-btn
                color="red darken-1"
                dark
                @click="openDialog = false"
            >Hayır
            </v-btn>
            <v-btn
                color="blue darken-1"
                dark
                @click="confirmDialog()"
            > Evet
            </v-btn>
        </v-card-actions>
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
            default:"Silme Onayı",
        },
        context:{
            default:"Veriyi Silmek İstediğinizden Emin misiniz?",
        },
    },
    data(){
        return{
            openDialog:false,
        }

    },
    methods:{
        confirmDialog(){
            this.openDialog=false;
            this.$emit("onConfirme",true)
        }
    },
    watch:{
        value(val){
            this.openDialog=val;
        },
        openDialog(val){
            this.$emit("input",this.openDialog)
        }
    }

}
</script>

<style>

</style>