<template>
<div>
  <v-card-title>Konular</v-card-title>
  <div>
    <v-data-table
    :loading="loginTable"
    :loading-text="'Yükleniyor...'"
    :headers="headers"
    :items="apiTopics"
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
       <v-btn @click="addNewTopic()" color="primary" >
         Yeni Ekle
       </v-btn>
     </v-toolbar>
   </template>
   <template v-slot:item.testCount="{ item }">
     <v-btn v-if="item.testCount==0"
      depressed
      outlined
      disabled
    >{{item.testCount}}</v-btn>
    <v-btn v-else
      depressed
      outlined
      color="accent"
    >{{item.testCount}}</v-btn>
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
    :title="'Başlık Ekle'"
  >
    <template v-slot:form>
      <v-form v-model="formValid">
       <v-row>
            <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="topic.topicName"
              :rules="nameRules"
              label="Başlık Adı"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="topic.topicDesc"
              label="Açıklama"
              required
            ></v-text-field>
          </v-col>

        </v-row>
        <v-row>
          <v-col cols="12">
          <v-autocomplete
            v-model="topic.levelID"
            :items="getLevelSelect"
            outlined
            :loading="loadingSelect"
            item-text="text"
            item-value="value"
            label="LevelSeçin"
          ></v-autocomplete>
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
        @click="saveTopic()"
      > Kaydet
      </v-btn>
    </template>
  </simple-form-dialog>
<!--S,lme ONay  Dialoğu -->
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
        levelID:0,
        loginTable:false,
        loadingSelect:false,
        search:"",
        loadingSaveButton:false,
        question:false,
        dialog:false,
        formValid:false,
        page:1,
        pageCount:1,
        topic:{
            id:0,
            topicName:"",
            topicDesc:"",
            levelID:1,
        },
        nameRules: [
        v => !!v || 'Gerekli Alan',
      ],
        headers: [
          {
            text: 'Konu Adı',
            align: 'start',
            value: 'topicName',
          },
          { text: 'Konu Açıklama', value: 'topicDesc' },
          { text: 'Level Adı', value: 'levelName' },
          { text: 'Başlık Sayısı', value: 'testCount' },
          { text: 'Düzenle', value: 'actions' }
        ],
      }
    },
    methods:{
      ...mapActions(
        {
           getTopicAsycn:"topic/getTopicAsycn",
           addTopicAsync:"topic/addTopicAsync",
           deleteLevelAsync:"topic/deleteTopicAsync",
           updateTopicAsync:"topic/updateTopicAsync",
           getLevelSelectAsycn:"topic/getLevelSelectAsycn",
        },
      ),        
      async getTopics(){
        this.loginTable=true;
        let result={
          search:"all",
          page:this.page,
          levelID:this.levelID
        };
        if(this.search!=""){
          result.search=this.search;
        }
        var retVal= await this.getTopicAsycn(result);
        this.pageCount=retVal.pageCount;
        this.loginTable=false;
      },

      async editItem(val){
        this.dialog=true;
        this.loadingSelect=true;
        await this.getLevelSelectAsycn();
        this.loadingSelect=false;
        this.populateForm(val);

      },
      async addNewTopic(){
        this.dialog=true;
        this.populateForm();
        this.loadingSelect=true;
        await this.getLevelSelectAsycn();
        this.loadingSelect=false;
      },
      async saveTopic(){
        let retVal;
        this.loadingSaveButton=true;
        if(this.topic.id==0){
          retVal = await this.addTopicAsync(this.topic);         
          this.dialog=false;
        }else{
          retVal = await this.updateTopicAsync(this.topic);
          this.dialog=false;
        }
        this.getTopics();
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
        await this.deleteLevelAsync(this.topic);
        this.loginTable=false;
      },

      populateForm(bumo=""){
        if(bumo==""){
          this.topic={
            id:0,
            topicName:"",
            topicDesc:"",
            levelID:0,
          };
        }else{
          console.log(bumo);
          this.topic={
            id:bumo.id,
            topicName:bumo.topicName,
            topicDesc:bumo.topicDesc,
            levelID:bumo.levelID,
          };
        }
        
      }
    },

    computed:{
      ...mapGetters({
          apiTopics:"topic/getTopics",
          getLevelSelect:"topic/getLevelSelect",
        }),
    },

    created(){
     this.getTopics();
    },

    watch:{
      page(val){
        this.getTopics();
      },
      search(val){
        this.getTopics();
      }
    },

  }
</script>

<style>

</style>