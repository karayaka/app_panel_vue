import api from '../../../api/index'

export default {
    namespaced:true,
    state:{
     topics:[],
     levelSelectList:[]
    },
    getters:{
        getTopics(state){
            return state.topics;
        },
        getLevelSelect(state){
            return state.levelSelectList;
        },
      
    },
    mutations:{
        setTopics(state,payload){
            state.topics=payload;
        },
        setLevelSelects(state,payload){
            state.levelSelectList=payload
        },
        removeTopicToTopics(state,payload){
            state.topics.splice(state.topics.findIndex(v => v.id ==payload), 1);
        }
    },
    actions:{
        async getLevelSelectAsycn(vueContext){
            if(vueContext.state.levelSelectList.length!=0)
                return
            let result= await api.get("/Quizer/GetLevelSelectList");
            vueContext.commit("setLevelSelects",result.data);
            return result;
        },
        async getTopicAsycn(vueContext,payload){

            let result= await api.get("/Quizer/GetTopic/"+payload.search+"/"+payload.page+"/"+payload.levelID);
            vueContext.commit("setTopics",result.data);
            return result;
        },
        async addTopicAsync(vueContext,payload){
            let result= await api.post("/Quizer/CreateTopic",payload);
            return result;
        },
        async deleteTopicAsync(vueContext,payload){
            console.log(payload);
            let result= await api.get("/Quizer/DeleteTopic/"+payload.id);
            if(result.data!=-1){
                vueContext.commit("removeTopicToTopics",payload.id);
            }
            return result;
        },
        async updateTopicAsync(vueContext,payload){
            let result= await api.post("/Quizer/UpdateTopic",payload);
            return result;
        },
      
    },
}
//topic store ve sayfa desing halledilevek api tarafındaki değişiklikler uygulavak!