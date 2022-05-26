<template>
<div> 
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"      
      :temporary="temporary"        
      app
    >
    <v-toolbar
     color="grey darken-3"
      dense      
      dark>
        <v-toolbar-title>
            <!--<img
                src="@/assets/static/alar_logo.png"
                alt="logo"
            >-->
            Mobil App Panel
        </v-toolbar-title>
    </v-toolbar>
        <v-list-item class="px-2">
            <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-title>{{sesion}}</v-list-item-title>

            <v-btn
                icon
                @click.stop="mini = !mini"
                >
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item to="/main">
                <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Ana Sayfa</v-list-item-title>                     
            </v-list-item>
            <v-list-item to="/main/app-panel">
                <v-list-item-icon>
                    <v-icon>mdi-robot-happy-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Panel Apps</v-list-item-title>                     
            </v-list-item>
            <v-list-group
                :value="false"
                prepend-icon="mdi-crosshairs-question"            >
                <template v-slot:activator>
                    <v-list-item-title>Quizer App</v-list-item-title>
                </template>
                <v-list-item to="/main/levels">
                    <v-list-item-icon>
                        <v-icon>mdi-spirit-level</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Seviye</v-list-item-title>                     
                </v-list-item>
                <v-list-item to="/main/topics">
                <v-list-item-icon>
                    <v-icon>mdi-archive-edit-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Konu</v-list-item-title>                     
                </v-list-item>
                <v-list-item to="/main/tests">
                <v-list-item-icon>
                    <v-icon>mdi-ab-testing</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Test</v-list-item-title>                     
                </v-list-item>                
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
 </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    props: {        
        toggle: {
            type: Boolean,
            required: false,
            default: true
        }
    },   
    data () {
      return {
        drawer: true,
        temporary:false,        
        mini: false,
        
      }
    },
    computed:{
        ...mapGetters({
            sesion:'auth/getUserNameaAndSurname',
        }),
       
        
    },
    watch:{
        toggle(newVal){
            this.drawer=newVal;            
            this.temporary=!newVal;
        },
    }
}
</script>

<style>
</style>