<template>
  <div id="box">
        <div id="navbar" v-if="bool !== 'StarterView' && bool !== 'LoginView' && bool !== 'SignupView' && bool !== 'ForgotPasswordView'">
            <app-Navbar />
        </div>

        <div v-if="bool === 'StarterView'">
            <div id="smallNav">
                <app-Navbar />
            </div>
            <router-view />
        </div>

        <div v-else-if="bool === 'LoginView' || bool === 'SignupView' || bool === 'ForgotPasswordView'">
            <router-view />
        </div>

        <div id="content" v-else>
            <div id="smallNav">
                <app-Navbar />
            </div>
            <div id="visibleContent">
                <router-view />
            </div>
        </div>
  </div>
</template>

<script>
import { ref,  watch } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './Navbar.vue';
export default {
 components: {
   'app-Navbar': Navbar
 },
 setup(){
    const route = useRoute();
    var bool = ref('');
    
    watch(route, (newval) => {
        bool.value = newval.name;
    });
     
     return{
         bool
     }
 }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
#navbar{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    width: 260px;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #6e72fc;
    background-image: linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%);
}
#content{
    margin: 0 0 0 260px;
    padding: 0;
}
#smallNav{
    display: none;
}

@media (max-width: 850px){
    #navbar{
        display: none;
        width: 0;
    }
    #content{
        margin: 0 0 0 0;
    }
    #smallNav{
        display: block;
        position:sticky;
        top: 0;
    }
}


</style>