// import axios from "axios";
import API from "../api/api_rest";
import CONFIG from "../config/config";

export async function list_todos(){
    let data, ret;
    data = {
      auth: {
        license: CONFIG.auth.license,
        // token: token
      },   
        param: {
          type: "todo",
          pagin: {
            page: 1,
            size: 1000,
          },
        },
    };
    ret = await API.run(data, '/app/rufta/todo/tdata/list');
    return ret;
}

export async function add_todo(title){
    let data, ret;
    let param_send = {
      title: title,
      description: "abcd",
      body: "bodied",
    };
    data = {
      auth: {
        license: CONFIG.auth.license,
        // token: token
      },
      param: {
        type: "todo",
        data: param_send,
      },
    };
    ret = await API.run(data, "/app/rufta/todo/tdata/write");
    return ret;
}

export async function delete_todo(tid){
    let data, ret;
    data = {
      auth: {
        license: CONFIG.auth.license,
        // token: token
      },
      param: {
        type: "todo",
        tid: tid,
      },
    };
    ret = await API.run(data, "/app/rufta/todo/tdata/delete");
    return ret;
}

export async function filter_todos(e){
    let data, ret;
    data = {
      auth: {
        license: CONFIG.auth.license,
        // token: token
      },
      param: {
        type: "todo",
        pagin: {
          page: 1,
          size: parseInt(e.target.value)
        },
      },
    };
    console.log(data.param);
    ret = await API.run(data, '/app/rufta/todo/tdata/list');
    return ret;
}
