import axios from 'axios';
import { store } from '../store';
import { router } from '../../routes/routes';
import swal from 'sweetalert';

const state = () => {
    return{
        email: '',
        idToken: '',
        localId: '',
        refreshToken: '',
        settingsId: '',
        username: '',
        profile: '',
        spin: false,
        showSessionModal: false,
        timeOutLogOutVar: '',
        timeOutSessionVar: ''
    };
};

const getters = {
    getuserEmail(state){
        return state.email;
    },

    getidToken(state){
        return state.idToken;
    },

    getlocalId(state){
        return state.localId;
    },

    getrefreshToken(state){
        return state.refreshToken;
    },

    getsettingsId(state){
        return state.settingsId;
    },

    getUsername(state){
        return state.username;
    },

    getProfile(state){
        return state.profile;
    },

    getspin(state){
        return state.spin;
    },

    getshowSessionModal(state){
        return state.showSessionModal;
    }
};

const mutations = {
    signupUserInFb(state, payLoad){
        state.email = payLoad.email;
        state.idToken = payLoad.idToken;
        state.localId = payLoad.localId;
        state.refreshToken = payLoad.refreshToken;

        var expiresIn = payLoad.expiresIn;
        var DateNow = new Date();
        var expirationDate = new Date(DateNow.getTime() + (expiresIn * 1000));
        var sessionModalDisplayDate = new Date(DateNow.getTime() + ((expiresIn - 600) * 1000));

        sessionStorage.setItem('userEmail', payLoad.email);
        sessionStorage.setItem('idToken', payLoad.idToken);
        sessionStorage.setItem('localId', payLoad.localId);
        sessionStorage.setItem('refreshToken', payLoad.refreshToken);
        sessionStorage.setItem('expirationDate', expirationDate);
        sessionStorage.setItem('sessionModalDisplayDate', sessionModalDisplayDate);

        store.dispatch('autoLogoutUser', expiresIn * 1000);
        store.dispatch('sessionTimeoutModal', (expiresIn - 600) * 1000);
        router.push("/");
    },

    loginUserInFb(state, payLoad){
        state.email = payLoad.email;
        state.idToken = payLoad.idToken;
        state.localId = payLoad.localId;
        state.refreshToken = payLoad.refreshToken;
 
        var expiresIn = payLoad.expiresIn;
        var DateNow = new Date();
        var expirationDate = new Date(DateNow.getTime() + (expiresIn * 1000));
        var sessionModalDisplayDate = new Date(DateNow.getTime() + ((expiresIn - 600) * 1000));

        sessionStorage.setItem('userEmail', payLoad.email);
        sessionStorage.setItem('idToken', payLoad.idToken);
        sessionStorage.setItem('localId', payLoad.localId);
        sessionStorage.setItem('refreshToken', payLoad.refreshToken);
        sessionStorage.setItem('expirationDate', expirationDate);
        sessionStorage.setItem('sessionModalDisplayDate', sessionModalDisplayDate);

        store.dispatch('autoLogoutUser', expiresIn * 1000);
        store.dispatch('sessionTimeoutModal', (expiresIn - 600) * 1000);
        store.dispatch('getUserProfileFromDb');
        router.push("/");
    },

    logoutUser(state){
        state.email = '';
        state.idToken = '';
        state.localId = '';
        state.refreshToken = '';
        state.settingsId = '';
        state.username = '';
        state.profile = '';
    
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('idToken');
        sessionStorage.removeItem('localId');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('settingsId');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userProfile');
        sessionStorage.removeItem('expirationDate');
        sessionStorage.removeItem('sessionModalDisplayDate');

        swal("", "You have been logged out successfully!", "success");
        router.push("/login");
    },

    autoLoginUser(state){
        var email = sessionStorage.getItem('userEmail');
        var idToken = sessionStorage.getItem('idToken');
        var localId = sessionStorage.getItem('localId');
        var refreshToken = sessionStorage.getItem('refreshToken');
        var settingsId = sessionStorage.getItem('settingsId');
        var username = sessionStorage.getItem('userName');
        var profile = sessionStorage.getItem('userProfile');

        var expiration = sessionStorage.getItem('expirationDate');
        var expirationDateMS = new Date(expiration).getTime();

        var sessionDisplay = sessionStorage.getItem('sessionModalDisplayDate');
        var sessionDisplayDateMS = new Date(sessionDisplay).getTime();

        var timeNow = new Date();
        var timeNowMS = timeNow.getTime();

        if(idToken !== '' && idToken !== null){
            if(expirationDateMS > timeNowMS){
                state.email = email;
                state.idToken = idToken;
                state.localId = localId;
                state.refreshToken = refreshToken;
                state.settingsId = settingsId;
                state.username = username;
                state.profile = profile;
                
                var remExpirationTime = expirationDateMS - timeNowMS;
                console.log(remExpirationTime/1000);
                store.dispatch('autoLogoutUser', remExpirationTime);

                if(sessionDisplayDateMS > timeNowMS){
                    var remSessionDisplayTime = sessionDisplayDateMS - timeNowMS;
                    console.log(remSessionDisplayTime/1000);
                    store.dispatch('sessionTimeoutModal', remSessionDisplayTime);
                }
            }
        }
    },

    autoLogoutUser(state, payLoad){
        clearTimeout(state.timeOutLogOutVar);

        state.timeOutLogOutVar = setTimeout(() => {
            state.showSessionModal = false;
            store.dispatch('logoutUser');
        }, payLoad);
    },

    sessionTimeoutModal(state, payLoad){
        clearTimeout(state.timeOutSessionVar);

        state.timeOutSessionVar = setTimeout(() => {
            state.showSessionModal = true;
        }, payLoad);
    },

    extendSession(state, payLoad){
        sessionStorage.removeItem('idToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('expirationDate');
        sessionStorage.removeItem('sessionModalDisplayDate');

        state.idToken = payLoad.id_token;
        state.refreshToken = payLoad.refresh_token;

        var expiresIn = payLoad.expires_in;
        var DateNow = new Date();
        var expirationDate = new Date(DateNow.getTime() + (expiresIn * 1000));
        var sessionModalDisplayDate = new Date(DateNow.getTime() + ((expiresIn - 600) * 1000));

        sessionStorage.setItem('idToken', payLoad.id_token);
        sessionStorage.setItem('refreshToken', payLoad.refresh_token);
        sessionStorage.setItem('expirationDate', expirationDate);
        sessionStorage.setItem('sessionModalDisplayDate', sessionModalDisplayDate);

        store.dispatch('autoLogoutUser', expiresIn * 1000);
        store.dispatch('sessionTimeoutModal', (expiresIn - 600) * 1000);

        swal("Session Extended!", "Your session will expire on " + sessionStorage.getItem('expirationDate'));
    },

    setSMToFalse(state){
        state.showSessionModal = false;
    },

    saveUserProfileInDb(){
        store.dispatch('getUserProfileFromDb');
    },

    getUserProfileFromDb(state, payLoad){
        var keys = Object.keys(payLoad);
        var values = Object.values(payLoad);
        var username = values[0].name;
        var userProfile = values[0].profile;
        if(username){
            state.username = username;
            state.profile = userProfile;
            state.settingsId = keys;

            sessionStorage.setItem('settingsId', keys);
            sessionStorage.setItem('userName', username);
            sessionStorage.setItem('userProfile', userProfile);
        }
    },

    changeProfile(state, payLoad){
        state.profile = payLoad.profile;
        sessionStorage.removeItem('userProfile');
        sessionStorage.setItem('userProfile', payLoad.profile);
    },

    forgotPassword(state, payLoad){
        swal("Email Sent!", "Password reset link has been sent to your account " + payLoad.email + "!", "success");
    },

    deleteAccount(){
        store.dispatch('deleteAccountRelatedData');
    },

    deleteAccountRelatedData(){
        store.dispatch('logoutUser');
    },

    startSpin(state){
        state.spin = true;
    },

    stopSpin(state){
        state.spin = false;
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
                store.dispatch('saveUserProfileInDb', { name: payLoad.username, profile: 'work' });
            }
        }
        catch(error){
            swal("", error.response.data.error.message.split('_').join(' '), "error");
            store.commit("stopSpin");
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
        }
        catch(error){
            swal("", error.response.data.error.message.split('_').join(' '), "error");
            store.commit("stopSpin");
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

    sessionTimeoutModal({ commit }, payLoad){
        commit('sessionTimeoutModal', payLoad);
    },

    async extendSession({ commit, getters }){
        try{
            var rtEndpoint = getters.getrefreshTokenEndPoint;
            var apiKey = getters.getfbNewputWebApiKey;
            var refreshToken = getters.getrefreshToken;

            var res = await axios.post(rtEndpoint + apiKey, { 
                grant_type: "refresh_token",
                refresh_token: refreshToken 
            });
            if(res.status === 200 && res.data !== null){
                commit('extendSession', res.data);
            }
        }
        catch(error){
            swal("", error.response.data.error.message.split('_').join(' '), "error");
        }
    },

    async saveUserProfileInDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburlsettings;
            var authId = getters.getidToken;

            var res = await axios.post(fbdbUrl + '/settings.json?auth=' + authId, payLoad);
            if(res.status === 200 && res.data !== null){
                commit('saveUserProfileInDb');
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    },

    async getUserProfileFromDb({ commit, getters }){
        try{
            var fbdbUrl = getters.getfbdburlsettings;
            var authId = getters.getidToken;

            var res = await axios.get(fbdbUrl + '/settings.json?auth=' + authId);
            if(res.status === 200 && res.data !== null){
                commit('getUserProfileFromDb', res.data);
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    },

    async changeProfileInDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburlsettings;
            var authId = getters.getidToken;
            var settingsId = getters.getsettingsId;
            payLoad.name = getters.getUsername;

            var res = await axios.put(fbdbUrl + '/settings/' + settingsId + '.json?auth=' + authId, payLoad);
            if(res.status === 200 && res.data !== null){
                commit('changeProfile', res.data);
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    },

    async deleteAccount({ commit, getters }){
        try{
            var deleteEndpoint = getters.getdeleteAccount;
            var apiKey = getters.getfbNewputWebApiKey;
            var idToken = getters.getidToken;

            var res = await axios.post(deleteEndpoint + apiKey, { "idToken": idToken });
            if(res.status === 200){
                commit('deleteAccount');
            }
        }
        catch(error){
            swal("", error.response.data.error.message.split('_').join(' '), "error");
        }
    },

    async deleteAccountRelatedData({ commit, getters }){
        try{
            var fbdbUrl = getters.getfbdburlsettings;
            var apiKey = getters.getidToken;

            var res = await axios.delete(fbdbUrl + ".json?auth=" + apiKey);
            if(res.status === 200){
                commit('deleteAccountRelatedData');
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    },

    async forgotPassword({ commit, getters }, payLoad){
        try{
            var passwordReset = getters.getpasswordReset;
            var fbNewputWebApiKey = getters.getfbNewputWebApiKey;

            var res = await axios.post(passwordReset + fbNewputWebApiKey, {
                requestType: "PASSWORD_RESET",
                email: payLoad.email
            });

            if(res.status === 200 && res.data !== null){
                commit('forgotPassword', res.data);
            }
        }
        catch(error){
            swal(error.response.data.error.message.split('_').join(' '), "There is no user record corresponding to this email!", "error");
        }
    }
};

export default{
    state,
    getters,
    mutations,
    actions
}