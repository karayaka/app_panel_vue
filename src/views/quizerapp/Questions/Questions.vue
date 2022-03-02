<template>
<div>
  <v-card-title>Seviyeler</v-card-title>
  <div>
    <v-data-table
    :loading="loginTable"
    :loading-text="'Yükleniyor...'"
    :headers="headers"
    :items="Questions"
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
    :title="'Soru Ekle'"
  >
    <template v-slot:form>
      <v-form v-model="formValid">
       <v-row>
            <v-col
            cols="12"
            md="12"
            >
              <v-text-field
                v-model="question.questionDesc"
                :rules="nameRules"
                label="Soru"
                required
              ></v-text-field>
            </v-col>
       </v-row>
       <v-row>
            <v-col
            cols="12"
            md="6"
            >
              <v-text-field
                v-model="question.ansverA"
                label="A Şıkkı"
                required
              ></v-text-field>
            </v-col>
            <v-col
            cols="12"
            md="6"
            >
              <v-text-field
                v-model="question.ansverB"
                label="B Şıkkı"
                required
              ></v-text-field>
            </v-col>
      </v-row>
      <v-row>
            <v-col
            cols="12"
            md="6"
            >
              <v-text-field
                v-model="question.ansverC"
                label="C Şıkkı"
                required
              ></v-text-field>
            </v-col>
            <v-col
            cols="12"
            md="6"
            >
              <v-text-field
                v-model="question.ansverD"
                label="D Şıkkı"
                required
              ></v-text-field>
            </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
            <v-autocomplete
              v-model="question.correctAnswer"
              :items="getCorrectAnsweres"
              outlined
              item-text="text"
              item-value="value"
              label="Doğru Cevap"
            ></v-autocomplete>
          </v-col>
          <v-col
            cols="12"
            md="6"
            >
              <v-text-field
                v-model="question.answerDesc"
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
<!--S,lme ONay  Dialoğu -->
  <question-dialog
   v-model="deleteQuestion" 
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
    data () {//tablo güncellenecek
      return {
        loginTable:false,
        search:"",
        deleteQuestion:false,
        loadingSaveButton:false,
        dialog:false,
        formValid:false,
        page:1,
        pageCount:1,
        question:{
            id:0,
            questionDesc:"",
            testID:0,
            ansverA:"",
            ansverB:"",
            ansverC:"",
            ansverD:"",
            answerDesc:"",
            correctAnswer:0,
        },
        nameRules: [
        v => !!v || 'Gerekli Alan',
      ],
        headers: [
          {
            text: 'No',
            align: 'start',
            value: 'questionNumber',
          },
          { text: 'Soru', value: 'questionDesc'},
          { text: 'Test', value: 'testName'},
          { text: 'A Şıkkı', value: 'ansverA'},
          { text: 'B Şıkkı', value: 'ansverB'},
          { text: 'C Şıkkı', value: 'ansverC'},
          { text: 'D Şıkkı', value: 'ansverD'},
          { text: 'Açıklama', value: 'answerDesc'},
          { text: 'Doğru Cevap', value: 'correctAnswerStr'},
          { text: 'Düzenle', value: 'actions' }
        ],
      }
    },
    methods:{
      ...mapActions(
        {
           getQuestionAsycn:"question/getQuestionAsycn",
           addQuestionAsync:"question/addQuestionAsync",
           deleteQuestrionAsync:"question/deleteQuestrionAsync",
           updateQuestionAsync:"question/updateQuestionAsync",
        },
      ),        
      async getQuestions(){
        this.loginTable=true;
        let result={
          search:"all",
          page:this.page,
          testID:this.question.testID,
        };
        if(this.search!=""){
          result.search=this.search;
        }
        var retVal= await this.getQuestionAsycn(result);
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
        if(this.question.id==0){
          retVal = await this.addQuestionAsync(this.question);
          this.getQuestions();    
          this.dialog=false;
        }else{
          retVal = await this.updateQuestionAsync(this.question);
          this.getQuestions();
          this.dialog=false;
        }
        if(retVal.data!=-1){
          this.populateForm();
        }
        this.loadingSaveButton=false;
      },

      deleteItem(val){
        this.deleteQuestion=true;
        this.populateForm(val);
      },

      async deleteItemAsync(){
        this.loginTable=true;
        await this.deleteQuestrionAsync(this.question);
        this.loginTable=false;
      },

      populateForm(bumo=""){
        if(bumo==""){
          this.question={
            id:0,
            testID:this.$route.params.id,
            questionDesc:"",
            ansverA:"",
            ansverB:"",
            ansverC:"",
            ansverD:"",
            answerDesc:"",
            correctAnswer:0,
          };
        }else{
          this.question={
            id:bumo.id,
            questionDesc:bumo.questionDesc,
            testID:this.$route.params.id,
            ansverA:bumo.ansverA,
            ansverB:bumo.ansverB,
            ansverC:bumo.ansverC,
            ansverD:bumo.ansverD,
            answerDesc:bumo.answerDesc,
            correctAnswer:bumo.correctAnswer,
          };
        }
        
      }
    },

    computed:{
      ...mapGetters({
          Questions:"question/getQuestions",
          getCorrectAnsweres:"getCorrectAnsweres",
        }),
    },

    created(){
      if(this.$route.params.id){
        this.question.testID=this.$route.params.id;
      }
      
      this.getQuestions();
    },

    watch:{
      page(val){
        this.getQuestions();
      },
      search(val){
        this.getQuestions();
      }
    },

  }
</script>

<style>

</style>