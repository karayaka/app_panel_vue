import api from '../../../api/index'

export default {
    namespaced:true,
    state:{
     tests:[],
     topicsSelectList:[]
    },
    getters:{
        getTests(state){
            return state.tests;
        },
        getTopicSelect(state){
            return state.topicsSelectList;
        },
      
    },
    mutations:{
        setTests(state,payload){
            state.tests=payload;
        },
        setTopicSelects(state,payload){
            state.topicsSelectList=payload
        },
        removeTestToTests(state,payload){
            state.tests.splice(state.tests.findIndex(v => v.id ==payload), 1);
        }
    },
    actions:{
        async getTopicSelectAsycn(vueContext){
            if(vueContext.state.topicsSelectList.length!=0)
                return
            let result= await api.get("/Quizer/GetTopicSelectList");
            vueContext.commit("setTopicSelects",result.data);
            return result;
        },
        async getTestAsycn(vueContext,payload){

            let result= await api.get("/Quizer/GetTest/"+payload.search+"/"+payload.page+"/"+payload.topicID);
            vueContext.commit("setTests",result.data);
            return result;
        },
        async addTestAsync(vueContext,payload){
            let result= await api.post("/Quizer/CreateTest",payload);
            return result;
        },
        async changeTestStatusAsync(vueContext,payload){
            let result= await api.post("/Quizer/ChangeTestStatus",payload);
            return result;
        },
        async deleteTestAsync(vueContext,payload){
            console.log(payload);
            let result= await api.get("/Quizer/DeleteTest/"+payload.id);
            if(result.data!=-1){
                vueContext.commit("removeTestToTests",payload.id);
            }
            return result;
        },
        async updateTestAsync(vueContext,payload){
            let result= await api.post("/Quizer/UpdateTest",payload);
            return result;
        },
      
    },
}