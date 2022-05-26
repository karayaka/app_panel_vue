import api from '../../../api/index'

export default {
    namespaced:true,
    state:{
     questions:[],
     testSelectList:[]
    },
    getters:{
        getQuestions(state){
            return state.questions;
        },
        getTestSelect(state){
            return state.testSelectList;
        },      
    },
    mutations:{
        setQuestions(state,payload){
            state.questions=payload;
        },
        setTestSelects(state,payload){
            state.testSelectList=payload
        },
        removeQuestionToQuestions(state,payload){
            state.questions.splice(state.questions.findIndex(v => v.id ==payload), 1);
        }
    },
    actions:{
        /*async getTestSelectAsycn(vueContext){
            if(vueContext.state.testSelectList.length!=0)
                return
            let result= await api.get("/Quizer/GetLevelSelectList");
            vueContext.commit("setTestSelects",result.data);
            return result;
        },*/
        async getQuestionAsycn(vueContext,payload){

            let result= await api.get("/Quizer/GetQuestions/"+payload.search+"/"+payload.page+"/"+payload.testID);
            vueContext.commit("setQuestions",result.data);
            return result;
        },
        async addQuestionAsync(vueContext,payload){
            let result= await api.post("/Quizer/CreateQuestion",payload);
            return result;
        },
        async deleteQuestrionAsync(vueContext,payload){
            let result= await api.get("/Quizer/DeleteQuestion/"+payload.id);
            if(result.data!=-1){
                vueContext.commit("removeQuestionToQuestions",payload.id);
            }
            return result;
        },
        async updateQuestionAsync(vueContext,payload){
            console.log(payload);
            let result= await api.post("/Quizer/UpdateQuestion",payload);
            return result;
        },
      
    },
}
//topic store ve sayfa desing halledilevek api tarafındaki değişiklikler uygulavak!