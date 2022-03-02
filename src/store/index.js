import Vue from 'vue'
import Vuex from 'vuex'
import GlobalToast from './modules/global_toast'
import auth from './modules/auth'
import levels from './modules/quizer_modules/levels'
import topic from './modules/quizer_modules/topic'
import test from './modules/quizer_modules/test'
import question from './modules/quizer_modules/question'
import panel_app from './modules/panel_app_modules/panel_app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adStatuses:[
      
      {value:0,text:"Reklam Yok"},
      {value:1,text:"Geçiş Reklamı"},
      {value:2,text:"Ödüllü Reklam"},
    ],
    correctAnsweres:[
      {value:0, text:"A Şıkkı"},
      {value:1, text:"B Şıkkı"},
      {value:2, text:"C Şıkkı"},
      {value:3, text:"D Şıkkı"},
    ]
  },
  getters:{
    getAdStatuses(state){
      return state.adStatuses;
    },
    getCorrectAnsweres(state){
      return state.correctAnsweres;
    }
  },
  mutations: {
    

  },
  actions: {
    
  },
  modules: {
    globalToast:GlobalToast,
    auth,
    levels,
    topic,
    test,
    question,
    panel_app,
  }
})
