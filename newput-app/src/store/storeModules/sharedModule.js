const state = () => {
    return{
        position: false,
        fbdbUrl: "https://newput-f56e4-default-rtdb.firebaseio.com/"
    };
};

const getters = {
    getposition(state){
        return state.position;
    },
    getfbdburl(state){
        return state.fbdbUrl;
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