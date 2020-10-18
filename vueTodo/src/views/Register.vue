<template>
  <div>
    <v-app id="inspire">
      <v-main>
        <v-container>
          <v-row align="center" justify="center">
            <v-col xs="12" sm="8" md="6">
              <v-card class=" mt-9">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Register Form</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn :href="source" icon large target="_blank" v-on="on">
                        <v-icon>mdi-account-multiple-plus</v-icon>
                      </v-btn>
                    </template>
                    <span>Register</span>
                  </v-tooltip>
                </v-toolbar>
                <v-form v-on:submit="handleRegisterUser" ref="register">
                  <v-card-text>
                    <v-text-field
                      label="Username"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="formData.username"
                      required
                      :rules="[v => !!v || 'Username is required']"
                    ></v-text-field>

                    <v-text-field
                      label="Email"
                      name="email"
                      prepend-icon="mdi-email"
                      type="text"
                      v-model="formData.email"
                      required
                      :rules="[v => !!v || 'Email is required']"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="formData.password"
                      required
                      :rules="[v => !!v && v.length>=6 || 'Password must be > 6  characters.']"
                    ></v-text-field>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" type="submit" :loading="loading">Register</v-btn>
                    </v-card-actions>
                    <p class="red--text ml-16">{{error}}</p>
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
import { mapActions } from "vuex";
export default {
  name: "Register",

  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["registerUser"]),
    handleRegisterUser(event) {
      event.preventDefault();
      if (this.$refs.register.validate()) {
        this.registerUser(this.formData);
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