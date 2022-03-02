import api from '../../api/index'
import router from '../../router';

export default {
    namespaced:true,
    state:{
        user:null,//bakılcak
    },
    getters:{
        getUser(state){
            if(!state.user){
                var usr=localStorage.getItem("login-user");
                if(usr){
                    state.user=JSON.parse(localStorage.getItem("login-user"))
                }
            }
            return state.user
        },
        getUserNameaAndSurname(state){
            if(!state.user){
                var usr=localStorage.getItem("login-user");
                if(usr){
                    state.user=JSON.parse(localStorage.getItem("login-user"))
                }
            }
            return state.user.name+' '+state.user.surName
        },
        getUserToken(state){
            if(!state.user){
                var usr=localStorage.getItem("login-user");
                if(usr){
                    state.user=JSON.parse(localStorage.getItem("login-user"))
                }
            }
            return 'Bearer '+state.user.token

        }
    },
    mutations:{
        setUser(state,value){
            state.user=value;
        },
        logOut(state){
            localStorage.removeItem('login-user');
            localStorage.removeItem('user-token');
            router.push('/login');
            state.user=null;
        }   
    },
    actions:{
        async login(vuexContext,payload){
            if(payload.UserName==''||payload.Password==''){
                vuexContext.commit("globalToast/showMessages","Kullanıcı Adı Ve Şifre Zorunlu Alan",{root:true});
                return false;
            }
            var retVal= await api.post("/Security/login",payload);
            if(retVal!=-1){
                vuexContext.commit("setUser",retVal.data)
                localStorage.setItem("login-user",JSON.stringify(retVal.data))
                console.log(retVal);
                localStorage.setItem("user-token",retVal.data.token)
                router.push('/main');
            }
            return true;
        }

    },
}