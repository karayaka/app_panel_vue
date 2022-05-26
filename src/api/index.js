import axios from 'axios';
import err from './errorHadler'
const init= axios.create({
    baseURL:"https://cagnaz.com/service/api",//BaseUrl 
    //baseURL:"https://localhost:44372/api"
})
axios.defaults.headers.post['Content-Type']="multipart/form-data";


init.interceptors.request.use(config => {
  config.headers.Authorization="Bearer "+localStorage.getItem("user-token");//local storage den tokan alınacak
    //request post ise form formdataya çeviriliyor  dosya işlemleri test edilecek  
      if(config.method==="post"){
        var form_data = new FormData();
        var configData=config.data
        for (var key in configData ) {
          var cnfData=configData[key];
          if(Array.isArray(cnfData)){
            for (let j = 0; j < cnfData.length; j++) {
              const elmnt = cnfData[j];
              form_data.append(key, elmnt);
            }
          }else{
            form_data.append(key, configData[key]);
          }
            
        }
        config.data=form_data;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
  });
  // Add a response interceptor
init.interceptors.response.use((response) => {
  console.error(response);
  err.prepareApiResponse(response);
    
    var result={
      pageCount:response.data.pageCount,
      pageSize:response.data.pageSize,
      data:response.data.data,
    }
    return result
 
  
}, (error) => {
  err.prepareApiErrorMesaj(error);
  console.log(error);
  return -1;
});
//interente bağlartı hataları 
//diğer resut api içinden gelecek
export default init;