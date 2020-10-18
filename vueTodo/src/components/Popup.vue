<template>
<div class="text-center">

<v-dialog v-model="dialog" max-width="500">
<template  v-slot:activator="{ on }">
   <v-btn flat slot="activator" class="success"  v-on="on" >Add New Project</v-btn>
</template> 

    <v-card>
    <v-card-title  class="headline grey lighten-2" primary-title>
      Add A New Project
    </v-card-title>
    
  <v-card-text>
  
   <v-form class="px-5"  ref="form" 
     v-on:submit.prevent="submitForm">
    <v-text-field label="Title" v-model="title" prepend-icon="mdi-folder" :rules="inputRules"></v-text-field>
    <v-text-field label="Person" v-model="person" prepend-icon="mdi-account" :rules="inputRules"></v-text-field>
    <v-textarea label="Information | Content" v-model="content" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>
     <v-menu max-width="290" offset-y>
        <template v-slot:activator="{on}">
            <v-text-field :rules="inputRules" :value="formattedDate" label="Due Date" prepend-icon="mdi-calendar-range" v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="due"></v-date-picker>
     </v-menu>
       

       <v-select
          :items="statuses"
          label="Status"
          v-model="status"
          fullwidth
           prepend-icon="mdi-scale"
        ></v-select>
     
    <v-btn type="submit" class="success mx-0 mt-3 mb-2" :loading="loading">Add</v-btn>
   </v-form>
   </v-card-text>
   </v-card>

  
</v-dialog>
</div>

</template>

<script>
import moment from "moment";
import db from "@/fb"
export default {
data() {
    return {
        statuses:["completed","ongoing","notstarted","overdue"],     
        due:null,
        title:"",
        content:"",
        person:"",
        status:"",
        inputRules:[ v => v&&v.length >= 3 || 'Minimum length is 3 characters'],
        loading:false,
        dialog:false
    }
},
methods: {
    submitForm(){
        if(this.$refs.form.validate()){
            this.loading=true;
            const project={
                title:this.title,
                content:this.content,
                due:moment(this.due).format("DD/MM/YYYY"),
                person:this.person,
                status:this.status
            }

            db.collection('projects').add(project).then(()=>{
                console.log("successfully added.");
                this.loading=false;
                this.dialog=false;
                this.$emit('projectAdded')
            })
        .catch((err)=>{
            console.log(err);
        })
            
        }
     
    }
},
computed: {
    formattedDate(){
        return this.due ? moment(this.due).format("DD/MM/YYYY") :"";
    }
},
}
</script>

<style>

</style>