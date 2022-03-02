import store from '../store';
import router from '../router';
export default {
    prepareApiErrorMesaj(ex){
        if(!ex.response){
            store.commit("globalToast/showMessages","internet Erisim Problemi");
            return false;
        }
        if(ex.response.status==401){            
            store.commit("globalToast/showMessages","Oturumunuz Sonlandırılımıştır");
            router.push('/login');
            return false;
        }else{
            store.commit("globalToast/showMessages","Veri Erişimi Sırasında Bir Hata Oluştu");
            return false;
        }
       
    },
    prepareApiResponse(res){
        //mesaj dolu ise gösteriliyor 
        if(res.data.message){
            var response={
                type:res.data.type,
                message:res.data.message,
            };
            store.dispatch("globalToast/apiMessages",response)
            //apiden cevap döndüğü anda hata mesajları basılacak!! ve analiz edilecek           
        }
    }
}