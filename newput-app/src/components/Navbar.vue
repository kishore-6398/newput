<template>
  <div>
      
      <nav id="mainNav">
        <span class="menu material-icons" @click="navToggleMethod">menu</span>
        <router-link to="/" class="titleLogo" @click="navToggleFalse">
            <img src="../assets/newputLogo.jpg" class="newputIcon" alt="newput icon">
            <span class="newput">NEWPUT</span>
        </router-link> 
      </nav>

      <nav id="sidenav" class="sidenav" :class="{ sidenavActive: navToggle }">
        <div class="logo">
            <router-link to="/" >
                <img src="../assets/newputLogo.jpg" class="newputIcon" alt="newput icon">
                <span class="newput">NEWPUT</span>
            </router-link>
        </div>

        <div class="userprofile">
            <div class="username">
                <img src="../assets/avatar.png" class="userIcon" alt="user icon">
                <div class="nameText text-wrap">{{ name }}</div>
            </div>
            <div class="usermail">
                <span class="material-icons md-mail">mail</span>
                <div class="emailText text-wrap">{{ email }}</div>
            </div>
        </div>

        <div class="hrnav"></div>
        
        <ul @click="navToggleMethod">
            <router-link class="routeLink" to="/todo" >
                <span class="material-icons md-task">task</span>
                <span class="routeText">Todo List</span>
            </router-link>
            <router-link class="routeLink" to="/pvault" >
                <span class="material-icons md-lock">lock</span>
                <span class="routeText">Password Vault</span>
            </router-link>
            <router-link class="routeLink" to="/url" >
                <span class="material-icons md-publicurl">public</span>
                <span class="routeText">URL Manager</span>
            </router-link>
            <router-link class="routeLink" to="/notes" >
                <span class="material-icons md-description">description</span>
                <span class="routeText">Notes Editor</span>
            </router-link>
            <router-link class="routeLink" to="/expense/form" >
                <span class="material-icons md-paid">paid</span>
                <span class="routeText">Expense Tracker</span>
            </router-link>
            <router-link class="routeLink" to="/weather" >
                <span class="material-icons md-cloud">cloud</span>
                <span class="routeText">World Weather</span>
            </router-link>
        </ul>

        <div @click="logout" class="logout">
            <span class="material-icons md-logout">logout</span>
            <span class="routeText logoutText">LogOut</span>
        </div>
     
        
        <div class="overlay" @click="navToggleMethod"></div>
      </nav>

  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore }from 'vuex';

export default {
    setup(){
        var navToggle = ref(false);
        var store = useStore();

        var name = computed(() => store.getters.getUsername);
        var email = computed(() => store.getters.getuserEmail);

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
            logout,
            name,
            email
        }
    } 
}

</script>

<style>
    #mainNav{
        display: none;
    }
    .newput{
        margin-left: 5px;
    }
    .logo{
        text-align: center;
        margin: 15px 0 30px 0;
    }
    .logo a{
        text-decoration: none;
        color: white;
        font-size:31px;
        font-family:'Kalam', cursive;   
    }
    .logo a:hover{
        color: white;
    }
    #sidenav ul{
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
    }
    
    #sidenav ul .routeLink{
        padding: 15px 0 15px 20px;
        text-decoration: none;
        color: white;
        font-size: 16px;
        transition: 0.3s;
        display: flex;
    }
    #sidenav ul .routeLink:hover{
        background-color: rgb(128, 17, 231);
        cursor: pointer;
    }
    #sidenav .logout{
        padding: 15px 0 15px 20px;
        text-decoration: none;
        color: white;
        font-size: 16px;
        transition: 0.3s;
        display: flex;
    }
    #sidenav .logout:hover{
        background-color: rgb(128, 17, 231);
        cursor: pointer;
    }
    .routeText{
        padding-left: 20px;
    }
    .overlay{
        visibility: hidden;
    }
    .hrnav{
        height: 0.5px;
        width: auto;
        background-color: white;
        margin: 20px 0 0 0;
    }
    .userprofile{
        margin: 15px 0 0 20px;
        color: white;
        font-size: 16px;
    }
    .userIcon{
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }
    .newputIcon{
        border-radius: 50%;
        width: 45px;
        height: 45px;
    }
    .username, .usermail{
        display: flex;
        align-items: center;
    }
    .usermail{
        margin-top: 12px;
    }
    .nameText{
        margin-left: 14px;
        word-wrap: break-word;
        width: 170px;
    }
    .emailText{
        margin-left: 20px;
        word-wrap: break-word;
        width: 180px;
    }


    .md-task{
        color: rgb(238, 255, 0);
    }
    .md-lock{
        color: rgb(9, 255, 0);
    }
    .md-publicurl{
        color: rgb(0, 255, 234);
    }
    .md-description{
        color: rgb(255, 123, 0);
    }
    .md-paid{
        color: rgb(0, 255, 170);
    }
    .md-cloud{
        color: rgb(0, 195, 255);
    }
    .md-logout{
        color: rgb(255, 255, 255);
    }
    .md-mail{
        color:rgb(226, 167, 253);
    }

    @media (max-width: 850px){
        .sidenav{
            position: fixed;
            top: 58px;
            left: -100%;
            background-color: #6e72fc;
            background-image: linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%);
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
        #sidenav .logout{
            margin-bottom: 100px;
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
            background-color: #6e72fc;
            background-image: linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%);
            margin-top: 0;
            display: flex;
        }
        #mainNav .titleLogo{
            margin: auto;
            text-decoration: none;
            color: white;
            font-size:30px;
            font-family:'Kalam', cursive; 
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

    @media (max-width: 768px){
        #sidenav ul .routeLink, #sidenav .logout{
            padding: 17px 0 17px 20px;
            font-size: 17px;
        }
        .userprofile{
            margin: 20px 0 0 20px;
            font-size: 17px;
        }
    }
</style>