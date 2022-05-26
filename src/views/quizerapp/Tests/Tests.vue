<template>
<div>
  <v-card-title>Testler</v-card-title>
  <div>
    <v-data-table
    :loading="loginTable"
    :loading-text="'Yükleniyor...'"
    :headers="headers"
    :items="apiTest"
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
   <template v-slot:item.questionCount="{ item }">
     
    <v-btn
      depressed
      outlined
      x-small
      :to="{ name: 'questions', params: { id: item.id } }"
      color="accent"
    >{{item.questionCount}}</v-btn>
    </template>
    <template v-slot:item.testStatus="{ item }">
     <v-btn v-if="item.testStatus==0"
      depressed
      outlined
      x-small
      @click="changeTestStatus(item.id,1)"
    >Hazırlanıyor</v-btn>
    <v-btn v-else
      depressed
      outlined
      x-small
      color="accent"
      @click="changeTestStatus(item.id,0)"
    >Yayında</v-btn>
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
    :title="'Test Ekle'"
  >
    <template v-slot:form>
      <v-form v-model="formValid">
       <v-row>
            <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="test.testName"
              :rules="nameRules"
              label="Test Adı"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="test.testDesc"
              label="Açıklama"
              required
            ></v-text-field>
          </v-col>

        </v-row>
        <v-row>
            <v-col cols="6">
            <v-autocomplete
              v-model="test.topicID"
              :items="getLevelSelect"
              outlined
              :loading="loadingSelect"
              item-text="text"
              item-value="value"
              label="Level Seçin"
            ></v-autocomplete>
          </v-col>
          <v-col md="6">
            <v-autocomplete
              v-model="test.adsStatus"
              :items="adStatus"
              outlined
              :loading="loadingSelect"
              item-text="text"
              item-value="value"
              label="Reklam Durumu Seçin"
            ></v-autocomplete>
          </v-col>
          
        
        </v-row>
        <v-row>
          <v-col md="6">
            <v-checkbox
                v-model="test.showTestStartDesc"
                label="Başlangıç Metni"
                color="primary"
              ></v-checkbox>
          </v-col>
          <v-col md="6" v-if="test.showTestStartDesc">
          <v-text-field
            v-model="test.testStartDesc"
            label="Test Başlangıç Açıklama"
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
        @click="saveTest()"
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
        topicID:0,
        loginTable:false,
        loadingSelect:false,
        search:"",
        loadingSaveButton:false,
        question:false,
        dialog:false,
        formValid:false,
        page:1,
        pageCount:1,
        test:{
            id:0,
            testName:"",
            testDesc:"",
            topicID:1,
            showTestStartDesc:false,
            testStartDesc:"",
            adsStatus:0       
        },
        nameRules: [
        v => !!v || 'Gerekli Alan',
      ],
        headers: [
          {
            text: 'Test Adı',
            align: 'start',
            value: 'testName',
          },
          { text: 'Test Açıklama', value: 'testDesc' },
          { text: 'Başlık Adı', value: 'topicName' },
          { text: 'Başlangıç Açıklama', value: 'testStartDesc' },
          { text: 'Test Durumu', value: 'testStatus' },
          { text: 'Reklam Durumu', value: 'adsStatusStr' },
          { text: 'Soru Sayısı', value: 'questionCount' },
          { text: 'Düzenle', value: 'actions' }
        ],
      }
    },
    methods:{
      ...mapActions(
        {
           getTestAsycn:"test/getTestAsycn",
           addTestAsync:"test/addTestAsync",
           deleteTestAsync:"test/deleteTestAsync",
           updateTestAsync:"test/updateTestAsync",
           getTopicSelectAsycn:"test/getTopicSelectAsycn",
           changeTestStatusAsync:"test/changeTestStatusAsync"
        },
      ),        
      async getTests(){
        this.loginTable=true;
        let result={
          search:"all",
          page:this.page,
          topicID:this.topicID
        };
        if(this.search!=""){
          result.search=this.search;
        }
        var retVal= await this.getTestAsycn(result);
        this.pageCount=retVal.pageCount;
        this.loginTable=false;
      },

      async editItem(val){
        this.dialog=true;
        console.log(val)
        this.loadingSelect=true;
        await this.getTopicSelectAsycn();
        this.loadingSelect=false;
        this.populateForm(val);

      },

      async addNewTopic(){
        this.dialog=true;
        this.populateForm();
        this.loadingSelect=true;
        await this.getTopicSelectAsycn();
        this.loadingSelect=false;
      },
      async saveTest(){
        let retVal;
        this.loadingSaveButton=true;
        if(this.test.id==0){
          retVal = await this.addTestAsync(this.test);         
          this.dialog=false;
        }else{
          retVal = await this.updateTestAsync(this.test);
          this.dialog=false;
        }
        this.getTests();
        if(retVal.data!=-1){
          this.populateForm();
        }
        this.loadingSaveButton=false;
      },

      async changeTestStatus(id,status){
        
        await this.changeTestStatusAsync({id:id,testStatus:status});
        this.getTests();
      },

      deleteItem(val){
        this.question=true;
        this.populateForm(val);
      },

      async deleteItemAsync(){
        this.loginTable=true;
        await this.deleteTestAsync(this.test);
        this.loginTable=false;
      },

      populateForm(bumo=""){
        if(bumo==""){
          this.test={
            id:0,
            testName:"",
            testDesc:"",
            topicID:1,
            showTestStartDesc:false,
            testStartDesc:"",
            adsStatus:0  
          };
        }else{
          this.test={
            id:bumo.id,
            testName:bumo.testName,
            testDesc:bumo.testDesc,
            topicID:bumo.topicID,
            showTestStartDesc:bumo.showTestStartDesc,
            testStartDesc:bumo.testStartDesc,
            adsStatus:bumo.adsStatus
          };
        }
        console.log(bumo);
        
      }
    },

    computed:{
      ...mapGetters({
          apiTest:"test/getTests",
          getLevelSelect:"test/getTopicSelect",
          adStatus:"getAdStatuses",
        }),
    },

    created(){
     this.getTests();
    },

    watch:{
      page(val){
        this.getTests();
      },
      search(val){
        this.getTests();
      }
    },

  }
</script>

<style>

</style>