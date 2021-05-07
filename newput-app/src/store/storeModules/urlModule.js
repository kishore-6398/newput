import axios from 'axios';
import { router } from '../../routes/routes';
import { store } from '../store';

const state = () => {
    return{
        urlData: [],
        tags: []
    };
};

const getters = {
    getUrlData(state){
        return state.urlData;
    },

    gettags(state){
        return state.tags;
    }
};

const mutations = {
    getUrlFromDb(state, payLoad){
        var keys = Object.keys(payLoad);
        var values = Object.values(payLoad);
        var i = 0;
        values.forEach(temp => {
            temp.id = keys[i];
            i++;
        });

        state.urlData = values;

        var tags = values.map(temp => {
            return temp.urlTag;
        });

        var filtags = tags.filter((tag, i) => {
            return tags.indexOf(tag) === i;
        })
        filtags.splice(0, 0, 'All Tags');
        state.tags = filtags;
    },

    saveUrlInDb(){
        router.push("/url");
    },

    updateUrlDataInDb(){
        store.dispatch('getUrlFromDb');
    },

    deleteUrlDataFromDb(){
        store.dispatch('getUrlFromDb');
    },
    resetState(state){
        state.urlData = [];
        state.tags = [];
        state.tags.splice(0, 0, 'All Tags');
    }
};

const actions = {
    async getUrlFromDb({ commit, getters }){
        try{
            var fbdbUrl = getters.getfbdburl;
            var res = await axios.get(fbdbUrl + "urls.json");
            if(res.status === 200 && res.data !== null){
                commit('getUrlFromDb', res.data);
            }
            else if(res.data === null){
                commit('resetState');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async saveUrlInDb({ commit, getters }, payLoad ){
        try{
            var fbdbUrl = getters.getfbdburl;
            var res = await axios.post(fbdbUrl + "urls.json", payLoad);
            if(res.status === 200 && res.data !== null){
                commit('saveUrlInDb');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async updateUrlDataInDb({ commit, getters }, payLoad ){
        try{
            var fbdbUrl = getters.getfbdburl;
            var urlData = {
                urlName: payLoad.urlName,
                urlText: payLoad.urlText,
                urlTag: payLoad.urlTag
            };
            var res = await axios.put(fbdbUrl + "urls/" + payLoad.id + ".json", urlData);
            if(res.status === 200 && res.data !== null){
                commit('updateUrlDataInDb');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async deleteUrlDataFromDb({ commit, getters }, payLoad ){
        try{
            var fbdbUrl = getters.getfbdburl;
            var res = await axios.delete(fbdbUrl + "urls/" + payLoad.id + ".json");
            if(res.status === 200){
                commit('deleteUrlDataFromDb');
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