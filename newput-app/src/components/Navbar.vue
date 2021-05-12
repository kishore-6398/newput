<template>
  <div>
      
      <nav id="mainNav">
        <span class="menu material-icons" @click="navToggleMethod">menu</span>
        <router-link to="/" class="titleLogo" @click="navToggleFalse">NEWPUT</router-link> 
      </nav>

      <nav id="sidenav" class="sidenav" :class="{ sidenavActive: navToggle }">
        <div class="logo">
            <router-link to="/" >NEWPUT</router-link>
        </div>
        <ul @click="navToggleMethod">
            <router-link class="routeLink" to="/todo" >Todo List</router-link>
            <router-link class="routeLink" to="/pvault" >Password Vault</router-link>
            <router-link class="routeLink" to="/url" >URL Manager</router-link>
            <router-link class="routeLink" to="/notes" >Notes Editor</router-link>
            <router-link class="routeLink" to="/expense/form" >Expense Tracker</router-link>
            <router-link class="routeLink" to="/weather" >World Weather</router-link>
            <li @click="logout" class="routeLink">LogOut</li>
        </ul>
        <div class="overlay" @click="navToggleMethod"></div>
      </nav>

  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore }from 'vuex';

export default {
    setup(){
        var navToggle = ref(false);
        var store = useStore();

        function navToggleMethod(){
            navToggle.value = !navToggle.value;
            store.commit('changePosition');
        }

        function navToggleFalse(){
            navToggle.value = false;
            store.commit('changePositionToFalse');
        }

        function logout(){
            store.dispatch('logoutUser');
        }

        return{
            navToggle,
            navToggleMethod,
            navToggleFalse,
            logout
        }
    } 
}

</script>

<style>
    #mainNav{
        display: none;
    }
    .logo{
        text-align: center;
        margin: 10px 0 0 0;
    }
    .logo a{
        text-decoration: none;
        color: white;
        font-size:x-large;
        font-weight: bolder;
        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .logo a:hover{
        color: white;
    }
    #sidenav ul{
        list-style: none;
        padding: 0;
        margin: 20px 0 0 0;
        display: flex;
        flex-direction: column;
    }
    
    #sidenav ul .routeLink{
        padding: 20px 0 20px 10px;
        text-decoration: none;
        color: white;
        font-size: 17px;
        transition: 0.3s;
    }
    #sidenav ul .routeLink:hover{
        background-color: rgb(157, 83, 226);
        cursor: pointer;
    }
    .overlay{
        visibility: hidden;
    }

    @media (max-width: 850px){
        .sidenav{
            position: fixed ;
            top:58px;
            left: -100%;
            background-color: gray;
            height: calc(100vh - 58px);
            transition: 0.5s;
            width: 260px;
            overflow-y:auto;
            scroll-behavior:smooth;
        }
        .sidenavActive{
            left: 0;
            z-index: 3 !important;
        }
        .sidenavActive .overlay{
            visibility: visible;
            position: fixed !important;
            top:58px;
            left: 260px;
            right: 0;
            bottom: 0;
            z-index: 3 !important;
        }
        #sidenav .logo{
            display: none;
        }
        #mainNav{
            height: 58px;
            width: 100%;
            background-color: blueviolet;
            margin-top: 0;
            display: inline-flex;
        }
        #mainNav .titleLogo{
            margin: auto;
            text-decoration: none;
            color: white;
            font-size:x-large;
            font-weight: bolder;
            font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        #mainNav .menu{
            position: absolute;
            top:13px;
            left: 15px;
            color: white;
            font-size: 34px;
            cursor: pointer;
        }
    }
</style>