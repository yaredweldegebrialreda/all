<template>
<div>
  <h3>Add Todo</h3>
  <div class="add">
   <form @submit.prevent="SubmitAddTodo" >
     <input type="text" placeholder="Add Todo....." v-model="title"/> 
     <button class="button" type="submit">Add</button>
   </form>
  </div>
  
</div>
</template>

<script>
import {mapActions} from 'vuex';   

export default {
name:"addTodo",
data() {
    return {
        title:""
    }
},
methods: {
    ...mapActions(['AddTodo']),
    SubmitAddTodo(){
        // this.$store.dispatch('AddTodo', {title: this.title}); //without using ...mapactions
        this.AddTodo(this.title)
    }
},
}
</script>

<style scoped>
form{
display: flex;
}
input[type='text']{
    flex:10;
    padding: 10px;
    border:1px solid #00695f;
    outline: 0;
}
.button{
    flex: 2;
    background:#00695f;
    color: white;
    border:1px #00695f solid;
    cursor: pointer;
}
</style>