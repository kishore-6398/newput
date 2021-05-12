import axios from 'axios';
import { store } from '../store';
import { router } from '../../routes/routes';

const state = () => {
    return{
        email: '',
        username: '',
        idToken: '',
        refreshToken: ''
    };
};

const getters = {
    getuserEmail(state){
        return state.email;
    },

    getUsername(state){
        return state.username;
    },

    getidToken(state){
        return state.idToken;
    }
};

const mutations = {
    signupUserInFb(state, payLoad){
        state.email = payLoad.email;
        state.idToken = payLoad.idToken;
        state.refreshToken = payLoad.refreshToken;

        var expiresIn = payLoad.expiresIn;
        var DateNow = new Date();
        var expirationDate = new Date(DateNow.getTime() + (expiresIn * 1000));

        sessionStorage.setItem('userEmail', payLoad.email);
        sessionStorage.setItem('idToken', payLoad.idToken);
        sessionStorage.setItem('refreshToken', payLoad.refreshToken);
        sessionStorage.setItem('expirationDate', expirationDate);

        store.dispatch('autoLogoutUser', expiresIn * 1000);
        router.push("/");
    },

    loginUserInFb(state, payLoad){
        state.email = payLoad.email;
        state.idToken = payLoad.idToken;
        state.refreshToken = payLoad.refreshToken;

        var expiresIn = payLoad.expiresIn;
        var DateNow = new Date();
        var expirationDate = new Date(DateNow.getTime() + (expiresIn * 1000));

        sessionStorage.setItem('userEmail', payLoad.email);
        sessionStorage.setItem('idToken', payLoad.idToken);
        sessionStorage.setItem('refreshToken', payLoad.refreshToken);
        sessionStorage.setItem('expirationDate', expirationDate);

        store.dispatch('autoLogoutUser', expiresIn * 1000);
        store.dispatch('getUserProfileFromDb');
        router.push("/");
    },

    logoutUser(state){
        state.email = '';
        state.idToken = '';
        state.refreshToken = '';

        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('idToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('expirationDate');

        router.push("/login");
    },

    autoLoginUser(state){
        var email = sessionStorage.getItem('userEmail');
        var idToken = sessionStorage.getItem('idToken');
        var refreshToken = sessionStorage.getItem('refreshToken');

        var expiration = sessionStorage.getItem('expirationDate');
        var expirationDateMS = new Date(expiration).getTime();

        var timeNow = new Date();
        var timeNowMS = timeNow.getTime();
        if(idToken !== '' && idToken !== null){
            if(expirationDateMS > timeNowMS){
                state.email = email;
                state.idToken = idToken;
                state.refreshToken = refreshToken;
                
                var remExpirationTime = expirationDateMS - timeNowMS;
                console.log(remExpirationTime/1000)
                store.dispatch('autoLogoutUser', remExpirationTime);
                store.dispatch('getUserProfileFromDb');
            }
        }
    },

    autoLogoutUser(state, payLoad){
        setTimeout(() => {
            store.dispatch('logoutUser');
        }, payLoad);
    },

    saveUserProfileInDb(){
        store.dispatch('getUserProfileFromDb');
    },

    getUserProfileFromDb(state, payLoad){
        var values = Object.values(payLoad);
        var userData = values.find(temp => {
            return temp.email === state.email;
        });
        if(userData){
            state.username = userData.name;
        }
    }
};

const actions = {
    async signupUserInFb({ commit, getters}, payLoad){
        try{
            var apiKey = getters.getfbNewputWebApiKey;
            var signupEndpoint = getters.getsignupEndpoint;
            var res = await axios.post(signupEndpoint + apiKey,
                {
                    email: payLoad.email,
                    password: payLoad.password,
                    returnSecureToken: true
                });
            if(res.status === 200 && res.data !== null){
                commit('signupUserInFb', res.data);
                store.dispatch('saveUserProfileInDb', { email: payLoad.email, name: payLoad.username });
            }
            else{
                console.log(res);
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async loginUserInFb({ commit, getters}, payLoad){
        try{
            var apiKey = getters.getfbNewputWebApiKey;
            var loginEndpoint = getters.getloginEndpoint;
            var res = await axios.post(loginEndpoint + apiKey,
                {
                    email: payLoad.email,
                    password: payLoad.password,
                    returnSecureToken: true
                });
            if(res.status === 200 && res.data !== null && res.data.registered === true){
                commit('loginUserInFb', res.data);
            }
            else{
                console.log(res);
            }
        }
        catch(error){
            console.log(error);
        }
    },

    logoutUser({ commit }){
        commit('logoutUser');
    },

    autoLoginUser({ commit }){
        commit('autoLoginUser');
    },

    autoLogoutUser({ commit }, payLoad){
        commit('autoLogoutUser', payLoad);
    },

    async saveUserProfileInDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburl;
            var res = await axios.post(fbdbUrl + 'users.json', payLoad);
            if(res.status === 200 && res.data !== null){
                commit('saveUserProfileInDb');
            }
        }
        catch(error){
            console.log(error);
        }
    },

    async getUserProfileFromDb({ commit, getters }){
        try{
            var fbdbUrl = getters.getfbdburl;
            var res = await axios.get(fbdbUrl + 'users.json');
            if(res.status === 200 && res.data !== null){
                commit('getUserProfileFromDb', res.data);
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