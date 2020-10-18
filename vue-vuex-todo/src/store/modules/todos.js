import axios from "axios";

import {
  list_todos,
  add_todo,
  delete_todo,
  filter_todos,
} from "../../services/todo_logic";

const state = {
  todos: [],
};

const getters = {
  allTodos(state) {
    return state.todos;
  },
};

const actions = {
  async fetchTodos({ commit }) {
    let ret = await list_todos();
    commit("setTodos", ret.result.tdata);
  },
  async AddTodo({ commit }, title) {
    let ret = await add_todo(title);
    console.log(ret);
    commit("newTodo", ret.result.data);
  },

  async deleteTodo({ commit }, tid) {
    let ret = await delete_todo(tid);
    console.log(ret);
    commit("onDeleteTodo", tid);
  },
  async filterTodos({ commit }, e) {
    let ret = await filter_todos(e);
    console.log("returned read todo_data:", ret);
    commit("onFilterTodos", ret.result.tdata);
  },

  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      updatedTodo
    );
    console.log(response.data);
    commit("onUpdateTodo", updatedTodo);
  },
};

const mutations = {
  setTodos(state, payload) {
    state.todos = payload;
  },
  newTodo(state, payload) {
    state.todos.unshift(payload);
  },
  onDeleteTodo(state, tid) {
    state.todos = state.todos.filter((todo) => todo.tid !== tid);
  },
  onFilterTodos(state, payload) {
    state.todos = payload;
  },
  onUpdateTodo(state, payload) {
    const index = state.todos.findIndex((todo) => todo.id === payload.id);
    if (index !== -1) {
      state.todos.splice(index, 1, payload);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
