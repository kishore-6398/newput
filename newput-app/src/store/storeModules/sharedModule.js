const state = () => {
    return{
        position: false,
        fbdbUrl: "https://newput-f56e4-default-rtdb.firebaseio.com/newput/",
        weatherApiUrl: "https://api.weatherapi.com/v1/current.json?key=",
        weatherAPIKey: "9edb0764268f49a1b8264554202210"
    };
};

const getters = {
    getposition(state){
        return state.position;
    },
    getfbdburl(state){
        return state.fbdbUrl;
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