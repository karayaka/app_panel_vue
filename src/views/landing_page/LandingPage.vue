<template>
    <div>
        <landing-header/>
        <v-container class="pt-6" >
        <v-row width="100%" v-for="(card,index) in cards" :key="card.id">
            <landing-card-left v-if="(index%=2)==0" :card="card" class="ma-1" cols="12" />
            <landing-card-right v-else :card="card" class="ma-1" cols="12" />
        </v-row>
        </v-container>        
    </div>
</template>

<script>
import LandingCardLeft from './LandingCardLeft.vue'
import LandingCardRight from './LandingCardRight.vue'
import LandingHeader from './LandingHeader.vue'
import {mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    components: {LandingCardLeft, LandingHeader, LandingCardRight},
    data: () => ({
      show: false,
    
    }),
    methods:{
      ...mapActions({
        getPanelAppList: "panel_app/getPanelAppList"
      }),
      ...mapMutations({
            setBlockUI:"globalToast/setBlockUI",
        }),
      async getApps(){
        this.setBlockUI(true),
        await this.getPanelAppList();
        this.setBlockUI(false);
      }

    },
    computed:{
      ...mapGetters({
        cards: "panel_app/getPanelAppList"
      }),
    },
    mounted(){
      this.getApps()
    }
      



  }
</script>

<style scoped>

</style>
