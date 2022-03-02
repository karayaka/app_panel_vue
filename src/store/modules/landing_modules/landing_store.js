import api from '../../../api/index'


export default {
    namespaced:true,
    state:{
        mobilApps:[],
    },
    getters:{
        getMobilApps(state){
            return state.mobilApps;
        },        
    },
    mutations:{
        setMobilApps(state,payload){
            state.mobilApps=payload;
        },
    },
    actions:{
        
      
    },
}