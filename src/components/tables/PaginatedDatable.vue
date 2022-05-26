<template>
  <div>
    <v-data-table
    :loading="loading"
    :loading-text="'Yükleniyor...'"
    :headers="headers"
    :items="datas"
    :items-per-page="25"
    hide-default-footer
    class="elevation-1"
  >
   <template v-slot:top>
     <v-toolbar flat> 
       <v-text-field
       v-model="search"
        append-icon="mdi-magnify"
        label="Ara"
        single-line
        hide-details
      ></v-text-field>
       <v-spacer></v-spacer>
       <v-btn @click="$emit('addItem')" color="primary" >
         Yeni Ekle
       </v-btn>
     </v-toolbar>
   </template>
   <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="$emit('editItem',item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="$emit('deleteItem',item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  <div class="text-center pt-2">
    <v-pagination
      v-model="page"
      :length="pageCount"
    ></v-pagination>
  </div>
  </div>
</template>

<script>
  export default {
    props:{
        headers:[],
        datas:[],
        loading:false,
        pageCount: {
            type: Number,
            default: 1
        },
    },
    data () {
      return {
        page:1,
        search:"",
      }
    },
    methods:{
        services(){
          let result={
            search:"all",
            page:this.page,
          };
          if(this.search!=""){
            result.search=this.search;
          }
          this.$emit("getdata", result);
        },
    },
    watch:{
      page(val){
        this.services();
      },
      search(val){
        this.page=1;
        this.services();
      }
    },
    mounted(){    
        if(this.headers){
            this.headers.push({ text: 'Düzenle', value: 'actions' });
        }
    }
  }
</script>

<style>

</style>