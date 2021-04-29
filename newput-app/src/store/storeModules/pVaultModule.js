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
    }

};

const actions = {
    
    async getVaultDataFromDb({ commit, getters }){
        try{
            var fbdbUrl = getters.getfbdburl;
            var res = await axios.get(fbdbUrl + 'vaultData.json');
            if(res.status === 200 && res.data !== null){
                commit('getVaultDataFromDb', res.data);
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async submitVaultDataToDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburl;
            var res = await axios.post(fbdbUrl + 'vaultData.json', payLoad);
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
            var vaultData = {
                vaultName: payLoad.vaultName,
                vaultPassword: payLoad.vaultPassword,
                vaultUrl: payLoad.vaultUrl,
                vaultTag: payLoad.vaultTag
            }
            var res = await axios.put(fbdbUrl + 'vaultData/' + payLoad.id + '.json', vaultData);
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
            var res = await axios.delete(fbdbUrl + 'vaultData/' + payLoad.id + '.json');
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