<template>
  <div>
    <h2>Item Lists</h2>

   
    <div class="input-group md-form form-sm form-1 pl-0">
      <div class="input-group-prepend">
        <span class="input-group-text purple lighten-3" id="basic-text1">
         <b-icon icon="search"></b-icon>
        </span>
      </div>
      <input class="form-control my-0 py-1" type="text" placeholder="Search" aria-label="Search" v-model="search">
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>Item Name</td>
          <td>Item Price</td>
          <td>Actions</td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in filterd" :key="item._id">
          <td>{{item._id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.price}}</td>
          <td>
            <router-link :to="{name:'Edit',params:{id:item._id}}" class="btn btn-primary">Edit</router-link>
          </td>
          <td>
            <button class="btn btn-danger" v-on:click="deleteItem(item._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { BIcon } from 'bootstrap-vue'
import VueMaterial from 'vue-material'
import BootstrapVue from 'bootstrap-vue'
import 'vue-material/dist/vue-material.min.css'
Vue.use(BootstrapVue)
Vue.component('BIcon', BIcon)
Vue.use(VueMaterial)
export default {
  components: {
      BIcon,  
    },
  data() {
    return {
      items: [],
      search: ""
    };
  },
  created: function() {
    this.listItems();
  },
  computed: {
    filterd: function() {
      return this.items.filter(itemSelected => {
        return (
          itemSelected.name.match(this.search.toLowerCase()) ||
          itemSelected.price.toString().match(this.search)||
          itemSelected._id.match(this.search.toLowerCase())
        );
      });
    }
  },
  methods: {
    listItems() {
      let uri = "http://localhost:4000/items";
      axios.get(uri).then(response => {
        this.items = response.data;
      });
    },
    deleteItem(id) {
      console.log("id:", id);
      let uri = "http://localhost:4000/items/delete/" + id;
      this.items.splice(id, 1);
      axios.get(uri);
    }
  }
};
</script>
<style>
  .input-group.md-form.form-sm.form-1 input{
    border: 1px solid #bdbdbd;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  .input-group.md-form.form-sm.form-2 input {
      border: 1px solid #bdbdbd;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
  }
  </style>