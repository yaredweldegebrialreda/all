<template>
  <div class="text-center">
    <v-snackbar v-model="snackbar" top="true" left="true" :timeout="5000" color="success">
      <v-span class="mx-2 white--text">
      
      {{error}}</v-span>
      <v-btn @click="snackbar=false" class="ml-16" text>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-dialog persistent no-click-animation v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Update Project</v-card-title>

        <v-card-text>
          <v-form class="px-5" ref="edit" v-on:submit.prevent="updateProject">
            <v-text-field
              label="Title"
              v-model="project.title"
              prepend-icon="mdi-folder"
              :rules="inputRules"
            ></v-text-field>
            <v-text-field
              label="Person"
              v-model="project.person"
              prepend-icon="mdi-account"
              :rules="inputRules"
            ></v-text-field>
            <v-textarea
              label="Information | Content"
              v-model="project.content"
              prepend-icon="mdi-pencil"
              :rules="inputRules"
            ></v-textarea>
            <v-menu max-width="290">
              <template v-slot:activator="{on}">
                <v-text-field label="Due Date" v-model="due" prepend-icon="mdi-calendar-range" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="due"></v-date-picker>
            </v-menu>

            <v-select
              :items="statuses"
              label="Status"
              v-model="project.status"
              fullwidth
              prepend-icon="mdi-scale"
            ></v-select>

            <v-btn type="submit" class="success mx-0 mt-3 mb-2" :loading="loading">Update</v-btn>
            <v-btn @click="cancelUpdate" class="error mx-3 mt-3 mb-2">Cancel</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import db from "@/fb";
export default {
  props: {
    params: Object,
    id: String
  },
  name: "EditProject",

  data() {
    return {
      project: {},
      due: moment(new Date()).format("DD/MM/YYYY"),
      statuses: ["complete", "ongoing", "notstarted", "overdue"],
      inputRules: [
        v => (v && v.length >= 3) || "Minimum length is 3 characters"
      ],
      loading: false,
      dialog: false,
      snackbar: false,
      err:""
    };
  },
  methods: {
    updateProject(event) {
      event.preventDefault();
      this.loading = true;
      this.project.due = this.due;
      if (this.$refs.edit.validate()) {
        db.collection("projects")
          .doc(this.$route.params.id)
          .update(this.project)
          .then(() => {
            console.log("project successfully updated!");
            this.loading = false;
            this.dialog = false;
            this.snackbar = true;
             this.$router.push("/");
          })
          .catch(error => {
            console.log(error);
             this.loading = false;
             this.error=error.message;
             this.$router.push("/");
          });
      }
      // setTimeout(() => {
      //   this.path();
      // }, 3000);
    },
    changeFormat() {
      return this.due;
    },

    cancelUpdate() {
      (this.dialog = false), this.$router.push("/");
    },

    path() {
      console.log("inside path::");
      this.$router.push("/");
      console.log("snackbar check enabled.", this.snackbar);
    }
  },
  // computed: {
  //   formattedDate() {
  //     let x=this.due ? moment(this.due).format("DD/MM/YYYY") : "";
  //     console.log(x);
  //     return x
  //   }
  // },
  

  created: function() {
    this.dialog = this.$route.params.dialog;
    let dbRef = db.collection("projects").doc(this.$route.params.id);
    dbRef
      .get()
      .then(doc => {
        this.project = doc.data();
        console.log("doc", doc.data());
        this.due = doc.data().due;
        console.log(
          "after project loaded to be ready to edit::",
          this.project,
          this.due
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>