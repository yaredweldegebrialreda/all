<template>
  <nav>
    <v-snackbar v-model="snackbar" bottom="true" left="true" :timeout="4000" color="success">
      <v-span class="mx-2 white--text">
        <v-progress-linear
						indeterminate
						color="white"
						class="mb-0"
					></v-progress-linear>   
      Project Added Successfully !!!</v-span>

      <v-btn @click="snackbar=false" class="ml-16" text>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-app-bar app class="primary" fixed>
      <v-toolbar color="primary" app>
        <v-app-bar-nav-icon v-if="isLoggedIn" class="white--text" @click.native.stop="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase white--text">
          <span class="font-weight-white">Todo</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon v-if="isLoggedIn">
          <v-icon class="text--text">mdi-magnify</v-icon>
        </v-btn>

        <!-- Dropm down Menu here-->

        <v-menu offset-y v-if="isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="grey" v-bind="attrs" v-on="on">
              <v-icon left color="grey">mdi-chevron-down</v-icon>
              <v-span>Menu</v-span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
              <v-list-item-title>{{link.text}}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <h3 v-if="isLoggedIn" text class="grey--text">{{currentUser}}</h3>

        <v-btn text v-if="!isLoggedIn" class="white--text" router :to="{name:'Login'}">
           <v-icon  left>mdi-account</v-icon>
          <span>Signin</span>
        </v-btn>
        <v-btn text v-if="!isLoggedIn" class="white--text" router :to="{name:'Register'}">
           <v-icon  left>mdi-face</v-icon>
          <span>Register</span>
        </v-btn>

        <v-btn text v-if="isLoggedIn" class="white--text" @click="handleSignout">
          <span>signout</span>
        </v-btn>
      </v-toolbar>
    </v-app-bar>
    <v-navigation-drawer app absolute temporary class="grey darken-2" v-model="drawer">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/yared.png" alt />
          </v-avatar>
          <v-row justify="center">
            <v-col align-self="center" cols="auto" class="mb-1">
              <p class="white--text subheading">{{currentUser}}</p>
            </v-col>
          </v-row>
        </v-flex>

        <v-flex class="mb-3">
          <Popup @projectAdded="snackbar = true" />
        </v-flex>
      </v-layout>

      <v-list>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="teal accent-4">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "../components/Popup";
import firebase from "firebase";
import {mapActions} from 'vuex'
export default {
  components: {
    Popup
  },
  props: {},
  data() {
    return {
      isLoggedIn: false,
      currentUser: false,
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "My Projects", route: "/projects" },
        { icon: "mdi-account", text: "Team", route: "/team" }
      ],
      snackbar: false
    };
  },
  methods:{
 ...mapActions(['handleSignout'])
  },
 watch: {
      user (value) {
        // console.log("check vaue on watch:",value);
        if (value === "" || value === undefined) {
          this.$router.go({path:this.$router.path})
        }
      }
    },
    computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  }
};
</script>

<style>
</style>