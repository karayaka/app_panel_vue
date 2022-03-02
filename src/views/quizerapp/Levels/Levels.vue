<template>
<div>
  <v-card-title>Seviyeler</v-card-title>
  <div>
    <v-data-table
    :loading="loginTable"
    :loading-text="'Yükleniyor...'"
    :headers="headers"
    :items="apilevels"
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
       <v-btn @click="dialog=true" color="primary" >
         Yeni Ekle
       </v-btn>
     </v-toolbar>
   </template>
   <template v-slot:item.topicCount="{ item }">
     <v-btn v-if="item.topicCount==0"
      depressed
      outlined
      disabled
    >{{item.topicCount}}</v-btn>
    <v-btn v-else
      depressed
      outlined
      color="accent"
    >{{item.topicCount}}</v-btn>
    </template>
   <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
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
<!--Form Dialog Model -->
  <simple-form-dialog
    :dialogModel="dialog"
    :title="'Level Ekle'"
  >
    <template v-slot:form>
      <v-form v-model="formValid">
       <v-row>
            <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="level.levelName"
              :rules="nameRules"
              label="Level Adı"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="level.levelDesc"
              label="Açıklama"
              required
            ></v-text-field>
          </v-col>

        </v-row>
      </v-form>
    </template>
    <template v-slot:action>
      <v-btn
        color="red darken-1"
        dark
        @click="dialog = false"
      >Kapat
      </v-btn>
      <v-btn
        :loading="loadingSaveButton"
        color="blue darken-1"
        dark
        @click="saveLevel()"
      > Kaydet
      </v-btn>
    </template>
  </simple-form-dialog>
<!--Silme Onay  Dialoğu -->
  <question-dialog
   v-model="question" 
   @onConfirme="deleteItemAsync($event)"
   >
  </question-dialog>

</div>
</template>

<script>
import SimpleFormDialog from '../../../components/dialogs/SimpleFormDialog.vue';
import PaginatedDatable from '../../../components/tables/PaginatedDatable.vue';
import {mapActions,mapGetters} from 'vuex'
import QuestionDialog from '../../../components/dialogs/QuestionDialog.vue';
  export default {
  components: { PaginatedDatable, SimpleFormDialog, QuestionDialog },
    data () {
      return {
        loginTable:false,
        search:"",
        loadingSaveButton:false,
        question:false,
        dialog:false,
        formValid:false,
        page:1,
        pageCount:1,
        level:{
            id:0,
            levelName:"",
            levelDesc:"",
        },
        nameRules: [
        v => !!v || 'Gerekli Alan',
      ],
        headers: [
          {
            text: 'Lelvel Adı',
            align: 'start',
            value: 'levelName',
          },
          { text: 'Level Açıklama', value: 'levelDesc' },
          { text: 'Başlık Sayısı', value: 'topicCount' },
          { text: 'Düzenle', value: 'actions' }
        ],
      }
    },
    methods:{
      ...mapActions(
        {
           getLevelApi:"levels/getLevelAsycn",
           addLevelAsync:"levels/addLevelAsync",
           deleteLevelAsync:"levels/deleteLevelAsync",
           updateLevelAsync:"levels/updateLevelAsync",
        },
      ),        
      async getLelevels(){
        this.loginTable=true;
        let result={
          search:"all",
          page:this.page,
        };
        if(this.search!=""){
          result.search=this.search;
        }
        var retVal= await this.getLevelApi(result);
        this.pageCount=retVal.pageCount;
        this.loginTable=false;
      },

      editItem(val){
        this.dialog=true;
        this.populateForm(val);
      },

      async saveLevel(){
        let retVal;
        this.loadingSaveButton=true;
        if(this.level.id==0){
          retVal = await this.addLevelAsync(this.level);         
          this.dialog=false;
        }else{
          retVal = await this.updateLevelAsync(this.level);
          this.getLelevels();
          this.dialog=false;
        }
        if(retVal.data!=-1){
          this.populateForm();
        }
        this.loadingSaveButton=false;
      },

      deleteItem(val){
        this.question=true;
        this.populateForm(val);
      },

      async deleteItemAsync(){

        this.loginTable=true;
        await this.deleteLevelAsync(this.level);
        this.loginTable=false;
      },

      populateForm(bumo=""){
        if(bumo==""){
          this.level={
            id:0,
            levelName:"",
            levelDesc:"",
          };
        }else{
          console.log(bumo);
          this.level={
            id:bumo.id,
            levelName:bumo.levelName,
            levelDesc:bumo.levelDesc,
          };
        }
        
      }
    },

    computed:{
      ...mapGetters({
          apilevels:"levels/getLevels",
        }),
    },

    created(){
      this.getLelevels();
    },

    watch:{
      page(val){
        this.getLelevels();
      },
      search(val){
        this.getLelevels();
      }
    },

  }
</script>

<style>

</style>