<template>
  <v-carousel
    cycle
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
       
      v-for="(slide, i) in slides"
      :key="i"
    >
    <v-img :src="slide" contain max-height="500"></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
    props: ["slides"],
}
</script>

<style>

</style>