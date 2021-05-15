import axios from 'axios';
import { router } from '../../routes/routes';
import { store } from '../store';

const state = () => {
    return{
       vaultData: []
    };
};

const getters = {
    getVaultData(state){
        return state.vaultData;
    }
};

const mutations = {

    getVaultDataFromDb(state, payLoad){
        var keys = Object.keys(payLoad);
        var values = Object.values(payLoad);
        var i = 0;
        values.forEach(temp => {
            temp.id = keys[i];
            i++;
        });

        state.vaultData = values;
    },

    submitVaultDataToDb(){
        router.push('/pvault');
    },

    updateVaultDetailInDb(){
        store.dispatch('getVaultDataFromDb');
    },

    deleteVaultDataFromDb(){
        store.dispatch('getVaultDataFromDb');
    },
    resetState(state){
        state.vaultData = [];
    }

};

const actions = {
    
    async getVaultDataFromDb({ commit, getters }){
        try{
            var fbdbUrl = getters.getfbdburl;
            var authId = getters.getidToken;

            var res = await axios.get(fbdbUrl + '/vaultData.json?auth=' + authId);
            if(res.status === 200 && res.data !== null){
                commit('getVaultDataFromDb', res.data);
            }
            else if(res.data === null){
                commit('resetState');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async submitVaultDataToDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburl;
            var authId = getters.getidToken;

            var res = await axios.post(fbdbUrl + '/vaultData.json?auth=' + authId, payLoad);
            if(res.status === 200 && res.data !== null){
                commit('submitVaultDataToDb');
            }
        }
        catch(error){
            console.log(error);
        }
    },
    
    async updateVaultDetailInDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburl;
            var authId = getters.getidToken;

            var vaultData = {
                vaultName: payLoad.vaultName,
                vaultPassword: payLoad.vaultPassword,
                vaultUrl: payLoad.vaultUrl,
                vaultTag: payLoad.vaultTag
            }
            var res = await axios.put(fbdbUrl + '/vaultData/' + payLoad.id + '.json?auth=' + authId, vaultData);
            if(res.status === 200 && res.data !== null){
                commit('updateVaultDetailInDb');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async deleteVaultDataFromDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburl;
            var authId = getters.getidToken;

            var res = await axios.delete(fbdbUrl + '/vaultData/' + payLoad.id + '.json?auth=' + authId);
            if(res.status === 200){
                commit('deleteVaultDataFromDb');
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