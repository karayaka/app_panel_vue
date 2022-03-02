import api from '../../../api/index'


export default {
    namespaced:true,
    state:{
        levelList:[],
    },
    getters:{
        getLevels(state){
            return state.levelList;
        },
        //EğerPayload id değeri varsa onu döner yoksa seçili level değerini döner!
        getLevel(state,payload){
            if(payload){
                return state.levelList.find(t=>t.id==payload);
            }else{
                return state.levelList;
            }
        }
    },
    mutations:{
        setLevels(state,payload){
            state.levelList=payload;
        },
        removeLevelToLevels(state,payload){
            state.levelList.splice(state.levelList.findIndex(v => v.id ==payload), 1);
        },
        addLevelToLevels(state,payload){
            state.levelList.push(payload);
        },
        //setLevel(state,payload){
        //    state.levelList=payload;
        //},
        ///obje olarak index ve data gönderilmeli {i:listeIndexsi,data:oject->level}
        setLevelsInlevel(state,payload){
            state.levelList[payload.i]=payload.data;
        },
      
    },
    actions:{
        async getLevelAsycn(vueContext,payload){
            let result= await api.get("/Quizer/GetLevel/"+payload.search+"/"+payload.page);
            vueContext.commit("setLevels",result.data);
            return result;
        },
        async addLevelAsync(vueContext,payload){
            let result= await api.post("/Quizer/CreateLevel",payload);
            let dt={levelDesc:payload.levelDesc ,levelName:payload.levelName,topicCount:0,id:result.data.id};
            vueContext.commit("addLevelToLevels",dt);
            return result;
        },
        async deleteLevelAsync(vueContext,payload){
            console.log(payload);
            let result= await api.get("/Quizer/DeleteLevel/"+payload.id);
            if(result.data!=-1){
                vueContext.commit("removeLevelToLevels",payload.id);
            }
            return result;
        },
        async updateLevelAsync(vueContext,payload){
            let result= await api.post("/Quizer/UpdateLevel",payload);
            return result;
        },
      
    },
}