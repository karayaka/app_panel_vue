export default{
    namespaced:true,
    state:{
        blockUI:false,
        showResult:false,
        result:"",
        messageColor:"red darken-3",
    },    
    mutations:{
        setBlockUI(state,payload){
            state.blockUI=payload;
        },
        showMessages(state,text){ 
            state.result=text;           
            state.showResult=true;
        },
        setShowResult(vuexContext,model){
            this.showResult=model;
        },
        setMessageColor(state,color){
            state.messageColor=color;
        }
    },
    actions:{       
        apiMessages(vuexContext,payload){
            switch (payload.type) {
                case 0:
                    vuexContext.commit("setMessageColor","red darken-3");
                    break;
                case 1:
                    vuexContext.commit("setMessageColor","amber darken-4");
                    break;
                case 2:
                    vuexContext.commit("setMessageColor","green darken-3");
                    break;
                default:
                    vuexContext.commit("setMessageColor","grey darken-4");
                    break;
            }
            vuexContext.commit("showMessages",payload.message);
        }
    },
    getters:{
        getResult(state){
            return state.result;
        },
        getBlockUI(state){
            return state.blockUI;
        }
    },
    
}