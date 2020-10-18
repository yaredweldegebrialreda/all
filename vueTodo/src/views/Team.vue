<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card class="text-center ma-3">
            <v-responsive class="pt-4">
             <v-avatar size="100" class="grey lighten-4">
             <img :src="person.avatar" alt="">
             </v-avatar>
            </v-responsive>
            <v-card-text>
             <div class="subheading">{{person.name}}</div>
             <div class="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
               <v-btn text color="secondary">
                <v-icon small left >mdi-message</v-icon>
                <span>Message</span>
               </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name:"Team",
  data() {
    return {
      team: [
        { name: "Yareda", role: "Web developer",avatar:'/yared.png' },
        { name: "Hilli", role: "Graphic designer & IT Support",avatar:'/hilli.png' },
        { name: "Yared", role: "Sales Person",avatar:'/yared.png' },
        { name: "All", role: "Social media maverick",avatar:'/joint.png' },
        { name: "Zelea", role: "Engineer",avatar:'/zele.png' }
      ]
    };
  }
};
</script>

<style>
</style>