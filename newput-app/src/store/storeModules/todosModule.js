import axios from 'axios';
import { store } from '../store';

const state = () => {
    return{
        todosArray: [],
        allTodosCount: 0,
        pendingTodosCount: 0,
        completedTodosCount: 0
    };
};

const getters = {
    gettodosArray(state){
        return state.todosArray;
    },
    getallTodosCount(state){
        return state.allTodosCount;
    },
    getpendingTodosCount(state){
        return state.pendingTodosCount;
    },
    getcompletedTodosCount(state){
        return state.completedTodosCount;
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

        state.allTodosCount = values.length;

        var pendingTodos = values.filter(temp => {
            return temp.completed === false;
        });

        state.pendingTodosCount = pendingTodos.length;

        var completedTodos = values.filter(temp => {
            return temp.completed === true;
        });

        state.completedTodosCount = completedTodos.length;
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
            var authId = getters.getidToken;

            var res = await axios.get(dbUrl + "/todos.json?auth=" + authId);
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
            var authId = getters.getidToken;

            var res = await axios.post(dbUrl + "/todos.json?auth=" + authId, payLoad);
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
            var authId = getters.getidToken;
            var todoObjWithoutId = {
                todoMsg: payLoad.todoMsg,
                dueDate: payLoad.dueDate,
                completed: payLoad.completed
            };
            var res = await axios.put(dbUrl + "/todos/" + payLoad.id + ".json?auth=" + authId, todoObjWithoutId);
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
            var authId = getters.getidToken;

            var res = await axios.delete(dbUrl + "/todos/" + payLoad.id + ".json?auth=" + authId);
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