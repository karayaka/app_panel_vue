<template>
<v-layout wrap>
        <v-btn
        class="mt-8"     
        @click="formDialog=true"
        color="grey darken-3"
        dark
        absolute
        top
        right
        fab
        >
        <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-flex md6 class="pa-1" v-for="app in panelApps" :key="app.id">
            <app-card :model="app" >
                <template v-slot:cardAction>
                    <v-btn text class="red--text" @click="deleteQuestion(app.id)">
                        Sil
                    </v-btn>
                </template>
            </app-card>
        </v-flex>
        <!-- kayıt formu -->
    <full-screan-form-dialog
        title="Uygulama Ekle"
        v-model="formDialog"
        :loading="loading"
    >
        <template v-slot:form>
            <v-form v-model="formValid">,
                <v-container>
                    <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="app.appName"
                            :rules="nameRules"
                            label="Uygulama Adı"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="app.appUrl"
                            :rules="nameRules"
                            label="Uygulama Url"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                            v-model="app.gitHubUrl"
                            :rules="nameRules"
                            label="GitHub Url"
                            required
                        ></v-text-field>                        
                    </v-col>             
                </v-row>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="app.appDesc"
                            :rules="nameRules"
                            label="Uygulama Özet"
                            required
                        ></v-text-field>                        
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-file-input accept="image/*" 
                        label="Uygulama Resimleri"
                        multiple chips 
                        v-model="app.files"
                       ></v-file-input>
                    </v-col>
                    
                </v-row>
                <v-row>
                    <v-col cols="12" md="12">
                        <v-textarea
                        v-model="app.appSubDesc"
                        label="Uygulama Açıklama"
                        required
                        >                            
                        </v-textarea>
                    </v-col>
                </v-row>                
                <v-row>
                    <v-col cols="12" md="3">
                        <v-color-picker v-model="color"></v-color-picker>
                        <v-btn @click="addColor()" color="primary">Renk Ekle</v-btn>

                    </v-col>
                   <v-chip v-for="(item,i) in app.AppCardColors" :key="i" fl
                        class="ma-2 d-flex"
                        :color="item"
                        text-color="white"
                        >
                        Renk
                    </v-chip>
                </v-row>
                </v-container>                           
            </v-form>
            
        </template>
        <template v-slot:confirmButton>
            <v-btn
                icon
                dark
                :loading="loading"
                @click="createApp()"
            >
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
        
    </full-screan-form-dialog>
    <!--
        silme onayı grafiği
    -->
    <question-dialog
    v-model="question" 
    @onConfirme="deleteItemAsync()"
   >
  </question-dialog>


</v-layout>
</template>

<script>
import {mapActions , mapGetters,mapMutations} from 'vuex'
import AppCard from '../../components/app_coponents/AppCard.vue'
import FullScreanFormDialog from '../../components/dialogs/FullScreanFormDialog.vue'
import QuestionDialog from '../../components/dialogs/QuestionDialog.vue'
export default {
  components: { FullScreanFormDialog, AppCard,QuestionDialog },
    data(){
        return{
            formDialog:false,
            question:false,
            itemId:0,
            color:"",
            app:{
                appName:"",
                appDesc:"",
                appUrl:"",
                appSubDesc:"",
                gitHubUrl:"",
                files:[],
                AppCardColors:[],
            },
            nameRules: [
                v => !!v || 'Gerekli Alan',
            ],
            formValid:false,
            loading:false,
        }
    },
    methods:{
        ///api boglanascak
        ...mapActions(
            {
                getPanelApps:"panel_app/getPanelApps",
                createPanelAppsAsync:"panel_app/createPanelAppsAsync",
                deletePanelAppAsync:"panel_app/deletePanelAppAsync",
                updatePanelAppAsync:"panel_app/updatePanelAppAsync",//update kısma atlanacak
            },
        ),
        ...mapMutations({
            setBlockUI:"globalToast/setBlockUI",
        }),
        async getApps(){
            this.setBlockUI(true);
            await this.getPanelApps()
            this.setBlockUI(false);
        },
        async createApp()  {
            this.loading=true;
            var result= await this.createPanelAppsAsync(this.app);
            this.loading=false;
            this.formDialog=false;
            this.getApps();
        },
        deleteQuestion(id){
            this.question=true;
            this.itemId=id;
        },
        async deleteItemAsync(){
           this.setBlockUI(true);
            console.log(this.itemId);
            await this.deletePanelAppAsync(this.itemId);
            this.setBlockUI(false);

        },
        addColor(){
            this.app.AppCardColors.push(this.color);
        }

    },
    
    mounted(){
        this.getApps();
    },
    computed:{
        ...mapGetters({
            panelApps:"panel_app/getPanelAppDetails"
        }),           
        
    }

}
</script>

<style>

</style>