<template>
  <v-card
    class="my-auto"
  >
    <base-carousel :slides="model.filesUrls" />

    <v-card-title>
      {{model.appName}}
    </v-card-title>
    <v-card-subtitle>
      {{model.appDesc}}
    </v-card-subtitle>
    <div class="text-center">
      <v-chip v-for="(item,i) in model.appCardColors" :key="i" 
      :color="item"
      class="ma-1"
      >
        Card Renk
      </v-chip>
    </div>

    <v-card-actions>
      <slot name="cardAction"/>
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

        <v-card-text>
            {{model.appSubDesc}}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import BaseCarousel from '../carousels/BaseCarousel.vue'
export default {
  components: { BaseCarousel },
    props: ["model"],
    data: () => ({
      show: false,
    }),

}
</script>

<style>

</style>