import axios from "axios";
import summer from "../../assets/summer.png";
import sunny from "../../assets/sunny.jpg";
import cool from "../../assets/cool.jpg";
import winter from "../../assets/winter.jpg";
import swal from 'sweetalert';

const state = () => {
    return{
        weatherData: {
            name: '',
            country: '',
            localDate: '',
            localTime: '',
            tempInCelsius: '',
            weatherIconUrl: '',
            weatherCondition: '',
            backgroundImgUrl: '',
            color: ''
        }
    };
};

const getters = {
    getweatherData(state){
        return state.weatherData;
    }
};

const mutations = {
    getWeatherDetails(state, payLoad){       
        state.weatherData.name = payLoad.location.name;
        state.weatherData.country = payLoad.location.country;
        state.weatherData.tempInCelsius = Math.round(payLoad.current.temp_c);
        state.weatherData.weatherIconUrl = payLoad.current.condition.icon;
        state.weatherData.weatherCondition = payLoad.current.condition.text;

        var d = payLoad.location.localtime;
        var date = d.slice(8, 10);
        var intmonth = parseInt(d.slice(5, 7));
        var year = d.slice(0, 4);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[intmonth - 1];
        var time = d.slice(11);

        state.weatherData.localDate = date + ' ' + month + ', ' + year;
        state.weatherData.localTime = time;
        
        if(Math.round(payLoad.current.temp_c) > 20){
            state.weatherData.backgroundImgUrl = summer;
            state.weatherData.color = "black";
        }
        else if(Math.round(payLoad.current.temp_c) >= 11 && Math.round(payLoad.current.temp_c) <= 20){
            state.weatherData.backgroundImgUrl = sunny;
            state.weatherData.color = 'rgb(243, 36, 157)';
        }
        else if(Math.round(payLoad.current.temp_c) >= -1 && Math.round(payLoad.current.temp_c) <= 10){
            state.weatherData.backgroundImgUrl = cool;
            state.weatherData.color = 'rgb(19, 247, 11)';
        }
        else if(Math.round(payLoad.current.temp_c) <= -2){
            state.weatherData.backgroundImgUrl = winter;
            state.weatherData.color = 'rgb(239, 11, 247)';
        }
    },

    clearWeatherData(state){
        state.weatherData = {};
    }
};

const actions = {
    async getWeatherDetails({ commit, getters }, payLoad){
        try{
            var weatherApiUrl = getters.getweatherApiUrl;
            var weatherAPIKey = getters.getweatherAPIKey;

            var res = await axios.get(weatherApiUrl + weatherAPIKey + "&q=" + payLoad.locName);
            if(res.status === 200){
                commit("getWeatherDetails", res.data);
            }
        }
        catch(error){
            swal("", error.response.data.error.message, "error");
        }
    }
};

export default{
    state,
    getters,
    mutations,
    actions
}