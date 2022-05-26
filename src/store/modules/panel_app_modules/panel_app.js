import api from '../../../api/index'


export default {
    namespaced:true,
    state:{
        appPanelList:[],//DişardakiListe
        panelApps:[],//içerdeki List
    },
    getters:{
        getPanelAppList(state){
            return state.appPanelList;
        },
        getPanelAppDetails(state){
            return state.panelApps;
        },
        //EğerPayload id değeri varsa onu döner yoksa seçili level değerini döner!
        getListApp(state,payload){
            if(payload){
                return state.appPanelList.find(t=>t.id==payload);
            }else{
                return state.appPanelList;
            }
        },
        getPanelApp(state,payload){
            if(payload){
                return state.panelApps.find(t=>t.id==payload);
            }else{
                return state.panelApps;
            }
        }
    },
    mutations:{
        setAppPanelList(state,payload){
            console.log(payload);
            state.appPanelList=payload;
        },
        setPanelAppDetails(state,payload){
            state.panelApps=payload;
        },
        removeAppToPanelApps(state,payload){
            state.panelApps.splice(state.panelApps.findIndex(v => v.id ==payload), 1);
        },
        addPanelAppsToApp(state,payload){
            state.panelApps.push(payload);
        },     
    },
    actions:{
        async getPanelAppList(vueContext,payload){
            let result= await api.get("/Apps/GetMainListApps");
            vueContext.commit("setAppPanelList",result.data);
            return result;
        },
        async getPanelApps(vueContext,payload){
            let result= await api.get("/Apps/GetApps");
            console.log(result.data);
            vueContext.commit("setPanelAppDetails",result.data);
            return result;
        },
        async deletePanelAppAsync(vueContext,payload){
            let result= await api.delete("/Apps/DeleteApp/"+payload);
            if(result.data!=-1){
                vueContext.commit("removeAppToPanelApps",payload);
            }
            return result;
        },
        async createPanelAppsAsync(vueContext,payload){
            let result= await api.post("/Apps/CreateApp",payload);
            return result;
        },
        async updatePanelAppAsync(vueContext,payload){
            let result= await api.put("/Apps/GetApps",payload);
            return result;
        },
    },
}