<template>
<div>
    <custom-toolbar @toggleNavigationBar="drawer=!drawer"/>
    <custom-navigation-drawer :toggle="drawer"/>
    <block-ui/>
    <v-main>
        <div >
            <div class="pa-5">
                <router-view/>
            </div>
        </div>
        
    </v-main>  
</div>
    
</template>

<script>
import blockUi from '../../components/core/Block_UI.vue'
import CustomNavigationDrawer from '../../components/core/CustomNavigationDrawer.vue'
import CustomToolbar from '../../components/core/CustomToolbar.vue'
export default {
    components: { CustomToolbar, CustomNavigationDrawer, blockUi },
    data(){
        return {
            drawer:true,
        }
    },
    
}
</script>

