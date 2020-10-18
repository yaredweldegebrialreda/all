<template>
 <v-app >
 <v-content >
 <navbar></navbar>

 <router-view class=" mx-5 mb-4"></router-view>
 </v-content>
  </v-app>
</template>

<script>


import navbar from "./components/Navbar"
export default {
  name: 'App',

  components: {   
    // Login,
    navbar,
    // Register
  },

  data: () => ({

  }),
};
</script>
<style  scoped>

</style>