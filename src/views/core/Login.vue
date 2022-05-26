<template>
<v-main>

        <v-container class="col-md-4 col-sm-6" align-center justify-center>
            <v-card>
            <v-toolbar
                color="grey darken-3"
                dense
                dark
            >
            <v-toolbar-title>GİRİŞ</v-toolbar-title>
         
            </v-toolbar>
            <v-card-text>
                <div class="layout column align-center">
                    <img src="@/assets/logo.png" alt="Vue Material Admin" width="150" height="150">
                    <h1 class="flex my-4 primary--text">Mobil App Panel</h1>
                </div>
                <v-form class="my-3">
                    <v-text-field            
                    name="login"
                    label="Email/Kullanıcı Adı"
                    append-outer-icon="mdi-clipboard-account"
                    type="text"
                    v-model="user.UserName"
                    :error="error"
                    :rules="[rules.required]"/>
                    <v-text-field
                    :type="hidePassword ? 'password' : 'text'"            
                    name="password"
                    label="Şifre"
                    id="password"
                    :rules="[rules.required]"
                    v-model="user.Password"
                    :error="error"
                    :append-icon="hidePassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append="hidePassword = !hidePassword"/>
                </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">              
                <v-btn color="primary" @click="login()" :loading="loading">GİRİŞ</v-btn>
            </v-card-actions>
            </v-card>  
        </v-container>

</v-main>
    
</template>

<script>
import {mapActions,} from 'vuex';
export default {    
    data(){
        return{
            user:{
                UserName:'',
                Password:'',        
            },
            loading:false,
            error: false,
            hidePassword: true,                  
            rules: {
                required: value => !!value || 'Zorunlu Alan.'
            }
        }
    },    
    methods:{
        ...mapActions({
            loginApi:'auth/login'
        }),
        async login(){
            this.loading=true;
            await this.loginApi(this.user);         

            this.loading=false;
        }
    },
    computed:{
       
    }
}
</script>

<style>
</style>