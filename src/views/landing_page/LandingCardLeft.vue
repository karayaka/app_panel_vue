<template>
  <v-card :style="{background: card.colors}" width="100%">
      <v-row class="pa-5">
          <v-col md="6">
            <h2 class="intro-text">{{card.appName}}</h2>
            <p class="descrition">{{card.appDesc}}</p>
                       
        </v-col>
        <v-col md="6">
            <base-carousel :slides="card.appImages" />
        </v-col>
      </v-row>
      <v-card-actions>
            <v-btn color="success" :href="card.url" target="_blank" rounded>
                <v-icon>mdi-android</v-icon> İndir
            </v-btn>
            <v-btn color="gray" :href="card.gitHubUrl" target="_blank" rounded>
                <v-icon>mdi-github</v-icon> Kaynak Kodu
            </v-btn> 
            <v-spacer></v-spacer>

            <v-btn
                icon
                @click="show = !show"
            >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
        <div v-show="show">
            <v-divider></v-divider>
            <v-card-subtitle>
                {{card.appName}}
            </v-card-subtitle>
            <v-card-text>
                {{card.appSubDesc}}
            </v-card-text>
        </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import BaseCarousel from '../../components/carousels/BaseCarousel.vue'
export default {
    components:{BaseCarousel},
    props:["card"],
        data(){
            return{
                show:false,//test amaçlı yazıldı
                
            }
        },
}
</script>

<style lang="scss" scoped>
h2.intro-text {
    font-size: 60px;
    font-weight: bold;
    color:rgb(68, 68, 68);
}
p.description{
    font-size: 19;
    margin:32 0px;
    color:#444;

}
.card-actions {
  position: absolute;
  bottom: 30px;
  left: 45px;
}
</style>

