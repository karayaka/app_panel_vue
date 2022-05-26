<template>
  <p>{{getToken()}}</p>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    getToken(){
      return localStorage.getItem("user-token");
    }
  }

}
</script>

<style>

</style>