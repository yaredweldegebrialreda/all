<template>
  <div >
    <v-app id="inspire">
      <v-main>
        <v-container >
          <v-row align="center" justify="center">
            <v-col xs="12" sm="8" md="6">
              <v-card class=" mt-9">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Login Form</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn :href="source" icon large target="_blank" v-on="on">
                        <v-icon>mdi-account-multiple-plus</v-icon>
                      </v-btn>
                    </template>
                    <span>Authenticate</span>
                  </v-tooltip>
                </v-toolbar>
                <v-form v-on:submit="handleLogin" ref="login">
                  <v-card-text>
                    <v-text-field
                      label="Email"
                      name="login"
                      prepend-icon="mdi-email"
                      type="text"
                      v-model="loginData.email"
                      required
                      :rules="[v => !!v || 'Email is required']"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="loginData.password"
                      required
                      :rules="[v => !!v && v.length>=6 || 'Password must be > 6  characters.']"
                    ></v-text-field>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" type="submit" :loading="loading">Login</v-btn>
                    </v-card-actions>
                    <p class="red--text ml-16" >{{error}}</p>
                  </v-card-text>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
// import firebase from "firebase";
import {mapActions} from "vuex"
export default {
  props: {
    source: String
  },
  name: "Login",
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(['signInUser']),
    handleLogin(event) {
      event.preventDefault();
      if (this.$refs.login.validate()) {
        this.signInUser(this.loginData);
         
      }
    }
  },
 watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          // this.$router.push('/chat/0');
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
  }
  
};
</script>