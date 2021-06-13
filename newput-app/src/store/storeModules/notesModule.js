import axios from 'axios';
import { router } from '../../routes/routes';
import { store } from '../store';
import swal from 'sweetalert';

const state = () => {
    return{
        notesArray: [],
        singleNote: {},
        tags: []
    };
};

const getters = {
    getnotesArray(state){
        return state.notesArray;
    },

    getnotestags(state){
        return state.tags;
    },

    getsingleNote(state){
        return state.singleNote;
    }
};

const mutations = {
    getNotesFromDb(state, payLoad){
        var keys = Object.keys(payLoad);
        var values = Object.values(payLoad);
        var i = 0;

        values.forEach(temp => {
            temp.id = keys[i];
            i++;
        });
        state.notesArray = values;

        //identifying unique tags from values array
        var allTags = values.map(temp => {
            return temp.category;
        });

        var tags = allTags.filter((temp, i) => {
            return allTags.indexOf(temp) === i;
        });

        tags.splice(0, 0, 'All Tags');
        state.tags = tags;
    },

    getSingleNoteFromDb(state, payLoad){
        state.singleNote = payLoad;
    },

    saveNotesToDb(){
        router.push("/notes");
    },

    updateNotesInDb(){
        router.push("/notes");
    },

    deleteNotesFromDb(){
        store.dispatch('getNotesFromDb');
    },

    resetState(state){
        state.notesArray = [];
        state.tags = [];
        state.tags.splice(0, 0, 'All Tags');
    }
};

const actions = {

    async getNotesFromDb({ commit, getters }){
        try{
            var fbdbUrl = getters.getfbdburl;
            var authId = getters.getidToken;

            var res = await axios.get(fbdbUrl + '/notes.json?auth=' + authId);
            
            if(res.status === 200 && res.data !== null){
                commit('getNotesFromDb', res.data);
            }
            else if(res.data === null){
                commit('resetState');
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    },

    async getSingleNoteFromDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburl;
            var authId = getters.getidToken;

            var res = await axios.get(fbdbUrl + '/notes/' + payLoad.id + '.json?auth=' + authId);

            if(res.status === 200 && res.data !== null){
                commit('getSingleNoteFromDb', res.data);
            }
            else if(res.data === null){
                router.push("/error");
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    },

    async saveNotesToDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburl;
            var authId = getters.getidToken;

            var res = await axios.post(fbdbUrl + '/notes.json?auth=' + authId, payLoad);
            
            if(res.status === 200 && res.data !== null){
                commit('saveNotesToDb');
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    },

    async updateNotesInDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburl;
            var authId = getters.getidToken;

            var notesData = {
                title: payLoad.title,
                category: payLoad.category,
                date: payLoad.date,
                delta: payLoad.delta
            };
            var res = await axios.put(fbdbUrl + '/notes/' + payLoad.id + '.json?auth=' + authId, notesData);
            
            if(res.status === 200 && res.data !== null){
                commit('updateNotesInDb');
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    },

    async deleteNotesFromDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburl;
            var authId = getters.getidToken;

            var res = await axios.delete(fbdbUrl + '/notes/' + payLoad.nid + '.json?auth=' + authId);
            
            if(res.status === 200){
                commit('deleteNotesFromDb');
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    }

};

export default{
    state,
    getters,
    mutations,
    actions
}