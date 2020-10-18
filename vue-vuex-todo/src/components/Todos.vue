<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span>=Incomplete
      </span>
      <span>
        <span class="complete-box"></span>=Complete
      </span>
    </div>

    <div class="todos">
      <div 
          class="todo" 
          v-bind:class="{'is-complete':todo.completed}"
          v-on:click.middle="handleDblClick(todo)"
          v-for="todo in allTodos"
          :key="todo.tid">
          {{todo.data.title}}
        <i @click="deleteTodo(todo.tid)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Todos",
  methods: {
    ...mapActions(["fetchTodos","deleteTodo", "updateTodo"]),
    handleDblClick(todo) {
      const updatedTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      };
      this.updateTodo(updatedTodo);
    }
  },
  computed: mapGetters(["allTodos"]),
  created() {
    console.log("inside created:");
    this.fetchTodos();
  }
};
</script>

<style scoped>
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}
.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}
.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #00695f;
  padding: 1rem;
  border-radius: 5px;
  position: relative;
  text-align: center;
  cursor: pointer;
}
i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  cursor: pointer;
}
.is-complete {
  background: #35495e;
  color: #fff;
}

@media (max-width: 500px) {
  .todos {
    grid-template-columns: 1fr;
  }
}
</style>