import { store } from '../store';

const state = () => {
    return{
        position: false,
        fbdbUrl: "https://newput-f56e4-default-rtdb.firebaseio.com/newput/users/",
        fbNewputWebApiKey: "AIzaSyDITmBNQe2HdD_hGHQkmH3XftMBdP_2Nw0",
        signupEndpoint: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
        loginEndpoint: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
        passwordReset: "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=",
        weatherApiUrl: "https://api.weatherapi.com/v1/current.json?key=",
        weatherAPIKey: "9edb0764268f49a1b8264554202210"
    };
};

const getters = {
    getposition(state){
        return state.position;
    },
    getfbdburl(state){
        var localId = store.getters.getlocalId;
        return state.fbdbUrl + localId;
    },
    getfbNewputWebApiKey(state){
        return state.fbNewputWebApiKey
    },
    getsignupEndpoint(state){
        return state.signupEndpoint
    },
    getloginEndpoint(state){
        return state.loginEndpoint
    },
    getpasswordReset(state){
        return state.passwordReset
    },
    getweatherApiUrl(state){
        return state.weatherApiUrl;
    },
    getweatherAPIKey(state){
        return state.weatherAPIKey;
    }
};

const mutations = {
    changePosition(state){
        state.position = !state.position;
    },

    changePositionToFalse(state){
        state.position = false;
    }
};

export default{
    state,
    getters,
    mutations
}