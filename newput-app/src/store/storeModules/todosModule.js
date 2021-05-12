import axios from 'axios';
import { store } from '../store';

const state = () => {
    return{
        todosArray: []
    };
};

const getters = {
    gettodosArray(state){
        return state.todosArray;
    }
};

const mutations = {

    getTodosFromDb(state, payLoad){
        var keys = Object.keys(payLoad);
        var values = Object.values(payLoad);
        var i = 0;

        values.forEach(temp => {
            temp.id = keys[i];
            i++;
        });

        state.todosArray = values.reverse();
    },

    submitTodoToDb(){
        store.dispatch("getTodosFromDb");
    },

    updateTodoInDb(){
        store.dispatch("getTodosFromDb");
    },

    deleteTodoInDb(){
        store.dispatch("getTodosFromDb");
    },
    resetState(state){
        state.todosArray = [];
    }

};

const actions = {

    async getTodosFromDb({ commit, getters }){
        try{
            var dbUrl = getters.getfbdburl;
            var res = await axios.get(dbUrl + "todos.json");
            if(res.status === 200 && res.data !== null){
                commit("getTodosFromDb", res.data);
            }
            else if(res.data === null){
                commit('resetState');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async submitTodoToDb({ commit, getters }, payLoad){
        try{
            var dbUrl = getters.getfbdburl;
            var res = await axios.post(dbUrl + "todos.json", payLoad);
            if(res.status === 200 && res.data !== null){
                commit("submitTodoToDb");
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async updateTodoInDb({ commit, getters }, payLoad){
        try{
            var dbUrl = getters.getfbdburl;
            var todoObjWithoutId = {
                todoMsg: payLoad.todoMsg,
                dueDate: payLoad.dueDate,
                completed: payLoad.completed
            };
            var res = await axios.put(dbUrl + "todos/" + payLoad.id + ".json", todoObjWithoutId);
            if(res.status === 200 && res.data !== null){
                commit("updateTodoInDb");
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async deleteTodoInDb({ commit, getters }, payLoad){
        try{
            var dbUrl = getters.getfbdburl;
            
            var res = await axios.delete(dbUrl + "todos/" + payLoad.id + ".json");
            if(res.status === 200){
                commit("deleteTodoInDb");
            }
        }
        catch(error){
            console.log(error);
        }
    }

};

export default{
    state,
    getters,
    mutations,
    actions
}