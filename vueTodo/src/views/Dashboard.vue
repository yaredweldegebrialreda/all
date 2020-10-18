<template>
  <div class="home">
    <v-snackbar v-model="snackbar" bottom="true" left="true" :timeout="4000" color="error">
      <v-span class="mx-2 white--text">Project Deleted Successfully !!!</v-span>
      <v-btn @click="snackbar=false" class="ml-16" text>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>

    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3 px-5">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span right class="caption text-lowercase">by projects name</span>
            </v-btn>
          </template>
          <span>Sorts projects by name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('person')" v-on="on">
              <v-icon left small>mdi-account</v-icon>
              <v-span class="caption text-lowercase">sort by person</v-span>
            </v-btn>
          </template>
          <v-span class="caption text-lowercase">sort by person</v-span>
        </v-tooltip>
      </v-layout>
      <v-card flat class="px-2" color="grey" v-for="project in projects" :key="project.title">
        <!-- to be  checked the pa-6 and my-5 -->
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md4>
            <div class="caption">Title</div>
            <div>{{project.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption">Person</div>
            <div>{{project.person}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption">Due Date</div>
            <div>{{project.due}}</div>
          </v-flex>

          <v-flex xs2 sm4 md2>
            <div class="right">
              <div class="caption">Status</div>
              <v-chip
                v-if="chip1"
                small
                :color="`${project.status}`"
                :class="`v-chip--active white--text caption my-2`"
              >{{project.status}}</v-chip>
              <!-- <v-chip  small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip> -->
            </div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="caption">Actions</div>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  v-on="on"
                  router
                  :to="{name:'EditProject',params:{id:project.id,dialog:true} }"
                >
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <v-span class="caption text-lowercase">Edit Project</v-span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn text v-on="on" @click="deleteProject(project.id)">
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-span class="caption text-lowercase">Delete Project</v-span>
            </v-tooltip>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "../fb";
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      id: "",
      chip1: true,
      projects: [],
      snackbar: false
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) =>
        a[prop].toLowerCase() < b[prop].toLowerCase() ? -1 : 1
      );
    },
    deleteProject(id) {
      if (window.confirm("Do you really want to delete the project ?")) {
        db.collection("projects")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Document deleted!");
            this.projects = this.projects.filter(pro => pro.id !== id);
            this.snackbar = true;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  },

  created() {
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>

<style scoped>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.notstarted {
  border-left: 4px solid #8b1313;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}

.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.notstarted {
  background: #8b1313;
}
.v-chip.ongoing {
  background: orange;
}
.v-chip.overdue {
  background: tomato;
}
</style>
