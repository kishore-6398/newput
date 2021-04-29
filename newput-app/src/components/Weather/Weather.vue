<template>
    <div class="world-weather" :style="{ 'background-image': `url(${weatherData.backgroundImgUrl})` }">

        <div class="locationForm row m-0">
            <input type="search" v-model="location.locName" @keyup.enter="fetchWeather" class="form-control" id="locationText" placeholder="Enter Location...">
        </div>

        <div v-if="weatherData.country" class="weather-data-display" :style="{ color: weatherData.color }">
            <div class="region">
                {{ weatherData.name }}, {{ weatherData.country }}
            </div>
            <div class="localdateandtime">
                {{ weatherData.localDate }}, {{ weatherData.localTime }}
            </div>
            <div class="temp">{{ weatherData.tempInCelsius }}°c</div>
            <div class="weatherType">
                <img :src="weatherData.weatherIconUrl" alt="weatherIconUrl" >{{ weatherData.weatherCondition }}
            </div>
        </div>

        <div v-else class="text-center">
            <div class="intro">
                WeatherAPI.com makes it super easy to integrate our realtime
                 and weather forecast data, historical weather, air quality data,
                  autocomplete, time zone, astronomy and sports data
                   into your new or existing project.
            </div>
            Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a><br/><br/>
            <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"></a>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
    setup(){
        var location = reactive({
            locName: ''
        });

        var store = useStore();

        function fetchWeather(){
            store.dispatch("getWeatherDetails", location);
        }

        var weatherData = computed(() => store.getters.getweatherData);

        onMounted(() => {
            store.commit('clearWeatherData');
        });

        return{
            location,
            fetchWeather,
            weatherData
        };
    }
}
</script>

<style scoped>
    .world-weather{
        background-color: #d9e4f5;
        background-image: linear-gradient(315deg, #d9e4f5 0%, #f5e3e6 74%);
        height: 100vh;
        width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        transition: 0.5s;
    }
    #locationText{
        width: 50%;
        margin: 50px auto;
        border: transparent;
        border-radius: 15px 0 15px 0;
        background-color: rgba(255, 251, 251, 0.75);
        padding: 8px 15px;
        transition: .3s;
    }
    #locationText:focus{
        border: 0 solid rgb(86, 196, 230);
        border-radius: 0 15px 0 15px;
        background-color: rgba(255, 255, 255, 1);
        transition: .3s;
        outline: none;
    }
    .weather-data-display{
        text-align: center;
    }
    .intro{
        border: 1px solid rgb(202, 202, 202);
        margin: 0 auto 80px auto;
        padding: 20px;
        background-color: #b1ade2;
        background-image: linear-gradient(315deg, #b1ade2 0%, #7ddff8 74%);
        color: black;
        border-radius: 15px;
        text-align: center;
        width: 50%;
        box-shadow:  0 3px 30px rgba(0, 0, 0, 0.25);
    }
    .region{
        font-weight: bolder;
        font-size: 26px;
        margin-bottom: 20px;
    }
    .localdateandtime{
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 20px;
    }
    .temp{
        box-shadow: 0 3px 30px rgba(0, 0, 0, 0.35);
        width: 20%;
        margin: 10px auto;
        padding: 20px;
        background: transparent;
        font-weight: bolder;
        font-size: 38px;
        border-radius: 10px;
    }
    .weatherType{
        font-weight: bolder;
        font-size: 26px;
        margin: 20px 0;
        font-style: italic;
    }

    @media (max-width: 850px){
        .world-weather{
            height: calc(100vh - 58px);
            position: fixed;
            top: 58px;
            z-index: -1;
        }
        #locationText{
            width: 80%;
        }
        .intro{
            border: 1px solid rgb(202, 202, 202);
            margin: 0 auto 40px auto;
            padding: 20px;
            background-color: white;
            border-radius: 10px;
            text-align: center;
            width: 80%;
        }
        .region{
            margin: 0 20px 20px 20px;
        }
        .temp{
            width: 40%;
        }
    }
</style>