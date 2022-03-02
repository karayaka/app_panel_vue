<template>
  <div>
    <v-app-bar
      color="grey darken-3"
      dense
      app
      dark
    >
    <v-app-bar-nav-icon @click="toggleNavigationBar" ></v-app-bar-nav-icon>

    <v-toolbar-title class="headline text-uppercase">
              
        <span class="font-weight-light">Mobil App Panel</span>
    </v-toolbar-title>

    <v-spacer></v-spacer> 
    <div class="mr-5">
        <v-menu        
        left
        bottom
        >
        <v-toolbar dense color="cyan">

        </v-toolbar>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                >
                <v-icon>mdi-alarm-light</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(item,i) in notifications" :key="i" three-line
                 @click="clickNotification(item.id)" >
                    <v-list-item-content>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                        <v-list-item-subtitle>{{item.context}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                
            </v-list>
        </v-menu>
    </div>
    <div class="mr-5">       
        <v-btn icon @click="logOut()" >
        <v-icon>mdi-logout-variant</v-icon>
        <span left>Çıkış</span>
        </v-btn>
    
    </div>
    
    </v-app-bar>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    data(){
        return{
            notifications:[
                {id:1, title:"Bildirim1",context:"içerik1"},
                {id:2,title:"Bildirim2",context:"içerik2"},
                {id:3,title:"Bildirim3",context:"içerik3"},
                {id:4,title:"Bildirim4",context:"içerik4"}
            ]
        }
    },
    methods:{
        ...mapMutations({
            logOut:'auth/logOut'
        }),
        toggleNavigationBar(){
            this.$emit('toggleNavigationBar');
        },
        clickNotification(id){
            alert("Biditim ID:"+id);
        }
    }
}
</script>

<style>
</style>